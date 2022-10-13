import React, { useEffect, useState } from 'react';
import '../App.css';

function Hel() {
  const [arrivals, setArrivals] = useState([]);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    fetch('https://flight-tracker-api.onrender.com/api/helsinki/arrivals')
    .then(response => response.json())
    .then(resData => {
      setReady(true);
      setArrivals(resData.arrivals);
    })
  }, []);

  if (!isReady)
    return <div className="loading">Loading...</div>

  return (
    <div className="App">
      <h1>Helsinki / Arrivals</h1>
      <p>Powered by: <a href="https://flight-tracker-api.onrender.com/">flight-tracker-api</a></p>
      <a href="/"><p>Back</p></a>
      <div>
          {
          arrivals.map((plane, index) => 
          <table className="Table" key={index}>
            <tr>
              <th>Flight Number: {plane.flight_number}</th>
            </tr>
            <tr>
              <td>From: {plane.from}</td>
            </tr>
            <tr>
              <td>To: {plane.to}</td>
            </tr>
            <tr>
              <td>Arrival: {plane.arrival}</td>
            </tr>
          </table>
          )
          }
      </div>
    </div>
  );
}

export default Hel;