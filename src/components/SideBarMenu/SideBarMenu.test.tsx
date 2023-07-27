import React from "react";
import { waitFor, screen, getByText } from "@testing-library/react";
import renderWithRouter from "../../support/router/renderWithRouter";
import { UrlProvider } from "../../store/UrlContext";
import SideBarMenu from "./SideBarMenu";

const app = () => (
  <UrlProvider>
    <SideBarMenu />
  </UrlProvider>
);

describe("<SideBarMenu />", () => {
  test("renders sidebar menu", async () => {
    renderWithRouter(app(), { route: "/onboarding/business-or-personal" });

    await waitFor(() => {
      const container = screen.getByTestId("SideBarMenu");
      expect(container).toBeInTheDocument();
    });
  });

  test.skip("sidebar menu first item is active", async () => {
    renderWithRouter(app(), { route: "/onboarding/business-or-personal" });

    const listSubItem = await waitFor(() =>
      screen.findAllByTestId("SideBarMenuSubItem")
    );

    const [firstSubItem] = listSubItem;
    const container = getByText(firstSubItem, "CPN");
    expect(container).toBeInTheDocument();
  });

  test.skip("sidebar menu second item is active", async () => {
    renderWithRouter(app(), { route: "/onboarding/terms-and-conditions" });

    const listSubItem = await waitFor(() =>
      screen.findAllByTestId("SideBarMenuSubItem")
    );

    const [, secondSubItem] = listSubItem;
    const container = getByText(secondSubItem, "Email");
    expect(container).toBeInTheDocument();
  });
});
