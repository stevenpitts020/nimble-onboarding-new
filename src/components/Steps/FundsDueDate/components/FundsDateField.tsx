import React from "react";
import { ReactComponent as FundsImage } from "../img/Funds.svg";
import Switch from "../../../Forms/Switch/Switch";
import { IFundsDateField } from "../types";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";
import "react-datepicker/dist/react-datepicker.css";

const FundsDateField: React.FC<IFundsDateField> = ({ control }) => (
  <div className="ni-funds-due-date-field flex flex-wrap flex-row bg-white items-center justify-center px-[56px] py-[52px]">
    <FundsImage />
    <div className="w-full mt-[31px]">
      <Controller
        name="borrowed"
        control={control}
        render={({ onChange, value, name }) => (
          <Switch
            isChecked={value}
            name={name}
            label="Borrowed Funds Due at Maturity"
            forwardRef={null}
            onChange={onChange}
          />
        )}
      />
    </div>
    <div className="flex w-full items-center">
      <span className="ni-funds-due-date-field-date-label w-full">
        Debt to be repaid no later than:
      </span>
      <Controller
        name="fundsDueDate"
        control={control}
        render={({ onChange, value, name }) => (
          <DatePicker
            name={name}
            selected={value}
            onChange={onChange}
            useWeekdaysShort={false}
            showWeekNumbers
          />
        )}
      />
    </div>
  </div>
);

export default FundsDateField;
