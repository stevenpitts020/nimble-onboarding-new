import React from "react";
import Checkbox from "../../../Forms/Checkbox/Checkbox";

const FooterCheckbox: React.FC<{ onChange: () => void; checked: boolean }> = ({
  onChange,
  checked,
}) => (
  <div className="personal-income-footer-element flex">
    <Checkbox
      id="edic"
      name="edic"
      className="personal-income-checkbox mr-[12px]"
      iconType="squere"
      onChange={onChange}
      checked={checked}
    />
    <div className="font-inter font-normal text-slateGray">
      By checking this box, I acknowledge that Whoever, for the purpose of
      influencing in any way the action of the FDIC knowingly makes or invites
      reliance on a false, forged, or counterfeit statement, document, or thing
      shall be fined not more than $1,000,000 or imprisoned not more than 5
      years or both. 18 U.S.C. § 1007.
    </div>
  </div>
);

export default FooterCheckbox;
