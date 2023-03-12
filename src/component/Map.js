import data from "../data.json";
import { React, useContext, useEffect, useState } from 'react';
import { DonationContext } from './DonationContext';

function getColor(impact) {
  if (impact > 10) {
    return "green";
  } else if (impact > 7) {
    return "#F9DC5C";
  } else if (impact > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function Map() {
  const { donationValue } = useContext(DonationContext);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    var L = window.L;
    var mymap = L.map("map").setView([39.9635841, -75.188334300000], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href=http://www.openstreetmap.org/copyright>OpenStreetMap</a>',
    }).addTo(mymap);

    const computedData = data.map((item) => {
      const impact = computeImpact(item.stock, donationValue, item.need);
      return {
        ...item,
        impact
      };
    });
    computedData.sort((a, b) => b.impact - a.impact);
    setSortedData(computedData);

    data.map((item) => {
      var m = L.marker([item.lat, item.long]).addTo(mymap);
      m.on('click', function() {
        handleClick(item.name);
      });
    });

    return () => {
      mymap.remove();
    };
  }, [donationValue]);

  function computeImpact(stock, donated, need){
    return ((stock + donated + need)-(stock+need))/(stock + need)*100;
  }

  function handleClick(name) {
    console.log(`Button clicked: ${name}`);
  }

  return (
    <div className="Map">
      <h2 className="title">Donation Centers Near You</h2>
      <div className="Map-Container">
        <div className="Map-Map">
           <div id="map"></div>
        </div>
        <div className="Map-List">
          {sortedData.map((item) => (
            <button
              className="Map-List-Card"
              key={item.name}
              style={{
                border: `1px solid ${getColor(item.impact.toFixed(2))}`,
                boxShadow: `-5px 5px 1px ${getColor(item.impact.toFixed(2))}`,
                borderRadius: "10px",
              }}
              onClick={() => handleClick(item.name)}
            >
              <p className="Item-Name">
                <strong>{item.name}</strong>
              </p>
              <p
                className="Item-Impact"
                style={{ color: getColor(item.impact.toFixed(2)) }}
              >
                <strong>Impact: {item.impact.toFixed(2)}%</strong>
              </p>
              <p className="Item-Address">Address: {item.address}</p>
              <p className="Item-Contact">Contact: {item.phone}</p>
              <p className="Item-Hours">Hours: {item.hours}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Map;
