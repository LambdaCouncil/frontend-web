import React, { useState } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
const Channels = () => {

    const [channels, setChannels] = useState([]);
    const [modal, setModal] = useState(false);
    const [channelName, setChannelName] = useState('');
    const [channelDetails, setChannelDetails] = useState('');


    const closeModal = () => {
        setModal(false)
    };

    const handleChannelName = (e) => {
        setChannelName(e.target.value);
    };

    const handleChannelDetails = (e) => {
        setChannelDetails(e.target.value);
    };

    return (
        <React.Fragment>
        <Menu.Menu style={{ paddingBottom: '2em' }}>
            <Menu.Item>
                <span>
                    <Icon name='exchange'/> CHANNELS
                </span>{" "}
                ({ channels.length }) <Icon name="add" />
            </Menu.Item>
        </Menu.Menu>

        <Modal basic open={modal} onClose={closeModal}>
            <Modal.Header>Add a Channel</Modal.Header>
            <Modal.Content>
                <Form>
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
                <Button color='green' inverted>
                    <Icon name='checkmark' /> Add
                </Button>
                <Button color='red' inverted>
                    <Icon name='remove' /> Cancel
                </Button>
            </Modal.Actions>

        </Modal>

        </React.Fragment>
    )
};
export default Channels;