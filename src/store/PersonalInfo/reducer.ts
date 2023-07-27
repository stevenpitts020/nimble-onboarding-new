import { CHANGE_PERSONAL_INFO } from "./actionTypes";
import { IAction, IPersonalInfo } from "./types";

export const reducer = (prevState: IPersonalInfo, action: IAction) => {
  switch (action.type) {
    case CHANGE_PERSONAL_INFO:
      return {
        ...prevState,
        personalInfo: prevState.personalInfo.map((item) => {
          if (
            item.data.some(
              (personalItem) => personalItem.key === action.payload.key
            )
          ) {
            const newData = item.data.map((item) => {
              return item.key === action.payload.key
                ? { ...item, value: action.payload.value }
                : item;
            });
            return { ...item, data: newData };
          }

          return item;
        }),
      };
    default:
      return prevState;
  }
};
