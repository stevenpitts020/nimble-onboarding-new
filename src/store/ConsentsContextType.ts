export interface IConsents {
  initial: boolean;
  terms: boolean;
  treatmentPhotos: boolean;
  privacyPolicy: boolean;
  communication: boolean;
}
/* Our state will have:
  consents: { terms: true, treatmentPhotos: false, etc}
*/
export interface IState extends IConsents {
  error?: string;
}
/* Types for the reducer */
export interface IAction {
  type: "update";
  payload: boolean;
  key: string;
}
