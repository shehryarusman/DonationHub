import {React, useEffect, useState} from "react";
import data from "../data.json";

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

function Map({sum}) {
  console.log(sum);
  /*const [centerdata, setCenterdata] = useState([]);

  useEffect(() => {
    function getData() {
      axios({
        method: "GET",
        url: "/centers",
      }).then((response) => {
        const res = response.data;
        setCenterdata(res);
      });
    }
    getData();
  }, []);
*/
  useEffect(() => {
    var L = window.L;
    var mymap = L.map("map").setView([39.9635841, -75.188334300000], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(mymap);

    data.map((item) =>{
      var m = L.marker([item.lat, item.long]).addTo(mymap);
  });
    /*centerdata.map((item) => {
      const { lat, lon } = item;
    });*/

    return () => {
      mymap.remove();
    };
  }, []);

  function computeImpact(stock, donated, need){
    return ((stock + donated + need)-(stock+need))/(stock + need)*100;
  }

 return (
    <div className="Map">
      <h2 className="title">Donation Centers Near You</h2>
      <div className="Map-Container">
        <div className="Map-Map">
           <div id="map"></div>
        </div>
        <div className="Map-List">
          {data.map((item) => (
            <div
              className="Map-List-Card"
              key={item.name}
              style={{
                border: `1px solid ${getColor( computeImpact(item.stock, 4,item.need).toFixed(2))}`,
                boxShadow: `-5px 5px 1px ${getColor( computeImpact(item.stock, 4,item.need).toFixed(2))}`,
                borderRadius: "10px",
              }}
            >
              <p className="Item-Name">
                <strong>{item.name}</strong>
              </p>
              <p
                className="Item-Impact"
                style={{ color: getColor( computeImpact(item.stock, 4, item.need).toFixed(2)) }}
              >
                <strong>Impact: {computeImpact(item.stock, 4, item.need).toFixed(2)}%</strong>
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
