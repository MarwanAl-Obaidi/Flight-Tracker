import ReactDOM from 'react-dom/client'
import React, { useEffect, useState } from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"

const Home = () => (
  <div className='App'>
    <h1>Flight Tracker</h1>
    <p>Main Page</p>
    <Link to="/hel">Helsinki</Link>
  </div>
)


function Helsinki() {
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
      <Link to="/">Back</Link>
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

const App = () => {

  const padding = {
    padding: 5
  }

  return (
    <div className='navBar'>
      <div>
        <Link style={padding} to="/">Home</Link>
        <Link style={padding} to="/hel">Helsinki</Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hel" element={<Helsinki />} />
      </Routes>
      <div>
        <br />
        <em>Innovation Project - 2022</em>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App /></Router>)
