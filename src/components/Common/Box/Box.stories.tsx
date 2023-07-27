import React from "react";
import Box from "./Box";

export default {
  title: "Common/Box",
  component: Box,
};

export const Basic = () => (
  <Box>
    <p>Hello</p>
  </Box>
);
export const WithStyle = () => (
  <Box style={{ backgroundColor: "#eee" }}>
    <p>Hello</p>
  </Box>
);
