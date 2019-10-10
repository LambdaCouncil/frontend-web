import React from 'react';
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";
import firebase from '../../firebase'

const Messages = ( {currentChannel, currentUser} ) => {

    const messagesRef = firebase.database().ref('messages');

    return (
        <React.Fragment>
            <MessagesHeader />

            <Segment>
                <Comment.Group className='messages'>
                    {/*Messages*/}
                </Comment.Group>
            </Segment>
            <MessageForm
                messagesRef={messagesRef} currentChannel={currentChannel} currentUser={currentUser}/>
        </React.Fragment>
    )
};

export default Messages;