import React, { FC } from "react";
import { ILogo } from "./types";

const defaultProps = {
  url: "/mocks/company.png",
  height: "100px",
  alt: "Company logo",
};

const Logo: FC<ILogo> = (props) => (
  <div data-testid="logo" className={`${props.className}`} style={props.style}>
    <img
      onClick={props.onClick}
      className="ni-logo-img"
      alt={props.alt}
      src={props.url}
      style={{ maxWidth: props.width }}
    />
  </div>
);

Logo.defaultProps = defaultProps;
export default Logo;
