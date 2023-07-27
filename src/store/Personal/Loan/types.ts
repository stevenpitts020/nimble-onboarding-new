export interface IPersonalMortgageLoanQuestionnaire {
  // TODO: WIP below
  purposeOfLoan: string;
  mortgageType: string;
  amortizationType: string;
  propertyAddressStreet: string | undefined;
  propertyAddressCity: string | undefined;
  propertyAddressState: string | undefined;
  propertyAddressZip: string | undefined;
  usageOfProperty: string;
  purchasePrice: string | undefined;
}
export interface IState {
  results: IPersonalMortgageLoanQuestionnaire;
  error?: string;
}
export interface IAction {
  type: "update" | "reset";
  personalMortgageLoanQuestionnaire: IPersonalMortgageLoanQuestionnaire;
}
