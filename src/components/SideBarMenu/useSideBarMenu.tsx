import { useCallback, useContext, useEffect, useState } from "react";
import { ReactComponent as EncryptIcon } from "./icons/encrypted-icon.svg";
import { ReactComponent as CompletionIcon } from "./icons/completion.svg";
import { ReactComponent as QualificationIcon } from "./icons/qualification.svg";
import {
  FAQ_PHONE,
  FAQ_ADDRESS,
  FAQ_GOVID,
  FAQ_PRODUCT_SELECTION,
  FAQ_PRODUCT_SELECTION_CARD,
  FAQ_PRODUCT_SELECTION_DEPOSIT,
  FAQ_PRODUCT_SELECTION_LOAN,
  FAQ_DEPOSIT_SUB_PRODUCTS,
  FAQ_DOCUMENT,
} from "./FAQMenuContent";
import { ReactComponent as FrontIcon } from "./icons/front.svg";
import { ReactComponent as BackIcon } from "./icons/back.svg";
import { ReactComponent as InfoIcon } from "./icons/info.svg";
import { FAQ_FLOW } from "./enum";
import { IFaq } from "./types";
import { UrlContext } from "../../store/UrlContext";
import { useAccount } from "../../store/AccountContext";
import { ProductSubProductCards } from "../AccountOrProduct/enum";

const initialMenu = [
  {
    label: "Authentication",
    Icon: EncryptIcon,
    isOpen: false,
    step: [
      "intro",
      "verify-number",
      "authentication-email",
      "business-or-personal",
      "capture-documents",
      "scan-result",
    ],
    subItems: [
      {
        Icon: FrontIcon,
        iconClass: "",
        label: "Scan the front of ID",
        step: "front",
      },
      {
        Icon: BackIcon,
        iconClass: "",
        label: "Scan the back of ID",
        step: "back",
      },
      {
        Icon: InfoIcon,
        iconClass: "mb-[-11px]",
        label: "Confirm ID details",
        step: "scan-result",
      },
    ],
  },
  {
    label: "Qualification",
    Icon: QualificationIcon,
    step: "co-applicant",
  },
  {
    label: "Completion",
    Icon: CompletionIcon,
    step: "personal-info",
  },
];

const updateItem = (indexes, data, newData) => {
  const [currentIndex, ...otherIndexes] = indexes;
  return data.map((item, index) => {
    if (index === currentIndex) {
      return {
        ...item,
        ...(indexes.length === 1
          ? newData
          : { subItems: updateItem(otherIndexes, item.subItems, newData) }),
      };
    }
    return item;
  });
};

const getItemByIndex = (indexes, menu) =>
  indexes.reduce(
    (acc, indexItem, index) =>
      index === indexes.length - 1 ? acc[indexItem] : acc[indexItem].subItems,
    menu
  );

const toggleItemMenu = (indexes, menu) => {
  const item = getItemByIndex(indexes, menu);
  if (item.subItems?.length) {
    return updateItem(indexes, menu, { isOpen: !item.isOpen });
  }
  return menu;
};

const findByStep = (menu, findStep) =>
  menu.reduce((acc, item, index) => {
    if (item.subItems?.length) {
      const indexes = findByStep(item.subItems, findStep);
      if (indexes.length) {
        return [...acc, index, ...indexes];
      }
    }
    if (typeof item?.step === "object") {
      if (item?.step.includes(findStep)) {
        return [index];
      }
    }
    if (item.step === findStep) {
      return [index];
    }
    return acc;
  }, []);

const findFaqForSteps = (step: string, { subItem }) => {
  switch (step) {
    case FAQ_FLOW.STEP_PHONE:
    case FAQ_FLOW.STEP_VERIFY_PHONE:
    case FAQ_FLOW.STEP_INTRO:
    case FAQ_FLOW.STEP_EMAIL:
      return FAQ_PHONE;
    case FAQ_FLOW.STEP_SELFIE:
      return FAQ_GOVID;
    case FAQ_FLOW.STEP_INFO:
      return FAQ_ADDRESS;
    case FAQ_FLOW.STEP_PRODUCT_SELECTION:
      if (subItem === ProductSubProductCards.CARD_TITLE)
        return FAQ_PRODUCT_SELECTION_CARD;
      if (subItem === ProductSubProductCards.DEPOSIT_TITLE)
        return FAQ_PRODUCT_SELECTION_DEPOSIT;
      if (subItem === ProductSubProductCards.LOAN_TITLE)
        return FAQ_PRODUCT_SELECTION_LOAN;
      return FAQ_PRODUCT_SELECTION;
    case FAQ_FLOW.STEP_DEPOSIT_SUB_PRODUCTS:
      return FAQ_DEPOSIT_SUB_PRODUCTS;
    case FAQ_FLOW.STEP_FRONT:
    case FAQ_FLOW.STEP_BACK:
    case FAQ_FLOW.STEP_CAPTURE:
    case FAQ_FLOW.STEP_SELECT_DOCUMENT:
      return FAQ_DOCUMENT;
  }
  return null;
};

const useSideBarMenu = () => {
  const { currentStep } = useContext(UrlContext);
  const [menu, setMenu] = useState(initialMenu);
  const [active, setIsActive] = useState([0, 0]);
  const [currentFAQ, setCurrentFAQ] = useState<IFaq[] | null>(null);
  const { subItem } = useAccount();

  useEffect(() => {
    const indexes = findByStep(menu, currentStep);
    setIsActive(indexes);
    const currentFaq = findFaqForSteps(currentStep, { subItem });
    setCurrentFAQ(currentFaq);
  }, [currentStep, menu, subItem]);

  const onClickItem = useCallback(
    (indexes) => {
      setMenu((prevMenu) => toggleItemMenu(indexes, prevMenu));
    },
    [setMenu]
  );
  return { menu, onClickItem, activeIndex: active, faq: currentFAQ };
};

export default useSideBarMenu;
