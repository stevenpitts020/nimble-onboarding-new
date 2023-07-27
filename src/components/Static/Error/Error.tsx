import React from "react";
import { Link } from "react-router-dom";
import { Lottie } from "@alfonmga/react-lottie-light-ts";
import "./Error.sass";
import animationData from "../../../animations/404.json";

function Error(): React.ReactElement {
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
    <div data-testid="500" className="error_page">
      <div className="error_content">
        <Lottie config={options} />
        <h1>Oooops...</h1>
        <h2 role="alert">
          Something went wrong. We&apos;re looking at the problem now.
        </h2>

        <Link to="/" className="button is-primary is-pill">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
export default Error;
