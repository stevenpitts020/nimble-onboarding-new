import React from "react";
import "./AlertMessage.sass";
import { IAlertMessage } from "./types";
import AlertMessageView from "./AlertMessageView";

const defaultProps = {
  title: "Example",
};

const AlertMessage: React.FC<IAlertMessage> = ({
  title,
  className,
  style,
  children,
}: IAlertMessage) => (
  <AlertMessageView className={className} title={title} style={style}>
    {children}
  </AlertMessageView>
);

AlertMessage.defaultProps = defaultProps;
export default AlertMessage;
