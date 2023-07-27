export interface IDocumentAgreement {
  onSubmit: () => void;
  onNext?: () => void;
  navigatePdf: React.ReactNode;
}

export interface IPSPDFInstance {
  container: any;
  document: any;
}
