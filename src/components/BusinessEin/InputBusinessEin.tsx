import React from "react";
import { IInputBusinessEin } from "./types";

const InputBusinessEin = ({
  withDomain,
  text,
  placeholder,
  type,
}: IInputBusinessEin) => {
  return withDomain ? (
    <div>
      <p className="font-medium font-inter">{text}</p>
      <div className="relative">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <p className="text-sm text-neutral60">HTTPS://WWW.</p>
        </div>
        <input
          type={type || "text"}
          className="block pl-[115px] mt-2 border border-neutral30 rounded-lg pt-[10px] pb-[9px]  pl-3 text-sm w-full outline-0"
          placeholder={placeholder}
        />
      </div>
    </div>
  ) : (
    <div className="flex flex-col relative justify-end">
      <p className="font-medium">{text}</p>
      <input
        type={type || "text"}
        placeholder={placeholder}
        className="mt-2 border border-neutral30 rounded-lg pt-[10px] pb-[9px] pl-3 text-sm w-full outline-0"
      />
    </div>
  );
};

export default InputBusinessEin;
