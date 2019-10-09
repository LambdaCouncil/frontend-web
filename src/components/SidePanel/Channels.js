import React, { useState, useEffect } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from '../../firebase'


const Channels = ({ currentUser }) => {

    const [channels, setChannels] = useState([]);
    const [modal, setModal] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [channelDetails, setChannelDetails] = useState('');
    const [channelsRef, setChannelsRef] = useState(firebase.database().ref('channels'));
    const [user, setUser] = useState(currentUser);

    useEffect(() => {
        addListeners();
    }, []);

    const addListeners = () => {
        let loadedChannels = [];
        channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val());
            setChannels(loadedChannels);
        })
    };
    
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

    const displayChannels = channels => {
        channels.length > 1
        && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => console.log(channel)}
                name={channel.name}
                style={{ opacity: 0.7 }}
            >
                # {channel.name}
            </Menu.Item>
        ))
    };
    console.log('channels', channels);

    return (
        <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
            <Menu.Item>
                <span>
                    <Icon name='exchange'/> CHANNELS
                </span>
                {" "} ({ channels.length })
                <Icon name="add" onClick={openModal} style={{ cursor: 'pointer' }} />
            </Menu.Item>
            {displayChannels(channels)}
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