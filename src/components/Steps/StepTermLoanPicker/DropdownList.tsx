import React, { useContext } from "react";
import { TermLoanContext } from "../../../store/TermLoan/TermLoadContext";

const DropdownList = ({ list }) => {
  const { setActiveItem } = useContext(TermLoanContext);

  return (
    <div
      id="dropdown-list-item"
      className="absolute bg-white w-[175px] border border-neutral30 rounded-lg mt-2 z-10"
    >
      {list.map((item) => {
        return (
          <div
            id="dropdown-list-item"
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="flex h-10 py-2 px-3 cursor-pointer hover:bg-neutral20"
          >
            <img src={item.icon} className="h-5" alt={item.name} />
            <span
              id="dropdown-list-item"
              className="text-neutral60 font-normal font-inter text-sm pl-2"
            >
              {item.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default DropdownList;
