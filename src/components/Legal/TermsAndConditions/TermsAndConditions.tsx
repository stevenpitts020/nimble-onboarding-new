import React, { useContext } from "react";
import _ from "lodash";
import moment from "moment";
import "./terms-and-conditions.sass";
import FormatHelper from "../../../utils/FormatHelper";

import Document from "../Document/Document";
import { ITermsAndConditions } from "./types";
import { InstitutionContext } from "../../../store";
import { IDisclosure } from "../../../NimbleRouter";

import { sanitize } from "dompurify";

import DEFAULT_DISCLOSURES from "./DEFAULT_DISCLOSURES.json";
import SIDE_MENU_DISCLOSURES from "../../Steps/StepTermsAndConditions/SIDE_MENU_DISCLOSURES";

const TermsAndConditions: React.FC<ITermsAndConditions> = ({
  activeDisclosure,
}) => {
  const institution = useContext(InstitutionContext);

  const disclosures = _.cloneDeep(
    institution?.disclosures || DEFAULT_DISCLOSURES
  );

  const header = disclosures.data?.shift();

  const title = _.find(SIDE_MENU_DISCLOSURES, {
    id: activeDisclosure,
  })?.title;

  const date = FormatHelper.dateFormatExtended(
    disclosures.revised ? moment(disclosures.revised).toDate() : new Date()
  );
  return (
    <Document classNameProps="ml-5">
      <header>
        <span className="flex font-bold font-poppins text-2xl mb-2 text-xiketic">
          {title}
        </span>
        <span className="flex text-gray font-normal mb-4">
          Last Revised: {date}
        </span>
      </header>
      <div className="bg-white terms-block content font-poppins overflow-x-hidden overflow-y-scroll">
        {
          <section
            dangerouslySetInnerHTML={{ __html: sanitize(header?.text) }}
          />
        }
        {disclosures?.data?.map((disclosure: IDisclosure) => (
          <section key={JSON.stringify(disclosure.name)}>
            <h4>{disclosure.name}</h4>
            {
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitize(disclosure.text),
                }}
              />
            }
          </section>
        ))}
      </div>
    </Document>
  );
};
export default TermsAndConditions;
