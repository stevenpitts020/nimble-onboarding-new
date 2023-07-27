import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./AmountForm.sass";
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import Slider from "react-input-slider";
import InputCurrency from "../InputCurrency/InputCurrency";
import ProductDetails from "./ProductDetails";
import FormatHelper from "../../../utils/FormatHelper";
import { log } from "../../../services";
import { IAmountForm } from "./types";
import { IProductConfiguration } from "../../../services/types";
import Button from "../../Common/Button/Button";

const AmountForm: React.FC<IAmountForm> = (props: IAmountForm) => {
  // destructure args
  const { min, productOptions, term, category } = props;
  const [interestRate, setInterestRate] = useState("0");
  const { register, handleSubmit, errors } = useForm<IProductConfiguration>({
    mode: "onBlur",
  });
  const [disabled, setDisabled] = React.useState(true);
  const history = useHistory();
  const defaultVal = 4000;
  const [sliderValue, setSliderValue] = useState({ x: defaultVal });
  const [inputValue, setInputValue] = useState(defaultVal);
  const sliderStyles = {
    track: {
      width: "100%",
      height: 4,
    },
    active: {
      backgroundColor: "#5CB97F",
    },
    thumb: {
      border: "solid 4px #5CB97F",
      height: "32px",
      width: "32px",
      boxShadow: "0 2px 10px rgba(0,0,0,.1)",
    },
  };

  useEffect(() => {
    if (inputValue < min) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [min, inputValue]);

  const backToProducts = () => {
    history.goBack();
  };

  const validateAmount = (value: number) => {
    const parsedValue = FormatHelper.numberToCurrency(value.toString());

    log.info(parsedValue, "validate");

    if (parsedValue < min) {
      return `The minimum initial deposit amount is $${min}`;
    }
    return true;
  };

  const onFormSubmit = (data: IProductConfiguration) => {
    if (data.initialDeposit) {
      // Parse the string, remove the currency symbol and converts to float
      // multiply by 100 before saving it in the state because the api requires the number to be divided by 100.
      const parsedCurrency =
        FormatHelper.numberToCurrency(data.initialDeposit.toString()) * 100;
      log.info(parsedCurrency, "submit");
      props.onSubmit(parsedCurrency);
    }
  };

  const calculateInterest = (formattedProps: {
    floatValue: number;
    formattedValue: string;
    value: string;
  }) => {
    const parsedValue = FormatHelper.numberToCurrency(
      formattedProps.formattedValue
    );

    // find in all the product options the ones relative to the chosen term
    const filteredOptions = productOptions?.filter(
      (el) => el.category === `interest_rate_${term}`
    );

    // set interest rates and apy by searching on the filtered options where the value sits
    if (filteredOptions) {
      // TODO Refactor these options
      filteredOptions.forEach((filterOption) => {
        if (parsedValue <= parseInt(filterOption.key, 10)) {
          log.info(filterOption.value, "calculateInterest");
          setInterestRate(filterOption.value);
        } else {
          // if above the last range we have set it to the last
          if (
            parsedValue >
            parseInt(filteredOptions[filteredOptions.length - 1].key, 10)
          ) {
            log.info(
              filteredOptions[filteredOptions.length - 1].value,
              "calculateInterest"
            );
            setInterestRate(filteredOptions[filteredOptions.length - 1].value);
          }
        }
      });
    }
  };

  const handleInputChange = (formattedProps: {
    floatValue: number;
    formattedValue: string;
    value: string;
  }) => {
    // check if we need to calc the interest rate
    setInputValue(formattedProps.floatValue);
    if (props.category === "CD") {
      calculateInterest(formattedProps);
    }
    setSliderValue({ x: formattedProps.floatValue });
    // if the input is empty the values are undefined
    if (formattedProps.floatValue !== undefined) {
      if (formattedProps.floatValue < min) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  };

  const handleInputSliderChange = (values: { x: number; y: number }) => {
    setInputValue(values.x);
    setSliderValue({ x: values.x });
  };

  return (
    <div className="prospect-form-card">
      <div
        data-testid="AmountForm"
        className="ni-prospect-form "
        style={props.style}
      >
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <section>
            <div className="input-container">
              <InputCurrency
                name="initialDeposit"
                label="Enter your initial deposit amount"
                className="span-4"
                isNumericString
                forwardRef={register({
                  required: "Initial Deposit can’t be blank",
                  validate: validateAmount,
                })}
                errors={errors.initialDeposit}
                allowNegative={false}
                value={inputValue}
                prefix="$"
                onValueChange={handleInputChange}
                min={min}
              />
            </div>
            <Slider
              axis="x"
              xstep={10}
              xmin={min}
              xmax={500000}
              x={sliderValue.x}
              onChange={handleInputSliderChange}
              styles={sliderStyles}
            />
            <ProductDetails
              apy={interestRate}
              interestRate={interestRate}
              category={category}
            />
            <div className="amount-controls">
              <Button className="back" onClick={backToProducts}>
                <ArrowLeft color="#444647" />
                Back
              </Button>
              <Button
                type="submit"
                disabled={disabled}
                className="is-pill is-green"
                data-testid="step-info-continue"
              >
                Proceed
              </Button>
            </div>
          </section>
        </form>
      </div>
    </div>
  );
};
export default AmountForm;
