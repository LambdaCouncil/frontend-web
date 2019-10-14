import React, { useState, useEffect } from 'react';
import { Menu, Icon } from "semantic-ui-react";
import firebase from '../../firebase'

const DirectMessages = ({currentUser}) => {

  const [users, setUsers] = useState([]);
  const user = currentUser;
  console.log('user', user);

  // useEffect(() => {
  //   addListeners(user.uid)
  // }, []);

  // const addListeners = currentUserUid => {
  //
  // };

  return (
    <Menu.Menu className='menu'>
      <Menu.Item>
        <span>
          <Icon name='mail'/> DIRECT MESSAGES
        </span>{' '}
        ({ users.length })
      </Menu.Item>
    </Menu.Menu>
  );
};

export default DirectMessages;