import config from "./Config";

class Flow {
  public readonly flowName: string;

  readonly MAIN_ONBOARDING = "MainOnboarding";
  readonly BUY_NOW_PAY_LATER = "BuyNowPayLater";

  constructor() {
    this.flowName = config.flow;
  }

  public isMainOnboarding = () => {
    return this.flowName === this.MAIN_ONBOARDING;
  };

  public isBuyNowPayLater = () => {
    return this.flowName === this.BUY_NOW_PAY_LATER;
  };
}

export default new Flow();
