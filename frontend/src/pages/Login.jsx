import { Cancel, Room } from '@mui/icons-material';
import axios from 'axios';
import {useEffect, useState, useRef} from 'react';
import './login.css'
import { useNavigate } from "react-router-dom";

function Login({setShowLogin}) {
    const myStorage = window.localStorage;
    const [currentUser, setCurrentUser] = useState(myStorage.getItem('username'));
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const passwordRef = useRef();
    let navigate = useNavigate();


    const handleRegisterClick = () => {
        navigate('/register');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            'username': usernameRef.current.value,
            'password': passwordRef.current.value
        };

        if (user.username === "" || user.password === ""){
            setError(true);
        } else {
            try {
                const response = await axios.post('/users/login', user);
                myStorage.setItem('username', response.data.username);
                setCurrentUser(response.data.username);
                setError(false);
                navigate('/', { replace: true });
            } catch (error){
                setError(true);
            }
        }

        

    }    
    return(
        <>
        <div className='loginContainer'>
        <div className='loginLogo'>
                <Room/>
                PinIt
            </div>
        <div className='loginBox'>
            
            <form onSubmit={handleSubmit}> 
                <input  className = 'loginText' type = 'text' placeholder='Type your username!' ref={usernameRef}/>
                <input className = 'loginPassword' type = 'password' placeholder='Type your password!' ref={passwordRef}/>
                <button className='loginButton'>Login</button>
                <button className='registerButton' onClick={handleRegisterClick}>Register</button>
                { error && <span className='loginError'>Oops! Try again!</span>}

            </form>
            

        </div>

        </div>
        

        </>
        
    )
}

export default Login;