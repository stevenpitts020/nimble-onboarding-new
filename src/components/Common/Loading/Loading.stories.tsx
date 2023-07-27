import React from "react";
import Loading from "./Loading";

export default {
  title: "Common/Loading",
  component: Loading,
};

export const Basic = () => <Loading active />;
export const FullScreen = () => <Loading active fullPage />;
