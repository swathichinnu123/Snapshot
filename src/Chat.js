import { Avatar } from '@material-ui/core';
import React from 'react';
import './Chat.css';
import StopIcon from '@material-ui/icons/Stop';
import ReactTimeago from 'react-timeago';
import { useDispatch } from 'react-redux';
import { selectImage } from './features/appSlice';
import { useHistory } from 'react-router';
import { db } from './firebase';


function Chat({id , profilePic , username , timestamp, imageUrl, read}) {
    const dispatch = useDispatch();
    const history = useHistory();

    const open = () => {
        if(!read) {
            dispatch(selectImage(imageUrl));
            db.collection("posts").doc(id).set(
                {
                    read: true,
            },
            { merge: true }
            );
            history.push("/view");
        }
    };

    return (
        <div onClick={open} className="chat">
            <Avatar src={profilePic} className="chat_avatar"/>
            <div className="chat_info">
                <h4>{username}</h4> 
                <p>{!read && "Tap to view -"}{""} 
                <ReactTimeago date= {new Date(timestamp?.toDate()).toUTCString()}/></p>

            </div>
            
            {!read && <StopIcon className="chat_readIcon"/>}
        </div>
    )
}

export default Chat
