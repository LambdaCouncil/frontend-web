import React, { useState, useEffect } from 'react';
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from '../../firebase'
import Message from "./Message";

const Messages = ( {currentChannel, currentUser} ) => {

    const messagesRef = firebase.database().ref('messages');
    const [channel, setChannel] = useState(currentChannel);
    const [user, setUser] = useState(currentUser);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(true);
    const [barndon, setBarndon] = useState(false);

    useEffect(() => {
        if (channel && user) {
            addListeners(channel.id);
        }
    },[]);

    const addListeners = channelId => {
        addMessageListener(channelId)
    };

    const addMessageListener = channelId => {
        let loadedMessages = [];
        messagesRef.child(channelId).on('child_added', snap => {
            loadedMessages.push(snap.val());
            setMessages(loadedMessages);
            console.log('messages', messages);
            setMessagesLoading(false);
        })
    };

    const displayMessages = messages => {
        messages.length > 0 && messages.map(message => (
            <Message
            key={message.timeStamp}
            message={message}
            user={user}
            />
        ))
    };

    return (
        <React.Fragment>
            <MessagesHeader />

            <Segment>
                <Comment.Group className='messages'>
                    {displayMessages(messages)}
                </Comment.Group>
            </Segment>
            <MessageForm
                messagesRef={messagesRef} currentChannel={currentChannel} currentUser={currentUser}/>
        </React.Fragment>
    )
};

export default Messages;