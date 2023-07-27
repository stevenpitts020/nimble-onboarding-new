import React from "react";
import { IAlertMessage } from "./types";

const AlertMessageView = ({
  title,
  className,
  style,
  children,
}: IAlertMessage) => (
  <div
    data-testid="AlertMessage"
    className={`ni-alert-message ${className}`}
    style={style}
  >
    {title && <h4 className="title">{title}</h4>}
    {children}
  </div>
);

export default AlertMessageView;
