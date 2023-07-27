import React, { useState } from "react";
import InputCode from "../../StepVerifyNumber/InputCode";

const SSNField: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [code, setCode] = useState<string | null>(null);
  return (
    <div className="ni-agreement-ssn">
      <span className="ni-agreement-ssn__label">
        Please verify your last 4 of your SSN:
      </span>
      <div className="ni-agreement-ssn__field">
        <InputCode
          length={4}
          splitNumber={4}
          loading={loading}
          onComplete={(value: string) => {
            setCode(value);
          }}
        />
      </div>
    </div>
  );
};

export default SSNField;
