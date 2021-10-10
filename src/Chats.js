import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Chats.css';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import SearchIcon from '@material-ui/icons/Search';
import { auth, db } from './firebase';
import Chat from './Chat';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from './features/appSlice';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { useHistory } from 'react-router';

function Chats() {
    const [posts,setPosts] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const history = useHistory();
    

    const logoutToApp = () => {

        auth.signOut().then(function () {
            dispatch(logout());
        });
        
    }

    const takepic = () => {
        history.replace("/");
    }

    useEffect(() => {
        let unsubscription;
        unsubscription =  db.collection("posts")
        .orderBy('timestamp','desc')
        .onSnapshot((snapshot) =>
            setPosts(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            )
        );

        return () => {
            unsubscription && unsubscription();
        };

    },[]);

    return (
        <div className="chats">
            <div className="chats_header">
                <Avatar src={user.profilePic} onClick={logoutToApp} className="chats_avatar" />
                <div className="chats_search">
                    <SearchIcon />
                    <input type="text" placeholder="Freinds"/>
                </div>
                <ChatBubbleIcon className="chats_Icon"/>
            </div>
            <div className="chat_posts">
                 
                {posts.map(({id , data: { profilePic , username , timestamp, imagUrl, read}}) => (
                    <Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imagUrl}
                        read={read}
                        profilePic={profilePic} 
                    />
                )
                )}
            </div>

            <RadioButtonUnchecked 
            className="chats_takepic"
            onClick={takepic}
            fontSize="large" />
        </div>
    )
}

export default Chats
