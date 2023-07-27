import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <div />;
};
export default ScrollRestoration;
