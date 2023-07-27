import React, { FC, useState } from "react";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import { ReactComponent as RemoveSVG } from "./icon/remove.svg";
import DropdownItems from "./DropdownItems";
import { ICardList, IStepTermLoanPickerView } from "./types";
import FormatHelper from "../../../utils/FormatHelper";

const StepTermLoanPickerView: FC<IStepTermLoanPickerView> = ({
  termLoanPickerItems,
  activeItem,
  setActiveItem,
  goNext,
}) => {
  const [data, setData] = useState<ICardList>([]);
  const handleDelete = (id) => {
    const removeItem = data.filter((dataItem) => {
      return dataItem.id !== id;
    });
    setData(removeItem);
  };
  const updateFieldChanged = (id) => (e) => {
    const newArr = data.map((item) => {
      if (id === item.id) {
        return { ...item, requestPrice: Number(e.target.value) };
      } else {
        return item;
      }
    });
    setData(newArr);
  };
  const { format } = FormatHelper.currencyUSAFormat;
  return (
    <Layout
      sidebarType={SIDEBAR_TYPE.NAVIGATION}
      classNameContainer="flex flex-1 justify-center items-center"
      showTimer={false}
      hideHeader={true}
      onClickNext={goNext}
    >
      <div className=" relative flex flex-col justify-center items-center w-[628px] bg-white p-10 rounded-2xl">
        <div className="flex flex-col items-center">
          <span className="block font-inter font-bold text-2xl text-darkest text-center">
            Term Loan (Secured)
          </span>
          <span className="block w-[420px] font-inter font-normal text-sm text-neutral60 text-center mt-1">
            Choose between real estate, vehicle, equipment, receivables,
            inventory, business (icon), etc.
          </span>
        </div>
        <DropdownItems
          termLoanPickerItems={termLoanPickerItems}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          setData={setData}
          data={data}
        />
        {data.length > 0 && (
          <div className="absolute top-80 bg-white rounded-lg w-[528px] font-inter">
            <div className={"flex justify-between my-4 px-5"}>
              <p>Total request</p>
              <p className="font-bold px-5">
                {format(
                  data
                    .map((item) => item.requestPrice)
                    .reduce((prev, curr) => prev + curr, 0)
                )}
              </p>
            </div>
            <hr className="text-neutral30" />
            {data.map((item) => (
              <div
                key={item.id}
                className="m-10 p-4 rounded-lg border border-neutral30"
              >
                <div className="flex justify-between mb-4">
                  <div className="flex">
                    <img
                      src={item.activeItem.icon}
                      className="h-5"
                      alt={item.activeItem.name}
                    />
                    <p className="ml-2.5 font-medium text-sm">
                      {item.activeItem.name}
                    </p>
                  </div>
                  <RemoveSVG onClick={() => handleDelete(item.id)} />
                </div>
                <hr className="text-neutral30 mb-4" />
                <div className="flex justify-between">
                  <p className="text-xs text-neutral60">Location</p>
                  <p className="text-xs text-neutral100">{item.address}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-neutral60">Type</p>
                  <p className="text-xs text-neutral100">{item.type}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-xs text-neutral60">
                    Based on purchase price
                  </p>
                  <p className="text-xs text-neutral100">{item.price}</p>
                </div>
                <hr className="text-neutral30 mt-4" />
                <p className="text-xs text-neutral100 mt-4 mb-2">
                  Requested amount
                </p>
                <input
                  type="number"
                  value={item.requestPrice}
                  onChange={updateFieldChanged(item.id)}
                  className={
                    "border-neutral30 border rounded-lg w-full outline-0 py-[11px] px-5"
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default StepTermLoanPickerView;
