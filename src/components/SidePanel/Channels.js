import React, { useState, useEffect } from 'react';
import { Menu, Icon, Modal, Form, Input, Button } from "semantic-ui-react";
import firebase from '../../firebase'
import { connect } from 'react-redux'
import { setCurrentChannel } from "../../actions";


const Channels = ({ currentUser, setCurrentChannel }) => {

  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState(null);
  const [modal, setModal] = useState(false);
  const [channelName, setChannelName] = useState('');
  const [channelDetails, setChannelDetails] = useState('');
  const channelsRef = firebase.database().ref('channels');
  const messagesRef = firebase.database().ref('messages');
  const user = currentUser;
  const [barndon, setBarndon] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const [activeChannel, setActiveChannel] = useState('');
  const [notifications, setNotifications] = useState([]);
  // const notifications = [];

  const addListeners = () => {
    let loadedChannels = [];
    channelsRef.on('child_added', snap => {
      loadedChannels.push(snap.val());
      loadedChannels.length > 0 &&
      // console.log('loadedChannels', loadedChannels);
      setChannels(loadedChannels);
      setFirstChannel();
      setBarndon(true);
      addNotificationListener(snap.key);
    })
  };

  const addNotificationListener = channelId => {
    messagesRef.child(channelId).on('value', snap => {
      if (channel) {
        handleNotifications(channelId, channel.id, notifications, snap)
      }
    })
  };

  const handleNotifications = (channelId, currentChannelId, notifications, snap) => {
    let lastTotal = 0;
    let index = notifications.findIndex(notification => notification.id === channelId);
    if (index !== -1) {
      if (channelId !== currentChannelId){
        lastTotal = notifications[index].total;
        if (snap.numChildren() - lastTotal > 0) {
          notifications[index].count = snap.numChildren() - lastTotal;
        }
      }
      notifications[index].lastKnownTotal = snap.numChildren();
    } else {
      notifications.push({
        id: channelId,
        total: snap.numChildren(),
        lastKnownTotal: snap.numChildren(),
        count: 0
      })
    }
    setNotifications();
  };
  console.log('notifications', notifications);

  const removeListeners = () => {
    channelsRef.off();
  };

  useEffect(() => {
    !barndon && addListeners();
  }, [channels]);

  useEffect(() => {
    return () => {
      removeListeners();
    }
  }, []);

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
    return channels.length > 0
      && channels.map(channel => {
        // console.log('map run');
        return (
          <Menu.Item
            key={channel.id}
            onClick={() => changeChannel(channel)}
            // onClick={() => console.log(channel)}
            name={channel.name}
            style={{ opacity: 1 }}
            active={ channel.id === activeChannel }
          >
            # {channel.name}
          </Menu.Item>
        )})
  };

  const setFirstChannel = async () => {
    const firstChannel = channels[0];
    if (firstLoad && channels.length) {
      await setCurrentChannel(firstChannel);
      await setActiveChannel(firstChannel.id);
      console.log('firstChannel', firstChannel)
    }
    setFirstLoad(false)
  };

  const changeChannel = channel => {
    setActiveChannel(channel.id);
    setCurrentChannel(channel);
    setChannel(channel);
  };


  return (
    <React.Fragment>
      <Menu.Menu className='menu' >
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

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps, { setCurrentChannel })(Channels);