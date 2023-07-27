import React, { useContext, useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import NewStepVerifyPhoneView from "./NewStepVerifyPhoneView";
import { ProspectContext } from "../../../store";

const NewStepVerifyPhone: React.FC = () => {
  const timeoutRef: { current: NodeJS.Timeout | null } = useRef(null);
  const history = useHistory();
  const [code, setCode] = useState("");
  const [emptyField, setEmptyField] = useState(false);

  const { prospect } = useContext(ProspectContext);

  useEffect(() => {
    if (!code) {
      timeoutRef.current = setTimeout(() => setEmptyField(true), 2000);
    } else {
      timeoutRef.current = null;
      setEmptyField(false);
    }
  }, [code]);

  const onComplete = (code) => {
    setCode(code);
    setTimeout(() => history.push("/onboarding/authentication-email"), 1000);
  };

  const onWrongNumber = () => {
    history.push("/onboarding");
  };

  return (
    <NewStepVerifyPhoneView
      showSidebarTips={emptyField}
      code={code}
      loading={false}
      onComplete={onComplete}
      isComplete={code?.length === 6}
      phoneNumber={prospect.signer.phoneNumber || ""}
      onWrongNumber={onWrongNumber}
    />
  );
};

export default NewStepVerifyPhone;
