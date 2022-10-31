import ReactDOM from 'react-dom/client'
import React, { useEffect, useState } from 'react';
import './App.css';
import loadingAnimation from './loadingAnimation.gif';
import { parseString as parseXmlToJs } from 'xml2js';
import superagent from 'superagent';

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
      superagent.post("https://api.finavia.fi/flights/public/v0/flights/arr/HEL")
          .set('app_key', '333b3e7b0c89a629e6d94759afe5427f')
          .set('app_id','54b2ca53')
          .set('Accept', 'application/xml')
          .set('Access-Control-Allow-Origin', 'localhost:3000')
          .set('Access-Control-Allow-Methods', 'GET',)
          .set('Access-Control-Allow-Headers', 'Accept, app_id, app_key')

      
      //fetch('https://api.finavia.fi/flights/public/v0/flights/arr/HEL?app_id=54b2ca53&app_key=333b3e7b0c89a629e6d94759afe5427f', {
      //    headers: {
      //        Accept: 'application/xml',
      //        app_id: '54b2ca53',
      //        app_key: '333b3e7b0c89a629e6d94759afe5427f',
      //        'Access-Control-Allow-Origin': '*',
      //        'Access-Control-Allow-Methods': 'GET',
      //        'Access-Control-Allow-Headers': 'Accept, app_id, app_key'
      //    },
      //    method: 'GET',
      //    mode: 'no-cors',
      //    credentials: 'same-origin',
      //    redirect: 'follow',
      //    referrerPolicy: 'no-referrer'
      //    })
          .then(response => parseXmlToJs(response.body))
          .then(resData => {
              //setReady(true);
              //setArrivals(resData.arrivals);
              console.log(resData);
          })
  }, []);
    // const appId = 54b2ca53
    // const AppKey = 333b3e7b0c89a629e6d94759afe5427f
  if (!isReady)
    return <div className="loading">
      <div>
        Loading...
      </div>
      <div>
        <img src={loadingAnimation} alt="Loading animation"></img>
      </div>
    </div>

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
