import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Navbar from './component/Navbar';
import Auth from './route/Auth';
import ProtectedRoute from './component/ProtectedRoute';
import { VoteContext } from './RTVContext';
import Home from './route/Home';
import CreatePost from './route/CreatePost';
import MyPosts from './route/MyPosts';

function App() {

  const { token, logout, user } = React.useContext(VoteContext);

  React.useEffect(() => {
    console.log('onload');
  }, [])

  return (
    <div className="App">
      {token && <Navbar logout={logout} />}
      <Routes>
        <Route path='/' element={token ? <Navigate to="/home" /> : <Auth />} />

        <Route
          path='/home'
          element={
            <ProtectedRoute token={token} redirectTo='/'>
              <Home user={user} />
            </ProtectedRoute>
          }
        />

        <Route
          path='/createpost'
          element={
            <ProtectedRoute token={token} redirectTo='/' >
              <CreatePost token={token} />
            </ProtectedRoute>
          }
        />

        <Route
          path='/myposts'
          element={
            <ProtectedRoute token={token} redirectTo='/' >
              <MyPosts token={token} />
            </ProtectedRoute>
          }
        />


      </Routes>
    </div>
  );
}

export default App;

//make navbar comp
//make footer comp
//add login route that conditionally renders 2 comp