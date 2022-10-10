import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [isReady, setReady] = useState(false);
  const [flight_number, set_flight_number] = useState("");

  useEffect(() => {
    fetch("https://flight-tracker-api.onrender.com/api/helsinki/arrivals")
    .then(response => response.json())
    .then(data => {
      setReady(true);
      //API Fetch Test
      set_flight_number(data.arrivals[0].flight_number);
    })
    .catch(err => console.log(err))
  }, [])

  if (!isReady)
    return <div className="loading">Loading...</div>

  return (
    <div className="App">
      <h1>Helsinki Airport</h1>
      {flight_number}
    </div>
  );
}

export default App;
