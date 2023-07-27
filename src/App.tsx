import React, { useContext } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import ConfirmEmail from "./components/EmailConfirmation/ConfirmEmail";
import FABHelpButton from "./components/FABHelpButton/FABHelpButton";
import "./App.sass";
import { InstitutionContext } from "./store";
import Loading from "./components/Common/Loading/Loading";
import { useLoading } from "./store/LoadingContext";
import { UrlContext } from "./store/UrlContext";
import LocationHelper from "./utils/LocationHelper";
import Onboarding from "./components/Onboarding/Onboarding";
import NoMatch from "./components/Static/404/NoMatch";
import Header from "./components/Header/Header/Header";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  const institution = useContext(InstitutionContext);
  const { currentStep } = useContext(UrlContext);
  const { loading } = useLoading();
  const location = useLocation();

  React.useEffect(() => {
    document.title = LocationHelper.getLocationTitle(location.pathname);
  }, [location]);

  return (
    <div className={loading ? "App is-loading" : "App"} data-testid="app">
      <main
        className={`main step-${currentStep}`}
        style={{
          backgroundImage: institution?.backgroundImageUri?.default
            ? `url(${institution?.backgroundImageUri?.default})`
            : "",
        }}
        data-testid="main"
      >
        <Loading fullPage active={loading} />

        <Switch>
          {/* Temporary redirect all to onboarding */}
          <Route exact path="/">
            <Redirect to="/onboarding" />
          </Route>
          <Route path="/onboarding">
            <Header />
            <Onboarding />
            <Footer />
            <FABHelpButton
              show={
                !(
                  currentStep === "terms-and-conditions" ||
                  currentStep === "capture-documents" ||
                  currentStep === "selfie" ||
                  currentStep === "front" ||
                  currentStep === "back"
                )
              }
            />
          </Route>
          <Route path="/email-verification/:signerId/:verificationId">
            <Header />
            <ConfirmEmail />
            <Footer />
          </Route>
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
