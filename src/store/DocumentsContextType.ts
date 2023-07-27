export interface IDocuments {
  front: { id: string } | null;
  back: { id: string } | null;
  selfie: { id: string } | null;
}

export interface IState {
  status: string;
  error?: string;
  documents: IDocuments;
}
/* Types for the reducer */
export interface IAction {
  type: "create" | "resolve" | "remove" | "reject" | "cancel" | "reset";
}
export interface IRejectAction extends IAction {
  payload: string;
}
export interface IResolveAction extends IAction {
  payload: { id: string };
  subject: string;
}
