import React from 'react';
import {Header, Segment, Input, Icon} from "semantic-ui-react";


const MessagesHeader = ({ channelName, numOfUsers, handleSearchChange }) => {
  return (
    <Segment clearing>
      {/*Channel Title*/}
      <Header fluid='true' as='h2' floated='left' style={{marginBottom: 0}}>
        <span>
          {channelName}
          <Icon name={'star outline'} color='black'/>
        </span>
        <Header.Subheader>{numOfUsers}</Header.Subheader>
      </Header>
      {/*Channel Search Input*/}
      <Header floated='right'>
        <Input
          onChange={handleSearchChange}
          size='mini'
          icon='search'
          name='searchTerm'
          placeholder='Search Messages'/>
      </Header>
    </Segment>
  )
};

export default MessagesHeader;