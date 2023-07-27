import React, { FC } from "react";
import { IFButtonList } from "./types";
import "./ButtonList.sass";
import ButtonListView from "./ButtonListView";

const ButtonList: FC<IFButtonList> = (props: IFButtonList) => (
  <ButtonListView
    handleRestart={props.handleRestart}
    className={props.className}
  />
);
export default ButtonList;
