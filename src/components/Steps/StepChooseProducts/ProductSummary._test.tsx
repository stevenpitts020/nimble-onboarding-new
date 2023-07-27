/*
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ProductSummary from "./ProductSummary";
import { listProducts } from "../../../services/__mocks__/Products";

describe("<ProductSummary/>", () => {
  const props = {
    product: listProducts[0],
    submitProduct: jest.fn((id, name) => ({
      id,
      name,
    })),
    showProduct: jest.fn(),
  };

  test("chooses the product", async () => {
    render(<ProductSummary {...props} />);

    fireEvent.click(screen.getByTestId("submitProduct"));

    await waitFor(() => {
      expect(props.submitProduct).toHaveBeenCalled();
      expect(props.submitProduct.mock.results[0].value.id).toBe(
        listProducts[0].id
      );
      expect(props.submitProduct.mock.results[0].value.name).toBe(
        listProducts[0].name
      );
    });
  });
});
*/
