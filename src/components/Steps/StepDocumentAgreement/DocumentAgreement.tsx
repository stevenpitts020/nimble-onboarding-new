import React from "react";
import DocumentAgreementView from "./DocumentAgreementView";
import { NavigationContent } from "./components/SidebarNavigationContent";
import { ReactComponent as CheckIcon } from "./check.svg";
import { useHistory } from "react-router-dom";

const DocumentAgreement: React.FC = () => {
  const history = useHistory();

  const onNext = () => {
    history.push("/onboarding/verify-email");
  };
  const onSubmit = () => {};

  const sidebarNavigation = () => {
    return (
      <div className="ni-pdf-navigate">
        {NavigationContent.map((item) => (
          <div className="ni-pdf-navigate__top" key={item.id}>
            <span>
              <CheckIcon /> {item.label}
            </span>
            {item?.subitems?.length &&
              item.subitems.map((subitem) => (
                <div className="ni-pdf-navigate__sub" key={subitem.id}>
                  <span>{subitem.label}</span>
                </div>
              ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <DocumentAgreementView
      navigatePdf={sidebarNavigation()}
      onNext={onNext}
      onSubmit={onSubmit}
    />
  );
};

export default DocumentAgreement;
