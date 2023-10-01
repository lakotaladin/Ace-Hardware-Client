import { Card, Skeleton, Image } from "antd";
import React from "react";

const LoadingCard = ({ count }) => {
  const cards = () => {
    let totalCards = [];

    for (let i = 0; i < count; i++) {
      totalCards.push(
        <Card key={i} className="col m-3 gap-5">
          <Skeleton.Image active />
          <Skeleton active />
        </Card>
      );
    }
    return totalCards;
  };
  return (
    <>
      <div className="row pb-5">{cards()}</div>
      <div className="row pb-5">{cards()}</div>
      <div className="row pb-5">{cards()}</div>
    </>
  );
};

export default LoadingCard;
