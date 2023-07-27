import React from "react";

const FakePlaceholder = ({ placeholder, value }) => {
  const numbers = value?.toString().match(/\d/g)?.join("") || "";
  let formattedNumber = "";
  if (numbers.length) {
    formattedNumber += "(" + numbers.slice(0, 3);
  }
  if (numbers.length > 3) {
    formattedNumber += ") " + numbers.slice(3, 6);
  }

  if (numbers.length > 6) {
    formattedNumber += "-" + numbers.slice(6);
  }

  return (
    <span
      className="left-0 absolute text-grayChateau text-14 w-full"
      style={{ paddingTop: "1px", fontStyle: "italic" }}
    >
      {value ? (
        <>
          <span className="text-black text-14">{formattedNumber}</span>
          {placeholder?.slice(formattedNumber?.toString().length)}
        </>
      ) : (
        <span>{placeholder}</span>
      )}
    </span>
  );
};

export default FakePlaceholder;
