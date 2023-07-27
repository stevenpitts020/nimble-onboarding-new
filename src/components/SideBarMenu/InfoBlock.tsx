import React from "react";
import { ReactComponent as LockIcon } from "./icons/lock.svg";

const InfoBlock = () => {
  return (
    <div className="ni-info-block">
      <LockIcon />
      <span>
        We take privacy issues seriously. You can be sure that your personal
        data is securely protected.
      </span>
    </div>
  );
};

export default InfoBlock;
