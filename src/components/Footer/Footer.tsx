import React from "react";
import "./Footer.sass";

import { Link } from "react-router-dom";

const Footer: React.FC = () => (
  <div className="ni-footer">
    <p>©{new Date().getFullYear()} NimbleFi, All rights reserved.</p>
    <Link
      to="/onboarding/privacy-policy"
      target="_blank"
      rel="noopener noreferrer"
    >
      Privacy Policy
    </Link>
  </div>
);
export default Footer;
