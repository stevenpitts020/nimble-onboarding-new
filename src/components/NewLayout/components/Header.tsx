import React, { useState } from "react";
import clsx from "clsx";
import logo from "../img/logo.png";

const Header = ({ onGetStarted, disableGetStarted, togglePrivacy }) => {
  const [links] = useState([
    { label: "How it Works", link: "/how-it-works" },
    { label: "About", link: "/about" },
    { label: "FAQ", link: "/faq" },
  ]);

  return (
    <header className="flex flex-1 justify-between items-center pt-4 px-16 mx-2 z-2">
      <div>
        <a href="/">
          <img src={logo} alt="logo" />
        </a>
      </div>
      <div>
        {links.map(({ label, link }, index) => (
          <a
            key={link}
            href={link}
            className={clsx("text-neutral80 py-3 px-6 font-medium", {
              "mr-3": index !== links.length - 1,
            })}
          >
            {label}
          </a>
        ))}
      </div>
      <div>
        <button onClick={togglePrivacy} className="font-bold py-3 px-6 mr-4">
          Data Privacy
        </button>
        <button
          disabled={disableGetStarted}
          onClick={onGetStarted}
          className={clsx(
            "bg-main-accent text-white py-3 px-6 rounded-full font-semibold font-archivo",
            { "bg-neutral50": disableGetStarted }
          )}
        >
          Get Started
        </button>
      </div>
    </header>
  );
};

export default Header;
