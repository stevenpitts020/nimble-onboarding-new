import { SET_ACTIVE_ITEM, TOGGLE_DROPDOWN_VISIBILITY } from "./actionTypes";
import { IAction, ITermLoan } from "./types";

export const reducer = (prevState: ITermLoan, action: IAction) => {
  switch (action.type) {
    case SET_ACTIVE_ITEM:
      return {
        ...prevState,
        isShowDropdown: false,
        activeItem: action.payload,
      };
    case TOGGLE_DROPDOWN_VISIBILITY:
      return {
        ...prevState,
        isShowDropdown: action.payload,
      };
    default:
      return prevState;
  }
};
