import React from "react";
import AccountOrProductCards from "./AccountOrProductCards";
import clsx from "clsx";
import { IFlipCardProducts } from "./types";
import { ProductSubProductCards } from "./enum";
import { useAccount } from "../../store/AccountContext";

const FlipCardProducts = ({
  title,
  subtitle,
  isFlipped,
  setIsFlipped,
  renderCardsSubProduct,
  setChosenCard,
  chosenCard,
  renderLoanSubProduct,
  renderDepositSubProduct,
  renderIcon,
  isMouseOnToggle,
}: IFlipCardProducts) => {
  const { updateSubItem } = useAccount();
  return (
    <section className="flex justify-center items-center">
      <div className="w-full h-full bg-transparent cursor-pointer group perspective">
        <div
          onClick={() => {
            if (!isMouseOnToggle) {
              setIsFlipped(!isFlipped);
              setChosenCard(title);
              if (
                title === ProductSubProductCards.DEPOSIT_TITLE ||
                title === ProductSubProductCards.CARD_TITLE ||
                title === ProductSubProductCards.LOAN_TITLE
              ) {
                updateSubItem(title);
              }
            }
          }}
          className={clsx(
            "relative grid grid-rows grid-cols preserve-3d  w-full h-full duration-1000",
            isFlipped && "my-rotate-y-180"
          )}
        >
          <div
            className={clsx(
              "backface-hidden w-full h-full my-rotate-y-0 text-center"
            )}
          >
            {(chosenCard === ProductSubProductCards.BUSINESS_TITLE ||
              chosenCard === ProductSubProductCards.PERSONAL_TITLE ||
              chosenCard === ProductSubProductCards.OTHER_TITLE) && (
              <AccountOrProductCards
                title={title}
                subtitle={subtitle}
                renderIcon={renderIcon}
              />
            )}
            {chosenCard === ProductSubProductCards.CARD_TITLE &&
              renderCardsSubProduct()}
            {chosenCard === ProductSubProductCards.LOAN_TITLE &&
              renderLoanSubProduct()}
            {chosenCard === ProductSubProductCards.DEPOSIT_TITLE &&
              renderDepositSubProduct()}
          </div>
          <div
            className={clsx(
              "my-rotate-y-180 backface-hidden w-full h-full absolute"
            )}
          >
            {(chosenCard === ProductSubProductCards.BUSINESS_TITLE ||
              chosenCard === ProductSubProductCards.PERSONAL_TITLE ||
              chosenCard === ProductSubProductCards.OTHER_TITLE) && (
              <AccountOrProductCards
                title={title}
                subtitle={subtitle}
                renderIcon={renderIcon}
              />
            )}
            {chosenCard === ProductSubProductCards.CARD_TITLE &&
              renderCardsSubProduct()}
            {chosenCard === ProductSubProductCards.LOAN_TITLE &&
              renderLoanSubProduct()}
            {chosenCard === ProductSubProductCards.DEPOSIT_TITLE &&
              renderDepositSubProduct()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlipCardProducts;
