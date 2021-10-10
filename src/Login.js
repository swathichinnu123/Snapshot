import React from 'react';
import "./Login.css";
import { Button } from "@material-ui/core";
import { useDispatch } from 'react-redux';
import { auth , provider } from './firebase';
import { login } from './features/appSlice';


function Login() {
    const dispatch = useDispatch();

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then(() => {
            dispatch(login({
                username: auth.currentUser.displayName,
                profilePic: auth.currentUser.photoURL,
                id: auth.currentUser.uid,
            })
            );
        })
        .catch((error) => alert(error.message))
    };




    return (
        <div className="login">
            <div className="Login_container">
                <img src="https://pbs.twimg.com/profile_images/1324384358418042880/A-ENfuMC_400x400.jpg" alt="" />
                <Button variant="outlined" onClick={signIn}>Sign In</Button>
            </div>
        </div>
    )
}

export default Login
