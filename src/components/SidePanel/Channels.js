import React, { useState } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from '../../firebase'


const Channels = ({ currentUser }) => {

    const [channels, setChannels] = useState([]);
    const [modal, setModal] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [channelDetails, setChannelDetails] = useState('');
    const [channelsRef, setChannelsRef] = useState(firebase.database().ref('channels'));
    const [user, setUser] = useState(currentUser)


    const closeModal = () => {
        setModal(false)
    };

    const openModal = () => {
        setModal(true)
    };

    const handleChannelName = (e) => {
        setChannelName(e.target.value);
    };

    const handleChannelDetails = (e) => {
        setChannelDetails(e.target.value);
    };
   

    const addChannel = () => {
        const key = channelsRef.push().key;
        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        };
        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                setChannelName('');
                setChannelDetails('');
                closeModal();
                console.log('channel added')
            })
            .catch(err => {
                console.error(err);
            })
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      if (isFormValid()) {
          addChannel();
      }
    };

    const isFormValid = () => channelName && channelDetails;

    return (
        <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
            <Menu.Item>
                <span>
                    <Icon name='exchange'/> CHANNELS
                </span>{" "}
                ({ channels.length }) <Icon name="add" onClick={openModal} style={{ cursor: 'pointer' }} />
            </Menu.Item>
        </Menu.Menu>

        <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>Add a Channel</Modal.Header>
            <Modal.Content>
                <Form onSubmit={handleSubmit}>
                    <Form.Field>
                        <Input
                        fluid
                        label='Name of Channel'
                        name='channelName'
                        onChange={handleChannelName}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Input
                            fluid
                            label='About the Channel'
                            name='channelDetails'
                            onChange={handleChannelDetails}
                        />
                    </Form.Field>
                </Form>
            </Modal.Content>

            <Modal.Actions>
                <Button color='green' inverted onClick={handleSubmit}>
                    <Icon name='checkmark' /> Add
                </Button>
                <Button color='red' inverted onClick={closeModal}>
                    <Icon name='remove' /> Cancel
                </Button>
            </Modal.Actions>

        </Modal>

        </React.Fragment>
    )
};
export default Channels;