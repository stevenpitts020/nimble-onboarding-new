/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import "./Card.sass";
import spin from "../../../assets/spin.svg";
import { useHistory } from "react-router-dom";

interface Card {
  image: any;
  title: string;
  subTitle: string;
  active?: boolean;
  addSpin?: boolean;
  handleSelect?: () => void;
}

const Card = React.forwardRef(
  (props: Card, ref: React.Ref<HTMLSelectElement>) => {
    return (
      <div className="Card" onClick={props.handleSelect}>
        <div className="card-content">
          <div className="card-image">
            <img src={props.image} />
            {props.addSpin && <img src={spin} className="spin-down" />}
            {props.addSpin && <img src={spin} className="spin-up" />}
          </div>
          <div className="card-title">
            <div className="card-title-title">{props.title}</div>
            <div className="card-title-sub-title">{props.subTitle}</div>
            <div className="btb-select">Select</div>
          </div>
        </div>
      </div>
    );
  }
);

export default Card;
