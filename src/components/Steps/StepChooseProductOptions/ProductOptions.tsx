import React, { FC } from "react";
import "./StepChooseProductOptions.sass";
import { IProductOptionsList } from "./types";
import { IProductOption } from "../../../store/reducers/type";
import Button from "../../Common/Button/Button";

const ProductOptions: FC<IProductOptionsList> = (props) => {
  const [activeOption, setActiveOption] = React.useState("");

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const option = event.currentTarget.getAttribute("data-id") || "";

    setActiveOption(option);
    props.selectOption(option);
  };

  const productOptionsFilteredByCategory = () =>
    props.options.filter(
      (option: IProductOption) => option.category === props.category
    );

  return (
    <div className="product-options-wrapper">
      {productOptionsFilteredByCategory()
        .sort((a, b) => {
          if (parseInt(a.value, 10) > parseInt(b.value, 10)) {
            return 1;
          }
          if (parseInt(a.value, 10) < parseInt(b.value, 10)) {
            return -1;
          }
          return 0;
        })
        .map((option: IProductOption) => (
          <Button
            data-id={option.key}
            data-testid={`ButtonSelectedOption-${option.key}`}
            className={`product-options ${
              activeOption === option.key ? "active" : ""
            }`}
            key={option.key}
            onClick={handleClick}
          >
            <h2>{option.value}</h2>
            <label>Months</label>
          </Button>
        ))}
    </div>
  );
};
export default ProductOptions;
