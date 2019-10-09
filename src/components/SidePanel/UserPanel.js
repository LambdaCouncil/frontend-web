import React, { useState, useEffect } from 'react';
import firebase from '../../firebase';
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { connect } from 'react-redux'

const UserPanel = (props) => {

    const [user, setUser] = useState(props.currentUser);

    useEffect(() => {
        setUser(props.currentUser)
    }, []);

    const dropdownOptions = () => [
        {
            key: 'user',
            text: <span>Signed in as <strong>{user.displayName}</strong></span>,
            disabled: true
        },
        {
            key: 'avatar',
            text: <span>Change Avatar</span>
        },
        {
            key: 'signout',
            text: <span onClick={handleSignout}>Sign Out</span>
        }
    ];

    const handleSignout = () => {
      firebase
          .auth()
          .signOut()
          .then(() => console.log('Signed Out'))
    };

    console.log(props.currentUser.displayName);
    console.log(user.photoURL);



    return(
        <Grid style={{ background: '4c3c4c'}}>
              <Grid.Column>
                  <Grid.Row style={{ padding: '1.2em', margin: 0}}>
                      {/*App Header*/}
                      <Header inverted floated="left" as="h2">
                          <Icon name="code" />
                          <Header.Content>LDSlack</Header.Content>
                      </Header>
                      {/*User Dropdown*/}
                      <Header style={{ padding: '0.25em' }} as='h4' inverted>
                          <Dropdown trigger={
                              <span>
                              <Image src={user.photoURL} spaced='right' avatar />
                                  {user.displayName}
                          </span>
                          } options={dropdownOptions()} />
                      </Header>
                  </Grid.Row>
              </Grid.Column>
        </Grid>
    )
};

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(UserPanel);