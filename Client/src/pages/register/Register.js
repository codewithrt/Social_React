import "./register.css"
import {useRef} from "react";
import {useNavigate} from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  
  const handleClick = async (e)=>{
    e.preventDefault();
    if(password.current.value !== passwordAgain.current.value){
        password.current.setCustomValidity("Passwords don't match!");
    }
    else{
        const user = {
            username: username.current.value,
            password: password.current.value,
            email: email.current.value,
        }
        try {
            const res = await axios.post("/auth/register", user);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }
  }

  return (
    <div className="register">
        <div className="registerWrapper">
        <div className="registerLeft">
            <h3 className="registerLogo">Vibe</h3>
            <span className="registerDesc">
            Connect with the friends around you on Vibe.
            </span>
        </div>
        <div className="registerRight">
            <form className="registerBox" onSubmit={handleClick}>
            <input placeholder="Username" ref={username} className="registerInput" />
            <input placeholder="Email" ref={email} type="email" className="registerInput" />
            <input placeholder="Password" ref={password} type="password" className="registerInput" />
            <input placeholder="Password again" ref={passwordAgain} type="password" className="registerInput" />
            <button className="registerButton" type="submit">Sign Up</button>
            <Link to="/login">
                <button className="registerRegisterButton">
                    Log into your account
                </button>
            </Link>
            
            </form>
        </div>
        </div>
    </div>
    );
}
