import React from "react";

import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { render } from "@testing-library/react";

const renderWithReactRouter = (
  ui: any,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  }: any = {}
) => {
  const Wrapper = ({ children }: any) => (
    <Router history={history}>{children}</Router>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history,
  };
};
export default renderWithReactRouter;
