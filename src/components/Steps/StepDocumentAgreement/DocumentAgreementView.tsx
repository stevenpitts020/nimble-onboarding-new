import React from "react";
import { Layout } from "../../NewLayout/Layout";
import { SIDEBAR_TYPE } from "../../NewLayout/Layout";
import { IDocumentAgreement } from "./types";
import PdfViewer from "./components/PdfViewer";
import SSNField from "./components/SSNField";
import "./DocumentAgreement.sass";

const DocumentAgreementView: React.FC<IDocumentAgreement> = ({
  onSubmit,
  onNext,
  navigatePdf,
}) => {
  const footerField = <SSNField />;
  return (
    <Layout
      className="ni-funds-calculate"
      classNameContainer="flex flex-1 justify-center items-center"
      onGetStarted={onSubmit}
      nextButtonLabel="Finished"
      hideHeader
      isBankHeader
      showTimer={false}
      sidebarType={SIDEBAR_TYPE.VERIFY_IDENTITY}
      sidebarProps={{
        customText: navigatePdf,
        className: "ni-sidebar-fixed",
      }}
      additionalFooterElement={footerField}
      onClickNext={onNext}
    >
      <div className="flex flex-1 bg-neutral20 h-full items-center justify-center flex-col">
        <PdfViewer />
      </div>
    </Layout>
  );
};

export default DocumentAgreementView;
