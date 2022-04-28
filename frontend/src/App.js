import logo from './logo.svg';
import './app.css'
import axios from 'axios'
import {useEffect, useState} from 'react';
import {Map, Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Room, Star} from "@mui/icons-material"
import {format} from 'timeago.js'

function App() {
  const [pins, setPins] = useState([]);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [viewState, setViewState] = useState({
    longitude: 0.1246,
    latitude: 51.5007,
    zoom: 5})
  const [showPopup, setShowPopup] = useState(true);
  
  const handleMarkerClick = (id) => {
    console.log(id)
    setCurrentPlaceId(id);
    console.log(currentPlaceId)
  }

  useEffect(() => {
    const getPins = async () => {
      try {
        const response = await axios.get("http://localhost:8800/pins");
        setPins(response.data);
      } catch(e){
        console.log(e)
      }
    }
    getPins()
  }, []);

  return (
    <div>
      <Map
    {...viewState}
    onMove={evt => setViewState(evt.viewState)}
    style={{width: "100vw", height: "100vh"}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      {pins.map( (pin) => (
        <>
        <Marker
        longitude = {pin.longitude}
        latitude = {pin.latitude}
        offsetLeft = {-20}
        offsetTop = {-10}>
          <Room style = {{fontSize: viewState.zoom * 5, color: 'slateblue'}}
            onClick = {() => handleMarkerClick(pin._id)}/>
        </Marker>
        {(pin._id === currentPlaceId) && (
          <Popup longitude={pin.longitude} latitude={pin.latitude}
            anchor="left"
            closeButton = {true}
            closeOnClick = {false}
            //onClose={() => setShowPopup(false)}
            >
            <div className='appCard'>
              <label>Place</label>
              <h4 className='appPlaceName'>{pin.title}</h4>
              <label>Review</label>
              <span className='appDescription'> {pin.description}</span>
              <label>Rating</label>
              <div className='appRatings'>
                <Star className='appStar'/>
                <Star className='appStar'/>
                <Star className='appStar'/>
                <Star className='appStar'/>
                <Star className='appStar'/>
              </div>
              <label>Information</label>
              <span className='appUsername'>Created by {pin.username}</span>
              <span className='appDate'>{format(pin.createdAt)}</span>
            </div>
            </Popup>)}
        
        </>
      ))}
      )

     
    </Map>

    </div>


    
    
  );
}

export default App;
