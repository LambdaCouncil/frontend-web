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
    // The Barndon Constant
    // 2019 Colorized
    const [barndon, setBarndon] = useState(false);

    useEffect(() => {
        if (!barndon && (channel && user)) {
            addMessageListener(channel.id);
        }
    },[messages.length]);



    const addMessageListener = channelId => {
        let loadedMessages = [];
            messagesRef.child(channelId).on('child_added', async snap => {
            await loadedMessages.push(snap.val());
            // messages.length > 0 &&
            setMessages(loadedMessages);
            // console.log('loadedMessages', loadedMessages);
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
                    {/*{displayMessages(messages)}*/}
                    { messages.map(message => (
                        <Message message={message}
                                 user={message.user}
                                 key={message.timeStamp} />
                        ))}

                </Comment.Group>
            </Segment>
            <MessageForm
                messagesRef={messagesRef} currentChannel={currentChannel} currentUser={currentUser}/>
        </React.Fragment>
    )
};

export default Messages;