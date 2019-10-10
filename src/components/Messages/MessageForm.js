import React, { useState, useEffect } from 'react';
import {Button, Input, Segment} from "semantic-ui-react";
import firebase from '../../firebase'

const MessageForm = ({ messagesRef, currentChannel, currentUser }) => {

    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [channel, setChannel] = useState(currentChannel);
    const [user, setUser] = useState(currentUser);
    const [errors, setErrors] = useState([]);


    const handleChange = (e) => {
      setMessage(e.target.value)
    };

    const createMessage = () => {
        return {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: user.uid,
                name: user.displayName,
                avatar: user.photoURL
            },
            content: message
        };
    };

    const sendMessage = () => {
        if (message) {
            setLoading(true);
            messagesRef
                .child(channel.id)
                .push()
                .set(createMessage())
                .then(() => {
                    setLoading(false);
                    setMessage('');
                    setErrors([]);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                    setErrors((errors => errors.concat(err)));
                })
        } else {
            setErrors((errors => errors.concat({ message: 'Add a message' })));
        }
    };



    return (
        <Segment className='message__form'>
            <Input fluid
                   name='message'
                   onChange={handleChange}
                   value={message}
                   style={{ marginBottom: '0.7em' }}
                   label={<Button icon={'add'}/>}
                   labelPosition='left'
                   // className={
                   //             errors.some(error => error.includes("message"))
                   //                 ? 'error'
                   //                 : ''
                   //         }
                   placeholder='Write your message'
            />
            <Button.Group icon widths='2'>
                <Button
                    onClick={sendMessage}
                    disabled={loading}
                    color='orange'
                    content='Add Reply'
                    labelPosition='left'
                    icon='edit'
                />
                <Button
                    color='teal'
                    content='Upload Media'
                    labelPosition='right'
                    icon='cloud upload'
                />
            </Button.Group>
        </Segment>
    );
};

export default MessageForm;