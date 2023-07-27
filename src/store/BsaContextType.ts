export interface IState {
  results: any;
  error?: string;
}
export interface IAction {
  type: "update" | "reset";
  bsaQuestionnaire: any;
}
