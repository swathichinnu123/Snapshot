import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import Preview from './Preview';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';
import Footer from './Footer';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();



  useEffect(()=> {
    auth.onAuthStateChanged(function(user)  {
      if(user) {
        dispatch(login({
          username: auth.currentUser.displayName,
                profilePic: auth.currentUser.photoURL,
                id: auth.currentUser.uid,
        })
        );
      }
      else {
        dispatch(logout());
      }
    }
    )
  },[]);


  return (
    <div className="app">
      <Router>
        {!user ? ( <Login />) : 
        (     
          <>
          <img src="https://pbs.twimg.com/profile_images/1324384358418042880/A-ENfuMC_400x400.jpg" className="app_logo"   alt="" />
        <div className="app_body">
          <div className="app_background">
          <Switch>
          <Route path="/preview">
            <Preview />
          </Route>
          <Route path="/view">
            <ChatView />
          </Route>
          <Route path="/chats">
            <Chats />
          </Route>
          <Route exact path="/">
             <WebcamCapture />
          </Route>
        </Switch>
          </div>
     
      </div>
      </>
      )}
      <Footer />
   
    </Router>
    </div>
  );
}

export default App;
