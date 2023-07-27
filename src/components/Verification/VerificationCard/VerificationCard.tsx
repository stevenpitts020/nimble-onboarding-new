import React from "react";
import "./VerificationCard.sass";
interface Card {
  image: any;
  title: string;
  active?: boolean;
}

const VerificationCard = React.forwardRef(
  (props: Card, ref: React.Ref<HTMLSelectElement>) => {
    return (
      <div className="VerificationCard">
        <div className="card-content">
          <div className="verification-image">
            <div className="img">
              <img src={props.image} />
            </div>
            <div className="card-title">{props.title}</div>
          </div>
        </div>
      </div>
    );
  }
);

export default VerificationCard;
