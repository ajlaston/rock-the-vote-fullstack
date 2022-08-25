import React from "react";
import LogIn from "../component/LogIn";
import "./Auth.css";

function Auth(){

    return (
        <div className="auth-container">
            <div className="auth-wrapper">
                <LogIn />
            </div>
            
        </div>
    )
}

export default Auth;