import React from "react";

const LocationCard = ({
  location,
  onSelectLocation,
  onShowDetails,
  highlighted,
}) => {
  const cardStyle = {
    backgroundColor: highlighted ? "#646464" : "#D1D1D1",
  };

  const handleCardClick = () => {
    // Promeni boju kartice

    // Pozovi funkciju za selektovanu lokaciju i prosledi trenutnu lokaciju
    onSelectLocation(location);
  };

  return (
    <div
      className={`location-card p-3 ${highlighted ? "highlighted" : ""}`}
      style={cardStyle}
      onClick={handleCardClick}
    >
      <b style={{ fontSize: "14px" }}>{location.name}</b>
      <p className="p-0 m-0">{location.description}</p>
      <p className="p-0 m-0">{location.adress}</p>
      <p className="p-0 m-0">{location.phone}</p>
      <u style={{ fontSize: "12px" }} onClick={onShowDetails}>
        Store Details
      </u>
    </div>
  );
};

export default LocationCard;
