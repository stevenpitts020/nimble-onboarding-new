import React, { FC } from "react";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import TermLoanItem from "./TermLoanItem";
import { IStepTermLoanView } from "./types";

const StepTermLoanView: FC<IStepTermLoanView> = ({
  termLoanItems,
  goToNext,
}) => {
  return (
    <Layout
      sidebarType={SIDEBAR_TYPE.NAVIGATION}
      classNameContainer="flex flex-1 flex-col justify-center items-center"
      onClickNext={goToNext}
      hideHeader={true}
      showTimer={false}
    >
      <div className="bg-white w-[628px] h-[495px] flex flex-col justify-between p-10 rounded-2xl">
        {termLoanItems.map((item, idx) => (
          <TermLoanItem
            key={item.name.trim()}
            {...item}
            isLast={termLoanItems.length - 1 === idx}
          />
        ))}
      </div>
    </Layout>
  );
};

export default StepTermLoanView;
