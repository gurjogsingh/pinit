import { Cancel, Room } from '@mui/icons-material';
import axios from 'axios';
import {useEffect, useState, useRef} from 'react';
import './register.css'

function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            'username': usernameRef.current.value,
            'email': emailRef.current.value,
            'password': passwordRef.current.value
        };

        try {
            await axios.post('http://localhost:8800/users/register', newUser);
            setError(false);
            setSuccess(true);


        } catch (error){
            setError(true);
        }

    }    
    return(
        <div className='registerContainer'>
            <div className='registerLogo'>
                <Room/>
                PinIt
            </div>
            <form onSubmit={handleSubmit}> 
                <input type = 'text' placeholder='Create a username!' ref={usernameRef}/>
                <input type = 'email' placeholder = 'Give your email!' ref={emailRef}/>
                <input type = 'password' placeholder='Create a password!' ref={passwordRef}/>
                <button className='registerButton'>Register</button>
                { success && <span className='registerSuccess'>Successfully registered!</span>}
                { error && <span className='registerError'>Oops! Try again!</span>}

            </form>
            <Cancel className = 'registerCancel' onClick = {() => setShowRegister(false)}/>

        </div>
    )
}

export default Register;