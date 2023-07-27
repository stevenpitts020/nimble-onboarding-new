import React from "react";
import AccountOrProduct from "../../AccountOrProduct/AccountOrProduct";
import { IStepBusinessOrPersonalView } from "./types";

const StepBusinessOrPersonalView = ({
  onClick,
}: IStepBusinessOrPersonalView) => <AccountOrProduct onClick={onClick} />;

export default StepBusinessOrPersonalView;
