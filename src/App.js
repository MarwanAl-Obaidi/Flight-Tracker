import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isReady, setReady] = useState(false);
  const [flight_number, set_flight_number] = useState("");
  const [flight_from, set_flight_from] = useState("");
  const [flight_to, set_flight_to] = useState("");
  const [flight_arrival, set_flight_arrival] = useState("");

  useEffect(() => {
    fetch("https://flight-tracker-api.onrender.com/api/helsinki/arrivals")
    .then(response => response.json())
    .then(data => {
      setReady(true);
      set_flight_number(data.arrivals[0].flight_number);
      set_flight_from(data.arrivals[0].from);
      set_flight_to(data.arrivals[0].to);
      set_flight_arrival(data.arrivals[0].arrival);
    })
    .catch(err => console.log(err))
  }, [])

  if (!isReady)
    return <div className="loading">Loading...</div>

  return (
    <div className="App">
      <h1>Helsinki / Arrivals</h1>
      <p>Powered by: <a href="https://flight-tracker-api.onrender.com/">flight-tracker-api</a></p>
      <div>
      <table className="Table">
        <tbody>
          <tr>
            <th>Flight Number: {flight_number}</th>
          </tr>
          <tr>
            <td>From: {flight_from}</td>
          </tr>
          <tr>
            <td>To: {flight_to}</td>
          </tr>
          <tr>
            <td>Arrival: {flight_arrival}</td>
          </tr>
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default App;
