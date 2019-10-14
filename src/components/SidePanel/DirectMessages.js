import React, { useState, useEffect } from 'react';
import { Menu, Icon } from "semantic-ui-react";
import firebase from '../../firebase'

const DirectMessages = ({currentUser}) => {

  const [users, setUsers] = useState([]);
  const user = currentUser;
  const usersRef = firebase.database().ref('users');
  const connectedRef = firebase.database().ref('.info/connected');
  const presenceRef = firebase.database().ref('presence');
  console.log('user', user);

  useEffect(() => {
    if (user) {
      addListeners(user.uid)
    }
  }, []);


  const addListeners = currentUserUid => {
    let loadedUsers = [];
    usersRef.on('child_added', snap => {
      if (currentUserUid !== snap.key) {
        let user = snap.val();
        user['uid'] = snap.key;
        user['status'] = 'offline';
        loadedUsers.push(user);
        setUsers(loadedUsers);
      }
    });
    connectedRef.on('value', snap => {
      if (snap.val() === true) {
        const ref = presenceRef.child(currentUserUid);
        ref.set(true);
        ref.onDisconnect().remove(err => {
          if (err !== null) {
            console.log(err);
          }
        })
      }
    });
    presenceRef.on('child_added', snap => {
      if (currentUserUid !== snap.key) {
        addStatusToUser(snap.key)
      }
    });
    presenceRef.on('child_removed', snap => {
      if (currentUserUid !== snap.key) {
        addStatusToUser(snap.key, false)
      }
    })
  };

  const addStatusToUser = (userId, connected = true) => {
    const updatedUsers = users.reduce((acc, user) => {
      if (user.uid === userId) {
        user['status'] = `${connected ? 'online' : 'offline'}`;
        return acc.concat(user);
      }
    }, []);
    setUsers(updatedUsers)
  };


  const isUserOnline = user => user.status === 'online';

  return (
    <Menu.Menu className='menu'>
      <Menu.Item>
        <span>
          <Icon name='mail'/> DIRECT MESSAGES
        </span>{' '}
        ({ users.length })
      </Menu.Item>

      {users.map(user => (
        <Menu.Item
        key={user.uid}
        onClick={() => console.log(user)}
        style={{ opacity: .07, fontStyle: 'italic' }}>
          <Icon
          name='circle'
          color={isUserOnline(user) ? 'green' : 'red'}
          />
          @ {user.name}
        </Menu.Item>
      ))}
    </Menu.Menu>
  );
};

export default DirectMessages;