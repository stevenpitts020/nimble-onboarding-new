import { IFeatureConfig } from "./types";

const defaultLoanConfig = {
  enabled: false,
  products: [],
};

const defaultCardConfig = {
  enabled: false,
  products: [],
};

const defaultFeatureConfig: IFeatureConfig = {
  loans: defaultLoanConfig,
  cards: defaultCardConfig,
};

class Config {
  public readonly coreAPI: string;

  public readonly env: string;

  public readonly domain: string;

  public readonly mockAPI: boolean;

  public readonly mockPhotos: boolean;

  public readonly skipRoutes: boolean;

  public readonly flow: string;

  public readonly gtmID: string | undefined;

  public readonly gtmAuth: string | undefined;

  public readonly gtmPreview: string | undefined;

  public readonly sentryDSN: string | undefined;

  public readonly releaseVersion: string | undefined;

  public readonly releaseVersionNumber: string | undefined;

  public readonly context: string;

  public readonly microblinkAuth: string;

  public readonly microblinkCdnVersion: string;

  public readonly featureConfig: IFeatureConfig = defaultFeatureConfig;

  constructor() {
    const env =
      ((window as { [key: string]: any })._env_ as {
        [key: string]: any;
      }) || process.env; // fallback to process.env (in case we are running inside jest test-runner)

    this.coreAPI = env.REACT_APP_API;
    this.domain = env.REACT_APP_DOMAIN;
    this.env = env.NODE_ENV;
    // mock response from api calls
    this.mockAPI = env.REACT_APP_MOCK_API_CALLS === "true";
    // send photos to api which will always succeed
    this.mockPhotos = env.REACT_APP_MOCK_PHOTOS === "true";

    this.skipRoutes = env.REACT_APP_SKIP_ROUTES === "true";

    this.flow = env.REACT_APP_FLOW;

    // google tag manager var's
    this.gtmID = env.REACT_APP_GTM_ID;
    this.gtmAuth = env.REACT_APP_GTM_AUTH;
    this.gtmPreview = env.REACT_APP_GTM_PREVIEW;

    // microblink
    this.microblinkAuth = env.REACT_APP_MICROBLINK_AUTH;
    this.microblinkCdnVersion = env.REACT_APP_MICROBLINK_CDN_VERSION || false;

    this.sentryDSN = env.REACT_APP_SENTRY_DSN || undefined;
    this.releaseVersionNumber = env.REACT_APP_VERSION;
    this.releaseVersion = this.getRelease();
    this.context = env.REACT_APP_ENV;

    /** ********************** */
    /* Feature Configuration */
    /** ********************** */

    // Loans
    const enabledLoans = env.REACT_APP_FEATURE_LOANS_PRODUCTS?.split(",") || [];

    this.featureConfig.loans.products = enabledLoans.map((name: string) =>
      name.trim()
    );

    this.featureConfig.loans.enabled =
      env.REACT_APP_FEATURE_LOANS_ENABLED === "true";

    // Cards
    const enabledCards = env.REACT_APP_FEATURE_CARDS_PRODUCTS?.split(",") || [];

    this.featureConfig.cards.products = enabledCards.map((name: string) =>
      name.trim()
    );

    this.featureConfig.cards.enabled =
      env.REACT_APP_FEATURE_CARDS_ENABLED === "true";
  }

  public getRelease() {
    return `NimbleOnboarding@${this.releaseVersionNumber}`;
  }
}

export default new Config();
