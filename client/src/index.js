import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import { RTVContextProvider } from './RTVContext';
import { PostContextProvider } from './PostContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>

  <Router>
    <RTVContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
    </RTVContextProvider>
  </Router>

  //</React.StrictMode>


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
