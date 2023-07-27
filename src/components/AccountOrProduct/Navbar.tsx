import React from "react";
import clsx from "clsx";
import { INavbar } from "./types";
import { ProductSubProductCards } from "./enum";
import { useAccount } from "../../store/AccountContext";

const Navbar = ({
  isActive,
  setIsActive,
  title,
  isFlipped,
  setIsFlipped,
}: INavbar) => {
  const { updateAccountType, updateSubItem } = useAccount();
  return (
    <div className="bg-neutral20 p-2 mb-10 mx-auto flex gap-2 justify-between w-auto rounded-[100px] max-w-[431px]">
      {title.map((data) => (
        <button
          key={data}
          className={clsx(
            "outline-0 hover:bg-white hover:text-neutral100 px-10 py-2.5 rounded-[54px] font-inter text-sm font-medium text-neutral60",
            isActive === data && "bg-white text-neutral100"
          )}
          onClick={() => {
            setIsActive(data as ProductSubProductCards);
            setIsFlipped(!isFlipped);
            updateAccountType(data);
            if (
              data === ProductSubProductCards.DEPOSIT_TITLE ||
              data === ProductSubProductCards.CARD_TITLE ||
              data === ProductSubProductCards.LOAN_TITLE
            ) {
              updateSubItem(data);
            }
          }}
        >
          {data}
        </button>
      ))}
    </div>
  );
};

export default Navbar;
