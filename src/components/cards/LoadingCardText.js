import { Card, Skeleton } from "antd";
import React from "react";

const LoadingCardText = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card key={i} className="skeletoncard col m-3 gap-5">
          <Skeleton active />
        </Card>
      );
    }
    return totalCards;
  };
  return (
    <>
      <div className="cardtextloading w-100 row pb-5">{cards()}</div>
      <div className="cardtextloading w-100 pb-5">{cards()}</div>
    </>
  );
};

export default LoadingCardText;
