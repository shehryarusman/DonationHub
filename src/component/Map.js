import React from "react";
import data from "../data.json";

function getColor(impact) {
  if (impact > 70) {
    return "green";
  } else if (impact > 50) {
    return "#F9DC5C";
  } else if (impact > 20) {
    return "orange";
  } else {
    return "red";
  }
}

function Map() {
  return (
    <div className="Map">
      <h2 className="title">Donation Centers Near You</h2>
      <div className="Map-Container">
        <div className="Map-Map">
          <h1>Google Map</h1>
        </div>
        <div className="Map-List">
          {data.map((item) => (
            <div
              className="Map-List-Card"
              key={item.name}
              style={{
                border: `1px solid ${getColor(item.impact)}`,
                boxShadow: `-5px 5px 1px ${getColor(item.impact)}`,
                borderRadius: "10px",
              }}
            >
              <p className="Item-Name">
                <strong>{item.name}</strong>
              </p>
              <p
                className="Item-Impact"
                style={{ color: getColor(item.impact) }}
              >
                <strong>Impact: {item.impact}%</strong>
              </p>
              <p className="Item-Address">Address: {item.address}</p>
              <p className="Item-Contact">Contact: {item.phone}</p>
              <p className="Item-Hours">Hours: {item.hours}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Map;
