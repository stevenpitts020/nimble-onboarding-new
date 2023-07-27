import React, { FC } from "react";
import { Link } from "react-router-dom";
import { IHome } from "./type";

const Home: FC<IHome> = (props) => (
  <div data-testid="home" style={props.style}>
    <h2>Welcome</h2>
    <p>Follow the link to get started</p>
    <Link to="/onboarding">Create Bank Account on Central Bank</Link>
  </div>
);
export default Home;
