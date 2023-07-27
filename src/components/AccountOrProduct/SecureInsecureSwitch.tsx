import React, { useState } from "react";
import { ArrowRight } from "react-feather";

const SecureInsecureSwitch = () => {
  const [toggle, setToggle] = useState(false);
  const toggleClass = "transform translate-x-[130px]";
  return (
    <>
      <div>
        <div className="flex flex-col justify-center items-center">
          <div
            className="min-w-[220px] h-[50px] flex items-center bg-neutral-700 rounded-2xl cursor-pointer "
            onMouseEnter={() => setToggle(!toggle)}
          >
            <div
              className={
                "bg-blueDarker h-10 w-10 ml-5 rounded-full shadow-md duration-300 ease-in-out flex flex-col justify-center items-center mx-auto" +
                (toggle ? toggleClass : null)
              }
            >
              <ArrowRight />
            </div>
          </div>
        </div>
        <div className="flex justify-around font-inter mt-4 font-bold text-sm text-white">
          <p>SECURE</p>
          <p>UNSECURE</p>
        </div>
      </div>
    </>
  );
};

export default SecureInsecureSwitch;
