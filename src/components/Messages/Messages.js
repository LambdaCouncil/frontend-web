import React from 'react';
import { Segment, Comment } from "semantic-ui-react";
import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";

const Messages = () => {
    return (
        <React.Fragment>
            <MessagesHeader />

            <Segment>
                <Comment.Group className='messages'>
                    {/*Messages*/}
                </Comment.Group>
            </Segment>
            <MessageForm />
        </React.Fragment>
    )
};

export default Messages;