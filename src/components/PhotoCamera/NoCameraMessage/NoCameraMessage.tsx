import React, { FC, useContext } from "react";
import { config } from "../../../services";
import { InstitutionContext } from "../../../store";
import "./NoCameraMessage.sass";
import NoCameraMessageView from "./NoCameraMessageView";
import { INoCameraMessage } from "./types";

const defaultProps = {
  title: "Camera is not working",
  url: `${config.domain}/`,
  size: 128,
};

const NoCameraMessage: FC<INoCameraMessage> = (props) => {
  const institution = useContext(InstitutionContext);
  const url = institution ? props.url + institution.domain : props.url;
  return <NoCameraMessageView props={props} url={url} />;
};

NoCameraMessage.defaultProps = defaultProps;
export default NoCameraMessage;
