import React from "react";
import { IWhiteFlash } from "./type";

/* Display a white flash of animation for the camera */
const WhiteFlash = (props: IWhiteFlash) => {
  const flashDoTransition = props.show ? "do-transition" : "";
  const flashClasses = `${flashDoTransition} normal`;

  return <div id="white-flash" className={flashClasses} />;
};
export default WhiteFlash;
