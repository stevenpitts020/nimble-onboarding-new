import React, { useReducer, useEffect } from "react";
import {
  BrowserRouter as Router,
  useParams,
  useHistory,
} from "react-router-dom";
import { institution as institutionService, log } from "./services";
import { InstitutionProvider } from "./store";
import Loading from "./components/Common/Loading/Loading";

interface Image {
  default: string;
}

export interface IDisclosure {
  name: string;
  text: string;
}

export interface IDisclosures {
  count?: number;
  revised?: string;
  data?: IDisclosure[];
}

export interface IInstitution {
  id: string;
  name: string;
  domain: string;
  logoUri: Image;
  backgroundImageUri: Image;
  publicMetadata?: any;
  disclosures?: IDisclosures;
}

interface Action {
  type: string;
  payload: IInstitution;
}

interface State {
  institution?: IInstitution;
  loading: boolean;
}

interface IParamsTypes {
  clientDomain: string;
}

const reducer = (state: State, action: Action) => {
  if (action.type === "FETCHED_INSTITUTION") {
    return {
      institution: action.payload,
      loading: false,
    };
  }
  return state;
};

const initialState: State = {
  institution: undefined,
  loading: true,
};

interface INimbleRouter {
  children?: React.ReactNode;
}

const NimbleRouter: React.FC<INimbleRouter> = ({ children }) => {
  const history = useHistory();
  const { clientDomain } = useParams<IParamsTypes>();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchInstitution = async (domain: string) => {
      try {
        const result = await institutionService.get(domain);
        dispatch({
          type: "FETCHED_INSTITUTION",
          payload: result,
        });
      } catch {
        log.info("404", "NimbleRouter");
        history.push("/404");
      }
    };
    if (clientDomain) {
      fetchInstitution(clientDomain);
    } else {
      history.push("/404");
    }
    // tslint:disable-next-line react-hooks/exhaustive-deps
  }, [clientDomain]);

  if (state.loading) {
    return <Loading fullPage active width="300px" height="300px" />;
  }

  return (
    <Router
      basename={process.env.NODE_ENV === "test" ? "" : `/${clientDomain}`}
    >
      <InstitutionProvider institution={state.institution}>
        {children}
      </InstitutionProvider>
    </Router>
  );
};

export default NimbleRouter;
