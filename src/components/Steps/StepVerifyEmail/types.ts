export interface IStepView {
  error: string | null;
  signerData: {
    signerId: string;
    email: string | undefined;
    token: string | undefined;
  };
  emailHost: string;
}
