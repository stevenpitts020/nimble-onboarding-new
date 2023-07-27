// These must be the first lines in src/index.js
import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import TagManager from "react-gtm-module";
import { init } from "@sentry/browser";
import Institution from "./services/Institution";
import Main from "./Main";
import { config, log } from "./services";
import { worker } from "./support/msw/browser";

// get our app configs
const {
  mockAPI,
  sentryDSN,
  releaseVersion,
  context,
  gtmID,
  gtmAuth,
  gtmPreview,
  env,
} = config;
// setup local mock
if (mockAPI) {
  worker.start();
}

// Sentry
if (!sentryDSN) {
  log.error("Environment variables missing for Error reporting", "index.tsx");
} else {
  init({
    environment: context,
    dsn: sentryDSN,
    release: releaseVersion,
  });
  log.info({ sentryDSN, releaseVersion, context }, "init sentry");
}

// setup Google Tag Manager

const initGTM = () => {
  Institution.get(window.location.pathname.split("/")[1])
    .then((res) => {
      const institution = res.name || "";
      if (!gtmID) {
        log.error(
          "Environment variables for the Google Tag Manager tag are not set, GTM won`t be loaded",
          "index.tsx"
        );
      } else {
        if (!gtmAuth && !gtmPreview) {
          TagManager.initialize({
            gtmId: gtmID,
            dataLayer: {
              institution,
            },
          });
          log.info("GTM initializing with ID ", "index.tsx");
        } else {
          TagManager.initialize({
            gtmId: gtmID,
            auth: gtmAuth,
            preview: gtmPreview,
            dataLayer: {
              institution,
            },
          });
          log.info("GTM initializing with ID, auth and preview ", "index.tsx");
        }
      }
    })
    .catch((err) => log.info(`error fetching inst ${err}`, "index.tsx"));
};
initGTM();

// Setup Logger Debug
if (env === "local") {
  localStorage.setItem("debug", "nimble:*");
}

ReactDOM.render(<Main />, document.getElementById("root"));
