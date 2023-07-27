import React from "react";
import { useUID } from "react-uid";
import { IDataPrivacy } from "./types";
import "./DataPrivacy.sass";
import ToggleMenu from "../../NewLayout/components/ToggleMenu/ToggleMenu";
import Collapse from "../../NewLayout/components/CollapseComponent/Collapse";
import { ICollapseElement } from "../../NewLayout/components/CollapseComponent/types";

const DataPrivacy: React.FC<IDataPrivacy> = ({ open, togglePrivacy }) => {
  const fakeData: ICollapseElement[] = [
    {
      id: useUID(),
      label: "Who is nimblefi?",
      collapseElement: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
         Nam vel fringilla ex.`,
    },
    {
      id: useUID(),
      label: "Where is my data stored?",
      collapseElement: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
         Nam vel fringilla ex.`,
    },
    {
      id: useUID(),
      label: "Are all of these questions necessary?",
      collapseElement: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
         Nam vel fringilla ex.`,
    },
    {
      id: useUID(),
      label: "How do you ensure privacy is upheld?",
      collapseElement: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex.`,
    },
    {
      id: useUID(),
      label: "Who can see my responses? ",
      collapseElement: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex.`,
    },
    {
      id: useUID(),
      label: "What do you do with my information?",
      collapseElement: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex.`,
    },
    {
      id: useUID(),
      label: "How do you protect against hackers?",
      collapseElement: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Sed ornare tristique nibh, a mattis nibh iaculis ac.
        Nam vel fringilla ex.`,
    },
  ];
  return (
    <ToggleMenu
      open={open}
      toggleMenu={togglePrivacy}
      menuPosition="left"
      className="ni-data-privacy"
    >
      <div className="ni-data-privacy-head">Data Privacy</div>
      <Collapse data={fakeData} itemClassName={"ni-data-privacy-item"} />
    </ToggleMenu>
  );
};

export default DataPrivacy;
