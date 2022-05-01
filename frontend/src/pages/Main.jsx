
import './main.css'
import axios from 'axios'
import {useEffect, useState} from 'react';
import {Map, Marker, Popup} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import {Room, Star} from "@mui/icons-material"
import {format} from 'timeago.js'
import Register from './Register';
import Login from './Login';

function Main(){

    const myStorage = window.localStorage;
    const [currentUser, setCurrentUser] = useState(myStorage.getItem('username'));
    const [pins, setPins] = useState([]);
    const [currentPlaceId, setCurrentPlaceId] = useState(null);
    const [newPlace, setNewPlace] = useState(null);
    const [title, setTitle] = useState(null);
    const [description, setDescription] = useState(null);
    const [rating, setRating] = useState(0);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [viewState, setViewState] = useState({
        longitude: 0.1246,
        latitude: 51.5007,
        zoom: 5})
    const [showPopup, setShowPopup] = useState(true);
    
    const handleMarkerClick = (id, latitude, longitude) => {
        setCurrentPlaceId(id);
        setViewState({...viewState, latitude: latitude, longitude: longitude});
    }

    const handleAddClick = (e) => {
        const longitude = e.lngLat.lng;
        const latitude = e.lngLat.lat;
        setNewPlace({
        'latitude': latitude,
        'longitude': longitude
        })
    
    }

    useEffect(() => {
        const getPins = async () => {
        try {
            const response = await axios.get("/pins");
            setPins(response.data);
        } catch(e){
            console.log(e)
        }
        }
        getPins()
    }, []);

    const handleLogout = () => {
        myStorage.removeItem('username');
        setCurrentUser(null);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPin = {
        'username': currentUser,
        'title': title,
        'description': description,
        'rating': rating,
        'latitude': newPlace.latitude,
        'longitude': newPlace.longitude
        }

        try {
        const response = await axios.post("/pins", newPin);
        setPins([...pins, response.data]);
        setNewPlace(null);

        } catch(error) {
        console.log(error)
        }
    }

    return(
        <div>
      <Map
    {...viewState}
    onMove={evt => setViewState(evt.viewState)}
    style={{width: "100vw", height: "100vh"}}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    onDblClick = {handleAddClick}
    doubleClickZoom = {false}

    >
      {pins.map( (pin) => (
        <>
        <Marker
        longitude = {pin.longitude}
        latitude = {pin.latitude}
        offsetLeft = {-viewState.zoom * 2.5}
        offsetTop = {-viewState.zoom * 5}>
          <Room style = {{fontSize: viewState.zoom * 5, color: pin.username === currentUser ? 'tomato' : 'slateblue', cursor: 'pointer'}}
            onClick = {() => handleMarkerClick(pin._id, pin.latitude, pin.longitude)}/>
        </Marker>
        {(pin._id === currentPlaceId) && (
          <Popup longitude={pin.longitude} latitude={pin.latitude}
            anchor="left"
            closeButton = {true}
            closeOnClick = {false}
            onClose={() => setCurrentPlaceId(null)}
            >
            <div className='appCard'>
              <label>Place</label>
              <h4 className='appPlaceName'>{pin.title}</h4>
              <label>Review</label>
              <span className='appDescription'> {pin.description}</span>
              <label>Rating</label>
              <div className='appRatings'>
                {Array(pin.rating).fill(<Star className='appStar'/>)}
              </div>
              <label>Information</label>
              <span className='appUsername'>Created by {pin.username}</span>
              <span className='appDate'>{format(pin.createdAt)}</span>
            </div>
            </Popup>)}
        
        </>
      ))}
      )
       { (newPlace) &&
          <Popup longitude={newPlace.longitude} latitude={newPlace.latitude}
            anchor="left"
            closeButton = {true}
            closeOnClick = {false}
            onClose={() => setNewPlace(null)}
            >
            <div className='appCard'>
             <form onSubmit = {handleSubmit}>
               <label>Title</label>
               <input placeholder='Enter a title!' onChange={(e) => {setTitle(e.target.value)}}></input>
               <label>Review</label>
               <textarea placeholder='Describe it a little!' onChange={(e) => {setDescription(e.target.value)}}></textarea>
               <label>Rating </label>
               <select onChange={(e) => {setRating(e.target.value)}}>
                 <option value='1'>1</option>
                 <option value='2'>2</option>
                 <option value='3'>3</option>
                 <option value='4'>4</option>
                 <option value='5'>5</option>
               </select>
               <button className='appSubmitButton' type = 'submit'>Add Pin</button>
             </form>
            </div>
            </Popup>}
            {currentUser ? (<button className='appLogoutButton' onClick = {handleLogout}>Logout, {currentUser}</button>): 
            <div className='appButtons'>
              <button className='appLoginButton' onClick={() => setShowLogin(true)}>Login</button>
              <button className='appRegisterButton' onClick={() => setShowRegister(true)}>Register</button>
            </div> }
            {showRegister && <Register setShowRegister = {setShowRegister}/>}
            {showLogin && <Login setShowLogin = {setShowLogin} myStorage = {myStorage} setCurrentUser = {setCurrentUser}/>}
    </Map>
    </div>

    );
}

export default Main;