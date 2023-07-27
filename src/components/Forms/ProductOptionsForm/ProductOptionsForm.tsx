import React, { useState } from "react";
import { ArrowLeft } from "react-feather";
import { useForm } from "react-hook-form";
import "./ProductOptionsForm.sass";
import ProductOption from "./ProductOption";
import { log } from "../../../services";
import { IProductOptionsForm } from "./types";
import { IProductOption } from "../../../store/reducers/type";
import Button from "../../Common/Button/Button";

const ProductOptionsForm: React.FC<IProductOptionsForm> = (props) => {
  const { handleSubmit, formState } = useForm<IProductOption>({
    mode: "onChange",
  });
  const { onSubmit } = props;
  const optionsInStr = sessionStorage.getItem("PRODUCT_OPTIONS");
  const options = optionsInStr ? JSON.parse(optionsInStr) : props.options;
  const prepareOptions = () =>
    options.map((option: IProductOption) => ({
      id: option.id,
      key: option.key,
      value: option.value !== null ? option.value : "null",
      category: option.category,
      title: option.title,
      children: props.options.filter((children: IProductOption) => {
        if (
          children.parentId !== undefined &&
          children.parentId === option.id
        ) {
          return { ...children, parentId: children.parentId, value: "true" };
        }
        return null;
      }),
      isChildren: !!option.parentId,
      parentId: option.parentId,
      lead: option.lead ? option.lead : "",
      annotation: option.annotation ? option.annotation : "",
    }));
  const [formProducts, setFormProducts] = useState(prepareOptions());
  const onFormSubmit = async () => {
    const dataToSubmit = formProducts
      .map((option: IProductOption) => ({
        key: option.key,
        value: option.value,
        category: option.category,
        title: option.title,
      }))
      .filter((option: IProductOption) => option.value !== "null");
    sessionStorage.setItem("PRODUCT_OPTIONS", JSON.stringify(formProducts));
    log.info(dataToSubmit, "update state with product options");
    onSubmit(dataToSubmit);
  };

  const goBack = () => {
    props.onBack();
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    log.info("HITG", "handleChange");
    const propertyKey: string = ev.target.name;
    const newState = [...formProducts];
    const i = newState.findIndex((e) => e.key === propertyKey);

    if (i !== -1) {
      newState[i].value = newState[i].value === "true" ? "false" : "true";

      log.info(newState[i], "handleChangeTG");
      log.info(i, "i");

      if (newState[i].children.length >= 1) {
        // if parent option is false so should the children options be
        log.info("update children options", "handleChange");

        newState[i].children.forEach((children: any) => {
          const childrenIndex = newState.findIndex(
            (el) => el.key === children.key
          );
          // if we deactivate parent, we deactivate children
          // also: there is a second object so I'm syncing that as well
          newState[childrenIndex].value = newState[i].value;
          children.value = newState[i].value;
        });
      }

      // handle children option change
      if (newState[i].isChildren) {
        const parentIndex = newState.findIndex(
          (el) => el.id === newState[i].parentId
        );
        log.info("is children", "handleChange");

        newState[parentIndex].children.forEach((children: any) => {
          if (children.key === propertyKey) {
            log.info("sync parent option", "handleChange");
            children.value = newState[i].value;
          }
        });
      }

      // relationships
      switch (propertyKey) {
        // e_statments should be 'true' if mobile_and_online_banking is selected
        case "mobile_and_online_banking":
          if (newState[i].value === "true") {
            newState[
              newState.findIndex((e) => e.key === "e_statements")
            ].value = "true";
          } else {
            newState[
              newState.findIndex((e) => e.key === "e_statements")
            ].value = "false";
          }
          break;
        // paper_statements should be 'false' if e_statments is selected
        case "e_statements":
          if (newState[i].value === "true") {
            newState[
              newState.findIndex((e) => e.key === "paper_statements")
            ].value = "false";
          }
          if (newState[i].value === "false") {
            newState[
              newState.findIndex((e) => e.key === "paper_statements")
            ].value = "true";
          }
          break;
        case "paper_statements":
          if (newState[i].value === "true") {
            newState[
              newState.findIndex((e) => e.key === "e_statements")
            ].value = "false";
          }
          if (newState[i].value === "false") {
            newState[
              newState.findIndex((e) => e.key === "e_statements")
            ].value = "true";
          }
          break;
      }

      log.info(newState, "handleChange");

      setFormProducts(newState);
    }
  };

  return (
    <div className="ni-test prospect-form-card" data-testid="BSAForm">
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="product-options-wrapper"
      >
        {formProducts.length >= 1 ? (
          formProducts.map((option: any) => {
            if (option.isChildren === false) {
              return (
                <div
                  key={option.key}
                  className={`option-wrapper ${
                    option.key === "checks" ? "last" : ""
                  }`}
                >
                  <ProductOption
                    option={option}
                    handleChange={handleChange}
                    key={option.key}
                  />
                  {option.children?.map((suboption: any) => {
                    if (option.value === "true") {
                      return (
                        <ProductOption
                          option={suboption}
                          handleChange={handleChange}
                          isChildren
                          key={suboption.key}
                        />
                      );
                    }
                  })}
                </div>
              );
            }
            return null;
          })
        ) : (
          <h3>No additional features available</h3>
        )}
        <div className="form-controls">
          <Button className="back" onClick={goBack} data-testid="back-btn">
            <ArrowLeft color="#444647" />
            Back
          </Button>
          <Button
            disabled={!formState.isValid}
            type="submit"
            className="is-pill is-green"
            data-testid="submit-btn"
          >
            Proceed
          </Button>
        </div>
      </form>
    </div>
  );
};
export default ProductOptionsForm;
