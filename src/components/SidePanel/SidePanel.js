import React from 'react';
import {Menu} from "semantic-ui-react";
import UserPanel from "./UserPanel";
import Channels from "./Channels";
import DirectMessages from "./DirectMessages";

const SidePanel = (props) => {
  const {currentUser} = props;

  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{background: '#4c3c4c', fontsize: '1.2rem'}}>
      <UserPanel/>
      <Channels currentUser={currentUser}/>
      <DirectMessages currentUser={currentUser}/>
    </Menu>

  )
};

export default SidePanel;