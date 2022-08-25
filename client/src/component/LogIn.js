import React from "react";
import './LogIn.css';
import axios from 'axios';
import { VoteContext } from "../RTVContext";

const initInputs = { email: "", password: "" }

function LogIn() {

    const { signup, login, errMsg, resetAuthError } = React.useContext(VoteContext);

    const [inputs, setInputs] = React.useState(initInputs);

    //checks if you want to sign up or login
    const [toggle, setToggle] = React.useState(true);

    //handle form updates
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //changes signup from true or false
    const toggleForm = () => {
        setToggle(prev => !prev);
        resetAuthError();
    }

    const resetForm = () => {
        
    }

    const handleSignup = (e) => {
        e.preventDefault();
        signup(inputs).then(()=>{
            if(errMsg){
                return;
            }

            resetForm();
        })
    }

    const handleLogin = (e) => {
        e.preventDefault();
        login(inputs);
    }

    return (
        <div className="login-container">

            {
                toggle ?

                    <div className="login-form-container">
                        <h2>Sign Up for An Account</h2>
                        <form name="signup" className="login-form" onSubmit={handleSignup}>
                            <input name="email" type="email" onChange={handleChange} value={inputs.email} placeholder="Email" required />
                            <input name="password" type="password" onChange={handleChange} value={inputs.password} placeholder="Password" required />
                            <button>Register</button>
                        </form>
                        <div className="login-cta">
                            <p style={{ color: 'red', marginTop: '5px' }}>{errMsg}</p>
                            <button className="account-toggle" onClick={toggleForm}>Already A Member?</button>
                        </div>

                    </div>


                    :

                    <div className="login-form-container">
                        <h2>Login</h2>
                        <form name="login" className="login-form" onSubmit={handleLogin}>
                            <input name="email" type="email" onChange={handleChange} value={inputs.email} placeholder="Email" required />
                            <input name="password" type="password" onChange={handleChange} value={inputs.password} placeholder="Password" required />
                            <button className="login-btn">Login</button>
                        </form>

                        <div className="login-cta">
                            <p style={{ color: 'red',  marginTop: '5px' }}>{errMsg}</p>
                            <button id="account-toggle" onClick={toggleForm}>Dont Have an Account?</button>
                        </div>

                    </div>

            }

        </div>
    )
}

export default LogIn;