import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Lottie } from "@alfonmga/react-lottie-light-ts";
import "./noMatch.sass";
import animationData from "../../../animations/404.json";
import { IPage } from "./types";

const NoMatch: FC<IPage> = () => {
  const options = {
    height: "300px",
    width: "300px",
    autoplay: true,
    loop: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div data-testid="404" className="noMatch_page">
      <div className="noMatch_content">
        <Lottie config={options} />
        <h1>Oooops...</h1>
        <h2>This probably isn&apos;t the page you are looking for.</h2>
        <Link to="/" className="button is-primary is-pill">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
};
export default NoMatch;
