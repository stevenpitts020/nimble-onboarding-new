import React, { useContext } from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  RouteComponentProps,
} from "react-router-dom";
import ConfirmEmail from "./components/EmailConfirmation/ConfirmEmail";
import Onboarding from "./components/Onboarding/Onboarding";
import NoMatch from "./components/Static/404/NoMatch";
import Header from "./components/Header/Header/Header";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Common/Loading/Loading";
import { InstitutionContext, AuthProvider } from "./store";
import { useLoading } from "./store/LoadingContext";
import { UrlContext } from "./store/UrlContext";
import { LayoutProvider } from "./store/LayoutContext";
import LocationHelper from "./utils/LocationHelper";
import "./App.sass";
import "./index.css";
import LoginPage from "./components/Login/Login";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import { authService } from "./services";
import { AuthContextStore } from "./store/AuthContext";
import BusinessApplicant from "./components/BusinessApplicant/BusinessApplicant";
import RequiredContact from "./components/RequiredContact/RequiredContact";
import ProductSelection from "./components/ProductSelection/ProductSelection";
import LoanApplication from "./components/LoanApplication/LoanApplication";
import DepositApplication from "./components/DepositApplication/DepositApplication";
import Verification from "./components/Verification/Verification";
import ProductSelection2 from "./components/ProductSelection2/ProductSelection2";

const App: React.FC = () => {
  const institution = useContext(InstitutionContext);
  const { currentStep } = useContext(UrlContext);
  const { loading } = useLoading();
  const location = useLocation();

  React.useEffect(() => {
    document.title = LocationHelper.getLocationTitle(location.pathname);
  }, [location]);
  const VerifyRoute: React.ComponentType<any> = ({ component, ...rest }) => {
    if (!component) throw Error("component is undefined");
    const { phone } = useContext(AuthContextStore);
    // Note: JSX Elements have to be uppercase
    const Component = component;

    const renderRoute = (props: RouteComponentProps<any>): React.ReactNode => {
      if (!phone) return <Redirect to={{ pathname: "/login" }} />;
      return <Component {...props} />;
    };

    return <Route {...rest} render={renderRoute} />;
  };
  const PrivateRoute: React.ComponentType<any> = ({ component, ...rest }) => {
    if (!component) throw Error("component is undefined");
    const token = authService.getAccessToken();

    // Note: JSX Elements have to be uppercase
    const Component = component;

    const renderRoute = (props: RouteComponentProps<any>): React.ReactNode => {
      if (!token) return <Redirect to={{ pathname: "/login" }} />;

      return <Component {...props} />;
    };

    return <Route {...rest} render={renderRoute} />;
  };
  return (
    <LayoutProvider>
      <AuthProvider>
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
                <Redirect to="/login" />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <PrivateRoute
                exact
                path="/required-contact"
                component={() => <RequiredContact />}
              />
              <VerifyRoute
                path="/verify-code"
                component={() => <VerifyCode />}
              />
              <Route exact path="/business-applicant">
                <BusinessApplicant />
              </Route>

              <Route exact path="/product-request">
                <ProductSelection />
              </Route>
              <Route exact path="/product-selection">
                <ProductSelection2 />
              </Route>
              <Route exact path="/loan-application">
                <LoanApplication />
              </Route>
              <Route exact path="/deposit-application">
                <DepositApplication />
              </Route>
              <Route exact path="/id-card">
                <Verification />
              </Route>
              <Route
                path="/onboarding"
                component={() => (
                  <div className="flex flex-1">
                    <div className="ni-onboarding-wrap-fix-height flex flex-col flex-1">
                      <Onboarding />
                    </div>
                  </div>
                )}
              />
              <Route path="/email-verification/:signerId/:verificationId">
                <Header />
                <ConfirmEmail />
                <Footer />
              </Route>
              <Route component={NoMatch} />
            </Switch>
          </main>
        </div>
      </AuthProvider>
    </LayoutProvider>
  );
};

export default App;
