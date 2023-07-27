/*
import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import ProductDetail from "./ProductDetail";
import { listProducts } from "../../../services/__mocks__/Products";

describe("<ProductDetail/>", () => {
  const props = {
    product: listProducts[0],
    submitProduct: jest.fn((id, name) => ({
      id,
      name,
    })),
    toggleProductDetailView: jest.fn((isToggled) => isToggled),
  };

  test("chooses the product by clicking button in header", async () => {
    render(
      <ProductDetail
        product={props.product}
        submitProduct={props.submitProduct}
        toggleProductDetailView={props.toggleProductDetailView}
      />
    );

    fireEvent.click(screen.getByTestId("enroll-nav"));

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

  test("chooses the product by clicking button in the bottom", async () => {
    render(
      <ProductDetail
        product={props.product}
        submitProduct={props.submitProduct}
        toggleProductDetailView={props.toggleProductDetailView}
      />
    );

    fireEvent.click(screen.getByTestId("enroll-bottom"));

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

  test("clicking back closes the detail page", async () => {
    render(
      <ProductDetail
        product={props.product}
        submitProduct={props.submitProduct}
        toggleProductDetailView={props.toggleProductDetailView}
      />
    );

    fireEvent.click(screen.getByText("Back"));

    await waitFor(() => {
      expect(props.toggleProductDetailView).toHaveBeenCalled();
      expect(props.toggleProductDetailView.mock.results[0].value).toBe(false);
    });
  });

  test("HTML content must be purified/sanitized", async () => {
    const productWithDirtyContent = listProducts[4];
    render(
      <ProductDetail
        product={productWithDirtyContent}
        submitProduct={props.submitProduct}
        toggleProductDetailView={props.toggleProductDetailView}
      />
    );

    await waitFor(() => {
      const content = screen.getByTestId("content");
      expect(content.childNodes[0]).not.toHaveAttribute("onerror");
    });
  });
});
*/
