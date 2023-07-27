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

const TermsAndConditions: React.FC<ITermsAndConditions> = () => {
  const institution = useContext(InstitutionContext);

  const disclosures = _.cloneDeep(
    institution?.disclosures || DEFAULT_DISCLOSURES
  );

  const header = disclosures.data?.shift();

  const date = FormatHelper.dateFormatExtended(
    disclosures.revised ? moment(disclosures.revised).toDate() : new Date()
  );
  return (
    <Document>
      <header>
        <h1 className="terms">{header?.name}</h1>
        <p className="document-updated-date">Last Revised: {date}</p>
      </header>
      {<section dangerouslySetInnerHTML={{ __html: sanitize(header?.text) }} />}
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
    </Document>
  );
};
export default TermsAndConditions;
