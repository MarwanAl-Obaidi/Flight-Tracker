
import ReactDOM from 'react-dom/client'
import React, { useEffect, useState } from 'react';
import './App.css';
import loadingAnimation from './loadingAnimation.gif';
import moment from 'moment-timezone';
import aboutBG from './Pictures/aboutBG.jpg';
import genti from './Pictures/genti.png';
import marwan from './Pictures/marwan.png';
import leila from './Pictures/leila.jpg';
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

  return (<div className='Home'>
    <div className='homebackground'>
      <body>
        <div className="homeContainer">
          <h1> WELCOME TO FLIGHT TRACKER! </h1>
          <p>Input the desired airport's IATA code to get started.</p>
          {/* <Link to="/hel">Helsinki</Link> */}
          <form onSubmit={onSubmit}>
            <label for="iata">IATA </label>
            <input onChange={e => setIata(e.target.value)} value={iata} required placeholder='HEL' name="iata" />
            <br></br>
            <br></br>
            <button class="submit">GO</button>
          </form>
        </div>
      </body>
    </div>
  </div>
  )
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
      <br />
      <br />
      <br />

      <h1>ARRIVALS FOR {iata}</h1>
      <p>Powered by: <a href="https://airlabs.co/">AirLabs API</a></p>
      <div class="muie">
        {isLoading ? <div className="loading">
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

  /* const padding = {
    padding: 100,
  } */

  return (
    <div className='navBar'>
      <div>
        <header>
          <Link to="/" class="logo">FLIGHT TRACKER</Link>
          <ul class="navbar">
            <li>
              <Link to="/">HOME</Link>
            </li>
            <li>
              <Link to="/about">ABOUT</Link>
            </li>
            <li>
              <Link to="/hel">HELSINKI</Link>
            </li>
          </ul>
        </header>
      </div>
      <body>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:iata" element={<Airport />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <div className='BottomText'>
          <br />
          <em>Innovation Project - 2022</em>
        </div>
      </body>
    </div>
  )
}

const About = () => {

  return (<div className='About'>

    <body>
      <div class="aboutContainer">
        <h1> OUR TEAM </h1>
        <div class="team">
          <div class="member">
            <div class="personIMG">

            </div>
            <h3>Jonnie</h3>
            <p class="position">Web Design</p>
            <p2 class="description">ipsum bus.</p2>
          </div>
          <div class="member">
            <div class="personIMG">
              <img src={genti} alt="Genti"></img>
            </div>
            <h3>Genti</h3>
            <p class="position">Web Design</p>
            <p2 class="description">ipsum .</p2>
          </div>
          <div class="member">
            <div class="personIMG">
              <img src={marwan} alt="Marwan"></img>
            </div>
            <h3>Marwan</h3>
            <p class="position">Developer / Web Design</p>
            <p2 class="description">
              <a href="https://www.linkedin.com/in/marwan-al-obaidi/">LinkedIn</a>
              <br />
              <a href="https://github.com/MarwanAl-Obaidi">GitHub</a>
            </p2>
          </div>
          <div class="member">
            <div class="personIMG">
              <img src={leila} alt="Leila"></img>
            </div>
            <h3>Leila</h3>
            <p class="position">Embedded Developer and visual artist</p>
            <p2 class="description">
              <a href="https://www.linkedin.com/in/leila-d-d/">LinkedIn</a>
              <br />
              <a href="https://github.com/artemisCeres">GitHub</a>
              <br />
              <a href="https://instagram.com/trilobitaheart">Instagram</a>
            </p2>
          </div>
          <div class="member">
            <div class="personIMG">
              <img src={aboutBG} alt="Iza" ></img>
            </div>
            <h3>Iza</h3>
            <p class="position">Developer</p>
            <p2 class="description">ipsum dolor sit amet, consectetur adipisicing elit. Ab cumque distinctio dolorum temporibus vel voluptatibus.</p2>
          </div>
        </div>
      </div>
      <div class="aboutourapp">
        <h1 class="aboutourapptitle">ABOUT OUR APP</h1>
        <p class="description">Flight Tracker is a web application intended for use by Taxi drivers by offering an opportunity for the user to plan their schedule according to incoming traffic to airports, aiming to reduce the needless waiting periods for their customers. This project was created by students at Metropolia UAS as our Innovation Project. </p>
      </div>
    </body>
  </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Router><App /></Router>)