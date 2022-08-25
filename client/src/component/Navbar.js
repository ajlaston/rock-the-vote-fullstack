import React from "react";
import { Link } from 'react-router-dom';
import { VoteContext } from "../RTVContext";
import { useNavigate } from "react-router-dom";
import './Navbar.css';

function Navbar(props) {

    const { logout } = props;

    const handleLogout = () => {
        logout();
    }

    React.useEffect(() => {
        console.log('hello');
    }, [])

    return (
        <div className="navbar">
            <div className="navbar-wrapper">
                <div className="link-container">
                    <h1>Rock The Vote</h1>
                    <Link to='/home'>Home</Link>
                    <Link to='/createpost'>Create Post</Link>
                    <Link to='/myposts'>My Posts</Link>
                </div>

                <div className="logout-container">
                    <button onClick={handleLogout}>logout</button>
                </div>

            </div>
        </div>
    )
}

export default Navbar;