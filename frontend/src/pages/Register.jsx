import { Cancel, Room } from '@mui/icons-material';
import axios from 'axios';
import {useState, useRef} from 'react';
import './register.css';
import { useNavigate } from "react-router-dom";

function Register({setShowRegister}) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    let navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            'username': usernameRef.current.value,
            'email': emailRef.current.value,
            'password': passwordRef.current.value
        };
        if (newUser.username === "" || newUser.email === "" || newUser.password === ""){
            setError(true);
        } else {
            try {
                await axios.post('/users/register', newUser);
                setError(false);
                setSuccess(true);
            } catch (error){
                setError(true);
            }
        }   
    }    
    return(
        <>
        <div className="registerContainer">
        <div className='registerLogo'>
                <Room/>
                PinIt
            </div>
        <div className='registerBox'>
            <form onSubmit={handleSubmit}> 
                <input className = 'registerText' type = 'text' placeholder='Create a username!' ref={usernameRef}/>
                <input className = 'registerEmail' type = 'email' placeholder = 'Give your email!' ref={emailRef}/>
                <input className = 'registerPassword' type = 'password' placeholder='Create a password!' ref={passwordRef}/>
                <button className='registerButton'>Register</button>
                <button className='loginButton' onClick = {handleLoginClick}>Login</button>
                { success && <span className='registerSuccess'>Successfully registered! Login now!</span>}
                { error && <span className='registerError'>Oops! Try again!</span>}

            </form>

        </div>

        </div>
        
        </>
        
    )
}

export default Register;