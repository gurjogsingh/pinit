import { Cancel, Room } from '@mui/icons-material';
import axios from 'axios';
import {useEffect, useState, useRef} from 'react';
import './login.css'

function Login({setShowLogin, myStorage, setCurrentUser}) {
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            'username': usernameRef.current.value,
            'password': passwordRef.current.value
        };

        try {
            const response = await axios.post('http://localhost:8800/users/login');
            myStorage.setItem('username', response.data.username);
            setCurrentUser(response.data.username);
            setShowLogin(false);
            setError(false);
        } catch (error){
            setError(true);
        }

    }    
    return(
        <div className='loginContainer'>
            <div className='loginLogo'>
                <Room/>
                PinIt
            </div>
            <form onSubmit={handleSubmit}> 
                <input type = 'text' placeholder='Create a username!' ref={usernameRef}/>
                <input type = 'password' placeholder='Create a password!' ref={passwordRef}/>
                <button className='loginButton'>Login</button>
                { error && <span className='loginError'>Oops! Try again!</span>}

            </form>
            <Cancel className = 'loginCancel' onClick = {() => setShowLogin(false)}/>

        </div>
    )
}

export default Login;