import React, { useState } from "react";
import { IStepSecondCoApplicantView } from "./components/types";
import { ReactComponent as MailIcon } from "./components/svg/mail.svg";
import { ISignerDetails } from "../../../store/reducers/type";
import { log } from "../../../services";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import CardsCoApplicantForm from "./components/CardsCoApplicantForm";
import clsx from "clsx";
import { ProductSubProductCards } from "../../AccountOrProduct/enum";
const StepSecondCoApplicantView = ({
  goToNextStep,
}: IStepSecondCoApplicantView) => {
  const [isIndividualOrBusiness, setIsIndividualOrBusiness] =
    useState("Individual");
  const [isCoApplicantOrGuarantor, setIsCoApplicantOrGuarantor] =
    useState("CoApplicant");
  const [dataArrayCoApplicant, setDataArrayCoApplicant] = useState<any>([]);

  const onFormSubmitCoApplicant = async (data: ISignerDetails) => {
    log.info(JSON.stringify(data), "prospectform");
    const newData = {
      ...data,
      id: Date.now(),
      isIndividualOrBusiness,
      isCoApplicantOrGuarantor,
    };
    setDataArrayCoApplicant([...dataArrayCoApplicant, newData]);
  };

  function handleDeleteClickCoApplicant(id) {
    const removeItem = dataArrayCoApplicant.filter((dataItem) => {
      return dataItem.id !== id;
    });
    setDataArrayCoApplicant(removeItem);
  }

  const onErrorCoApplicant = () => {
    console.log("error");
  };

  return (
    <Layout
      classNameContainer="font-poppins m-auto"
      onClickNext={goToNextStep}
      sidebarType={SIDEBAR_TYPE.NAVIGATION}
      hideHeader
      disableEnter={true}
    >
      <div className="mainContainer_wrapper">
        <div className="mainContainer">
          <div className="font-inter max-w-[600px]">
            <MailIcon className="mx-auto" />
            <h1 className="font-bold text-24/36 mt-2 text-center">
              Optional: Add Others
            </h1>
            <p className="text-sm text-slateGraySecond text-center mt-2">
              Please specify if you want to add any co-applicants or signers
              here..
            </p>
            <div className="mt-2.5 flex justify-center gap-2">
              <div className="bg-neutral20 p-2 mb-10 mx-auto flex gap-2 justify-between w-auto rounded-[100px] max-w-[431px]">
                <button
                  className={clsx(
                    "outline-0 hover:bg-white hover:text-neutral100 px-10 py-2.5 rounded-[54px] font-bold text-neutral60 text-bold hover:text-main-accent",
                    isCoApplicantOrGuarantor === "CoApplicant" &&
                      "bg-white text-main-accent"
                  )}
                  onClick={() => setIsCoApplicantOrGuarantor("CoApplicant")}
                >
                  Co-Applicant
                </button>
                {sessionStorage.getItem("subItem") ===
                  ProductSubProductCards.LOAN_TITLE && (
                  <button
                    className={clsx(
                      "outline-0 hover:bg-white hover:text-neutral100 px-10 py-2.5 rounded-[54px] text-neutral60 font-bold hover:text-main-accent",
                      isCoApplicantOrGuarantor === "Guarantor" &&
                        "bg-white text-main-accent"
                    )}
                    onClick={() => setIsCoApplicantOrGuarantor("Guarantor")}
                  >
                    Guarantor
                  </button>
                )}
                {sessionStorage.getItem("subItem") ===
                  ProductSubProductCards.DEPOSIT_TITLE &&
                  sessionStorage.getItem("AccountType") ===
                    ProductSubProductCards.PERSONAL_TITLE && (
                    <button
                      className={clsx(
                        "outline-0 hover:bg-white hover:text-neutral100 px-10 py-2.5 rounded-[54px] text-neutral60 font-bold hover:text-main-accent",
                        isCoApplicantOrGuarantor === "Signer" &&
                          "bg-white text-main-accent"
                      )}
                      onClick={() => setIsCoApplicantOrGuarantor("Signer")}
                    >
                      Signer
                    </button>
                  )}
                {sessionStorage.getItem("subItem") ===
                  ProductSubProductCards.CARD_TITLE &&
                  sessionStorage.getItem("AccountType") ===
                    ProductSubProductCards.PERSONAL_TITLE && (
                    <button
                      className={clsx(
                        "outline-0 hover:bg-white hover:text-neutral100 px-10 py-2.5 rounded-[54px] text-neutral60 font-bold hover:text-main-accent",
                        isCoApplicantOrGuarantor === "Signer" &&
                          "bg-white text-main-accent"
                      )}
                      onClick={() => setIsCoApplicantOrGuarantor("Signer")}
                    >
                      Signer
                    </button>
                  )}
              </div>
            </div>

            {sessionStorage.getItem("subItem") ===
              ProductSubProductCards.LOAN_TITLE && (
              <div className="mt-2.5 flex justify-center gap-[92px]">
                <button onClick={() => setIsIndividualOrBusiness("Individual")}>
                  <p
                    className={clsx(
                      "font-bold",
                      isIndividualOrBusiness === "Individual"
                        ? "border-b border-b-main-accent text-main-accent"
                        : "text-slateGraySecond"
                    )}
                  >
                    Individual
                  </p>
                </button>
                <button onClick={() => setIsIndividualOrBusiness("Business")}>
                  <p
                    className={clsx(
                      "font-bold",
                      isIndividualOrBusiness === "Business"
                        ? "border-b border-b-main-accent text-main-accent"
                        : "text-slateGraySecond"
                    )}
                  >
                    Business
                  </p>
                </button>
              </div>
            )}

            {isCoApplicantOrGuarantor === "CoApplicant" &&
              sessionStorage.getItem("subItem") ===
                ProductSubProductCards.LOAN_TITLE && (
                <CardsCoApplicantForm
                  onSubmit={onFormSubmitCoApplicant}
                  onError={onErrorCoApplicant}
                  data={dataArrayCoApplicant}
                  deleteHandler={handleDeleteClickCoApplicant}
                  isIndividualOrBusiness={isIndividualOrBusiness}
                  guaranty={false}
                  ownership={false}
                />
              )}
            {isCoApplicantOrGuarantor === "Guarantor" &&
              sessionStorage.getItem("subItem") ===
                ProductSubProductCards.LOAN_TITLE && (
                <CardsCoApplicantForm
                  onSubmit={onFormSubmitCoApplicant}
                  onError={onErrorCoApplicant}
                  data={dataArrayCoApplicant}
                  deleteHandler={handleDeleteClickCoApplicant}
                  isIndividualOrBusiness={isIndividualOrBusiness}
                  guaranty
                  ownership
                />
              )}
            {isCoApplicantOrGuarantor === "CoApplicant" &&
              (sessionStorage.getItem("subItem") ===
                ProductSubProductCards.CARD_TITLE ||
                sessionStorage.getItem("subItem") ===
                  ProductSubProductCards.DEPOSIT_TITLE) && (
                <CardsCoApplicantForm
                  onSubmit={onFormSubmitCoApplicant}
                  onError={onErrorCoApplicant}
                  data={dataArrayCoApplicant}
                  deleteHandler={handleDeleteClickCoApplicant}
                  isIndividualOrBusiness={isIndividualOrBusiness}
                  guaranty={false}
                  ownership={false}
                />
              )}
            {isCoApplicantOrGuarantor === "Signer" &&
              (sessionStorage.getItem("subItem") ===
                ProductSubProductCards.CARD_TITLE ||
                sessionStorage.getItem("subItem") ===
                  ProductSubProductCards.DEPOSIT_TITLE) &&
              sessionStorage.getItem("AccountType") ===
                ProductSubProductCards.PERSONAL_TITLE && (
                <CardsCoApplicantForm
                  onSubmit={onFormSubmitCoApplicant}
                  onError={onErrorCoApplicant}
                  data={dataArrayCoApplicant}
                  deleteHandler={handleDeleteClickCoApplicant}
                  isIndividualOrBusiness={isIndividualOrBusiness}
                  guaranty={false}
                  ownership={false}
                />
              )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StepSecondCoApplicantView;
