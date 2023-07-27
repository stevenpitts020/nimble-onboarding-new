import React, { useState } from "react";
import FlipCardProducts from "./FlipCardProducts";
import { ReactComponent as Card } from "./img/card.svg";
import { ReactComponent as Loan } from "./img/loan.svg";
import { ReactComponent as Deposit } from "./img/deposit.svg";
import { ReactComponent as Debit } from "./img/debit.svg";
import { ReactComponent as Revolving } from "./img/revolving.svg";
import { ReactComponent as CD } from "./img/cd.svg";
import { ReactComponent as Checking } from "./img/checking.svg";
import { ReactComponent as Saving } from "./img/saving.svg";
import { ReactComponent as Credit } from "./img/credit.svg";
import { ReactComponent as Term } from "./img/term.svg";
import { ReactComponent as HybridCard } from "./img/hybridCard.svg";
import { ReactComponent as HybridLoan } from "./img/hybridLoan.svg";
import { useHistory } from "react-router-dom";
import HeaderAccountOrProduct from "./HeaderAccountOrProduct";
import Navbar from "./Navbar";
import AccountOrProductCards from "./AccountOrProductCards";
import { IAccountOrProducts } from "./types";
import { Layout, SIDEBAR_TYPE } from "../NewLayout/Layout";
import { ProductSubProductCards } from "./enum";
import { useAccount } from "../../store/AccountContext";

const AccountOrProduct = ({ onClick }: IAccountOrProducts) => {
  const history = useHistory();
  const { updateSubItem } = useAccount();
  const [isActive, setIsActive] = useState(
    ProductSubProductCards.PERSONAL_TITLE
  );
  const [chosenCard, setChosenCard] = useState(
    ProductSubProductCards.PERSONAL_TITLE
  );
  const [isFlipped, setIsFlipped] = useState(false);
  const [isDoubleFlipped, setIsDoubleFlipped] = useState(false);
  const [isNotChangeHeader, setIsNotChangeHeader] = useState(false);
  const [isMouseOnToggle, setIsMouseOnToggle] = useState(false);
  const goToBack = () => {
    history.push("business-or-personal");
    setIsFlipped(!isFlipped);
    setChosenCard(isActive);
    updateSubItem("");
  };
  return (
    <Layout
      dataTestId="StepBusinessOrPersonal"
      className="ni-step-business-or-personal"
      hideHeader
      classNameContainer="flex flex-1 justify-center items-center"
      sidebarType={SIDEBAR_TYPE.NAVIGATION}
      disableNextButton
      hideBackButton={
        chosenCard === ProductSubProductCards.PERSONAL_TITLE ||
        chosenCard === ProductSubProductCards.BUSINESS_TITLE ||
        chosenCard === ProductSubProductCards.OTHER_TITLE
      }
      showTimer={false}
      onClickBack={goToBack}
    >
      <div className="w-fit mx-auto text-center px-8 py-10 rounded-xl bg-white ">
        <div className="text-center max-w-[875px]">
          <HeaderAccountOrProduct />
          <Navbar
            isActive={
              chosenCard !== ProductSubProductCards.PERSONAL_TITLE &&
              chosenCard !== ProductSubProductCards.BUSINESS_TITLE &&
              chosenCard !== ProductSubProductCards.OTHER_TITLE
                ? chosenCard
                : isActive
            }
            title={
              chosenCard !== ProductSubProductCards.PERSONAL_TITLE &&
              chosenCard !== ProductSubProductCards.BUSINESS_TITLE &&
              chosenCard !== ProductSubProductCards.OTHER_TITLE
                ? [
                    ProductSubProductCards.CARD_TITLE,
                    ProductSubProductCards.DEPOSIT_TITLE,
                    ProductSubProductCards.LOAN_TITLE,
                  ]
                : [
                    ProductSubProductCards.BUSINESS_TITLE,
                    ProductSubProductCards.PERSONAL_TITLE,
                    ProductSubProductCards.OTHER_TITLE,
                  ]
            }
            setIsActive={
              chosenCard !== ProductSubProductCards.PERSONAL_TITLE &&
              chosenCard !== ProductSubProductCards.BUSINESS_TITLE &&
              chosenCard !== ProductSubProductCards.OTHER_TITLE
                ? setChosenCard
                : setIsActive
            }
            setIsFlipped={setIsFlipped}
            isFlipped={isFlipped}
            isNotChangeHeader={isNotChangeHeader}
            setIsNotChangeHeader={setIsNotChangeHeader}
            type="AccountType"
          />
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
            <FlipCardProducts
              title={ProductSubProductCards.CARD_TITLE}
              subtitle={
                "A bank-issued card that performs one or more services that relate to giving the client access to a bank account."
              }
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
              renderIcon={() => <Card />}
              isDoubleFlipped={isDoubleFlipped}
              setIsDoubleFlipped={setIsDoubleFlipped}
              renderDepositSubProduct={() => (
                <AccountOrProductCards
                  onClick={onClick}
                  renderIcon={() => <CD className={"w-[140px] h-[140px]"} />}
                  title={"CD"}
                  subtitle={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare tristique nibh, a mattis nibh iaculis ac."
                  }
                />
              )}
              renderCardsSubProduct={() => (
                <AccountOrProductCards
                  onClick={onClick}
                  renderIcon={() => (
                    <Credit className={"w-[140px] h-[140px]"} />
                  )}
                  title={"Credit"}
                  subtitle={
                    "An issued card that enables the cardholder to borrow funds."
                  }
                />
              )}
              renderLoanSubProduct={() => (
                <AccountOrProductCards
                  onClick={onClick}
                  renderIcon={() => (
                    <Revolving className={"w-[140px] h-[140px]"} />
                  )}
                  title={"Revolving"}
                  subtitle={
                    "Revolving credit lines that can be used repeatedly."
                  }
                  isSwitch
                  isMouseOnToggle={isMouseOnToggle}
                  setIsMouseOnToggle={setIsMouseOnToggle}
                />
              )}
              chosenCard={chosenCard}
              setChosenCard={setChosenCard}
              isMouseOnToggle={isMouseOnToggle}
            />
            <FlipCardProducts
              title={ProductSubProductCards.DEPOSIT_TITLE}
              subtitle={
                "A fixed-term investment that includes the deposit of money into an account at a financial institution."
              }
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
              renderIcon={() => <Deposit />}
              isDoubleFlipped={isDoubleFlipped}
              setIsDoubleFlipped={setIsDoubleFlipped}
              renderDepositSubProduct={() => (
                <AccountOrProductCards
                  onClick={() => history.push("deposit-sub-products")}
                  renderIcon={() => (
                    <Checking className={"w-[140px] h-[140px]"} />
                  )}
                  title={"Checking"}
                  subtitle={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare tristique nibh, a mattis nibh iaculis ac. "
                  }
                />
              )}
              renderCardsSubProduct={() => (
                <AccountOrProductCards
                  onClick={onClick}
                  renderIcon={() => <Debit className={"w-[140px] h-[140px]"} />}
                  title={"Debit"}
                  subtitle={
                    "A payment card that makes payments by deducting money directly from a consumer’s checking account"
                  }
                />
              )}
              renderLoanSubProduct={() => (
                <AccountOrProductCards
                  onClick={() => onClick("capture-documents")}
                  renderIcon={() => <Term className={"w-[140px] h-[140px]"} />}
                  title={"Term"}
                  isSwitch
                  isMouseOnToggle={isMouseOnToggle}
                  setIsMouseOnToggle={setIsMouseOnToggle}
                  subtitle={
                    "Non-revolving, one-time lump sums of credit for a specific purpose."
                  }
                />
              )}
              isMouseOnToggle={isMouseOnToggle}
              chosenCard={chosenCard}
              setChosenCard={setChosenCard}
            />

            <FlipCardProducts
              title={ProductSubProductCards.LOAN_TITLE}
              subtitle={
                "A loan is money given to another party in exchange for future repayment of the loan value amount with interest."
              }
              isFlipped={isFlipped}
              setIsFlipped={setIsFlipped}
              isDoubleFlipped={isDoubleFlipped}
              renderIcon={() => <Loan />}
              setIsDoubleFlipped={setIsDoubleFlipped}
              renderDepositSubProduct={() => (
                <AccountOrProductCards
                  onClick={() =>
                    history.push("deposit-sub-products", { active: "Savings" })
                  }
                  renderIcon={() => (
                    <Saving className={"w-[140px] h-[140px]"} />
                  )}
                  title={"Saving"}
                  subtitle={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare tristique nibh, a mattis nibh iaculis ac. "
                  }
                />
              )}
              renderCardsSubProduct={() => (
                <AccountOrProductCards
                  onClick={onClick}
                  renderIcon={() => (
                    <HybridCard className={"w-[140px] h-[140px]"} />
                  )}
                  title={"Hybrid"}
                  subtitle={
                    "Combines both – debit & credit payment functionalities in a single card."
                  }
                />
              )}
              renderLoanSubProduct={() => (
                <AccountOrProductCards
                  onClick={onClick}
                  renderIcon={() => (
                    <HybridLoan className={"w-[140px] h-[140px]"} />
                  )}
                  title={"Hybrid"}
                  subtitle={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ornare tristique nibh, a mattis nibh iaculis ac. "
                  }
                  isSwitch
                  isMouseOnToggle={isMouseOnToggle}
                  setIsMouseOnToggle={setIsMouseOnToggle}
                />
              )}
              isMouseOnToggle={isMouseOnToggle}
              chosenCard={chosenCard}
              setChosenCard={setChosenCard}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountOrProduct;
