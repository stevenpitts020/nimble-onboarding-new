import React from "react";
import { IDocumentCards } from "./types";

const DocumentCards: React.FC<IDocumentCards> = ({
  title,
  icon,
  onClick = () => {},
  id,
}) => {
  return (
    <button
      id={id}
      className="flex flex-1 flex-col items-center border-2 border-coolMint rounded-xl
        pb-6 pt-10 relative w-[360px] hover:border-blueCrayola"
      onClick={onClick}
    >
      <img src={icon} alt={title} className="mx-auto mt-6 mb-5" />
      <p className="text-center text-dark font-bold mb-4">{title}</p>
    </button>
  );
};

export default DocumentCards;
