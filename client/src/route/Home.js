import React from "react";
import PostContainer from "../component/PostContainer";
import './Home.css';

function Home(props) {

    const { user } = props;


    return (
        <div className="home-container">

            <div className="welcome-message">
                <div className="welcome-wrapper">
                    <h2> Welcome {user.email}</h2>
                    <p>Click "create post" to add a political issue.</p>
                    <p>Click "my post" to see all posts you created and edit them.</p>
                </div>

            </div>


            <div className="post-container">
                <PostContainer type="allposts" />
            </div>

        </div>
    )
}

export default Home;