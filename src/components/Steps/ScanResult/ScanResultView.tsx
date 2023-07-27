import React, { useState } from "react";
import { Layout, SIDEBAR_TYPE } from "../../NewLayout/Layout";
import SideBar from "./SideBar";
import PhotoPreviewNew from "../../PhotoCamera/PhotoPreview/PhotoPreviewNew";
import InputCode from "./InputCodeNew";
import Input from "../../Forms/NewInput/Input";
import IScanResult from "./types";
import { ReactComponent as InfoIcon } from "./img/info.svg";
import { ReactComponent as IdCard } from "./img/id-card.svg";
import { ID_MAIN_LAYOUT } from "../../../utils/constants/general";

const ScanResultView = ({ image, documentId, goToNextStep }: IScanResult) => {
  const [isSideBarShow, setIsSideBarShow] = useState(false);

  return (
    <Layout
      sidebarType={SIDEBAR_TYPE.NAVIGATION}
      hideBackButton
      hideHeader
      classNameContainer="flex flex-1 flex-col justify-between items-center"
      footerClassName="z-50 shadow-footer"
      onClickNext={goToNextStep}
      onClick={(e) => {
        if (e?.target?.id === ID_MAIN_LAYOUT) {
          setIsSideBarShow(false);
        }
      }}
    >
      <div
        id="scan-result"
        className="flex flex-1 flex-col justify-center items-center"
      >
        <PhotoPreviewNew image={image} />
        <Input
          name="goverment-id"
          label="CONFIRM YOUR ID"
          renderIcon={({ color }) => <IdCard fill={color} />}
          renderInput={({ ref, onChange, onFocus, onBlur, onKeyDown }) => (
            <InputCode
              value={documentId}
              inputRef={ref}
              length={9}
              loading={false}
              onComplete={(code) => onChange?.(code)}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyDown={onKeyDown}
            />
          )}
          example="123456789"
          autoFocus
          cluesClassName="mt-[34px]"
          clues={[
            {
              renderIcon: () => <InfoIcon />,
              text: () => (
                <>
                  You can find government ID number on the front of your ID
                  card. It&#39;s 9 symbols with 2 letters
                </>
              ),
            },
          ]}
          value="123456789"
          onChange={() => {}}
          classNameContainer="w-[427px] mt-8"
        />
      </div>
      <div
        className="flex mt-24 cursor-pointer mt-aut"
        onClick={() => setIsSideBarShow(true)}
      >
        <p
          id="check-button"
          className="font-inter text-[#0B73EB] underline text-sm font-semibold"
        >
          Check all the Details
        </p>
      </div>
      <SideBar isShow={isSideBarShow} />
    </Layout>
  );
};

export default ScanResultView;
