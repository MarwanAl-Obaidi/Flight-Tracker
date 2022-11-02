import ReactDOM from 'react-dom/client'
import React, { useEffect, useState } from 'react';
import './App.css';
import loadingAnimation from './loadingAnimation.gif';
import moment from 'moment-timezone';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom"

moment.tz.setDefault('Europe/Helsinki');

//var myHeaders = new Headers();
//myHeaders.append("Accept", "application/xml");
//myHeaders.append("app_id", "54b2ca53");
//myHeaders.append("app_key", "333b3e7b0c89a629e6d94759afe5427f");

//var requestOptions = {
//    method: 'GET',
//    headers: myHeaders,
//    redirect: 'follow'
//};

const Home = () => {
  const navigate = useNavigate();

  const [iata, setIata] = useState('');

  const onSubmit = e => {
    e.preventDefault();

    navigate(`/${iata}`)
  }

  return <div className='App'>
    <h1>Flight Tracker</h1>
    <p>Main Page</p>
    {/* <Link to="/hel">Helsinki</Link> */}
    <form onSubmit={onSubmit}>
      <label for="iata">IATA</label>
      <input onChange={e => setIata(e.target.value)} value={iata} required placeholder='HEL' name="iata"/>
      <button type="submit">GO</button>
    </form>
  </div>
}

function Airport() {
  const [arrivals, setArrivals] = useState([]);
  const [isLoading, setIsLoading] = useState(null);
  
  const { iata } = useParams();

  useEffect(() => {
    // fetch('https://flight-tracker-api.onrender.com/api/helsinki/arrivals')
    //   .then(response => response.json())
    //   .then(resData => {
    //     setReady(true);
    //     setArrivals(resData.arrivals);
    //   })
    
    setIsLoading(true);
    fetch(`https://airlabs.co/api/v9/schedules?api_key=0f5d74b9-c3e0-4d23-b617-82492830fda8&arr_iata=${iata}`)
      .then(response => response.json())
      .then(resData => {
        resData.response.sort((flightA, flightB) => moment(flightA.arr_time, 'YYYY-MM-DD HH:mm').format('x') - moment(flightB.arr_time, 'YYYY-MM-DD HH:mm').format('x'))
        setArrivals(resData.response.filter(flight => moment(flight.arr_time, 'YYYY-MM-DD HH:mm').isAfter(moment())));
        setIsLoading(false);
      });
  }, []);

  // const appId = 54b2ca53
  // const AppKey = 333b3e7b0c89a629e6d94759afe5427f
  // const accesskeynr2 = 0f5d74b9-c3e0-4d23-b617-82492830fda8

  return (
    <div className="App">
      <h1>Helsinki / Arrivals</h1>
      {/* <p>Powered by: <a href="https://flight-tracker-api.onrender.com/">flight-tracker-api</a></p> */}
      <p>Powered by: <a href="https://airlabs.co/" target="_blank">AirLabs API</a></p>
      <Link to="/">Back</Link>
      <div>
        { isLoading ? <div className="loading">
          <div>
            Loading...
          </div>
          <div>
            <img src={loadingAnimation} alt="Loading animation"></img>
          </div>
        </div> : (!arrivals?.length ? <div>No arrivals found for IATA code: {iata}</div> : arrivals.map((plane, i) => {
          const arrTime = moment(plane.arr_time, 'YYYY-MM-DD HH:mm')
          return <table className="Table" key={`plane-${i}`}>
            <tbody>
              <tr>
                <th colSpan="2">Flight Number: {plane.flight_iata}</th>
              </tr>
              <tr>
                <td>From: {plane.dep_iata}</td>
                <td>To: {plane.arr_iata}</td>
              </tr>
              <tr>
                <td colSpan="2">Arrival: {arrTime.format(`HH:mm${arrTime.isSame(moment(), 'day') ? '' : ' DD.MM.YYYY'}`)}</td>
              </tr>
            </tbody>
          </table>
        }))}
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
        <Route path="/:iata" element={<Airport />} />
      </Routes>
      <div>
        <br />
        <em>Innovation Project - 2022</em>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App /></Router>)
