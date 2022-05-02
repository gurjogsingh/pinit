import './sidebar.css'
import {Room, Star } from '@mui/icons-material';
import axios from 'axios';
import { useState, useEffect } from 'react';

function Sidebar({pins, setViewState, setCurrentPlaceId, viewState, currentUser}){
    
    const [users, setUsers] = useState([]);
    const [pinUser, setPinUser] = useState(currentUser);
    const [showUsers, setShowUsers] = useState(false);
    const [showPins, setShowPins] = useState(true);

    useEffect(() => {
        const getUsers = async () => {
        try {
            const response = await axios.get("/users");
            setUsers(response.data);
        } catch(e){
            console.log(e)
        }
        }
        getUsers()
    }, []);

    const handleOnClick = (pin) => {
        setCurrentPlaceId(pin._id)
        setViewState({...viewState, latitude: pin.latitude, longitude: pin.longitude});

    }

    const handleMyPinsClick = () => {
        setPinUser(currentUser);
        setShowPins(true);
        setShowUsers(false);
    }

    const handleOtherUsersClick = () => {
        setShowPins(false);
        setShowUsers(true);
    }

    const handleUserClick = (user) => {
        setPinUser(user.username);
        setShowPins(true);
        setShowUsers(false);
    }




    return(
        
        <>
        <div className='sidebarContainer'>

        {(pinUser === currentUser) && (showPins === true) &&  <div className='sidebarHeader'>My Pins</div>}
        {(pinUser !== currentUser) && (showPins === true) &&  <div className='sidebarHeader'>{pinUser}'s Pins</div>}
        { (showPins === true) && 
            <div className='sidebarPins'>
            {pins.map( (pin) => (
                (pin.username === pinUser) && 
                <div className='sidebarPlace'>
                    <div className='sidebarItems'>
                    <span className='sidebarTitle'>{pin.title}</span>
                    <span className='sidebarDesc'>{pin.description}</span>
                    <div className='sidebarRating'>
                    {Array(pin.rating).fill(<Star className='appStar'/>)}
                    </div>
                    </div>
                <Room className='sidebarPin' onClick={() => handleOnClick(pin)}/>
            </div>   
            ))}
            </div>
        }
        { (showUsers === true) &&
            <div className='sidebarUsers'>
            {users.map( (user) => (
                <div className='sidebarUser' onClick={() => handleUserClick(user)}>
                    <span className='sidebarUsername'>{user.username}</span>  
            </div>   
            ))}
            </div>
        }
            <div className='sidebarButtons'>
            <button className='sidebarMyPins' onClick={handleMyPinsClick}>My Pins</button>
            <button className='sidebarOtherUsers' onClick={handleOtherUsersClick}>Other Users</button>
            </div>
        </div>
        

        </>
        );
}

export default Sidebar;