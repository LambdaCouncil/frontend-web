import React, {useState, useEffect} from 'react';
import firebase from '../../firebase';
import {Grid, Header, Icon, Dropdown, Image, Modal, Input, Button} from "semantic-ui-react";
import {connect} from 'react-redux'
import AvatarEditor from "react-avatar-editor";


const UserPanel = (props) => {

  const [user, setUser] = useState(props.currentUser);
  const [modal, setModal] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [croppedImage, setCroppedImage] = useState('');
  const [blob, setBlob] = useState('');
  const [metaData, setMetaData] = useState({
    contentType: 'image/jpeg'
  });
  const [uploadedCroppedImage, setUploadedCroppedImage] = useState('');
  let avatarEditor = AvatarEditor;
  const storageRef = firebase.storage().ref();
  const userRef = firebase.auth().currentUser;
  const usersRef = firebase.database().ref('users');

  useEffect(() => {
    setUser(props.currentUser)
  }, []);

  const openModal = () => {
    setModal(true)
  };
  const closeModal = () => {
    setModal(false)
  };

  const dropdownOptions = () => [
    {
      key: 'user',
      text: <span>Signed in as <strong>{user.displayName}</strong></span>,
      disabled: true
    },
    {
      key: 'avatar',
      text: <span onClick={openModal}>Change Avatar</span>
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

  const handleChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener('load', () => {
        setPreviewImage(reader.result)
      });
    }
  };

  const handleCrop = () => {
    if (avatarEditor) {
      avatarEditor.getImageScaledToCanvas().toBlob(blob => {
        let imageUrl = URL.createObjectURL(blob);
        console.log('imageUrl', imageUrl);
        setCroppedImage(imageUrl);
        setBlob(blob);
      })
    }
  };

  const uploadCroppedImage = () => {
    storageRef
      .child(`avatars/user-${userRef.uid}`)
      .put(blob, metaData)
      .then(snap => {
        snap.ref.getDownloadURL().then(downloadUrl => {
          setUploadedCroppedImage(downloadUrl => {
            changeAvatar();
            console.log(downloadUrl)
          })
        })
      })
  };

  const changeAvatar = () => {
    userRef
      .updateProfile({
        photoURL: uploadedCroppedImage
      })
      .then(() => {
        console.log('PhotoURL updated');
        closeModal();
      })
      .catch(err => {
        console.error(err)
      });
    usersRef
      .child(user.uid)
      .update({ avatar: uploadedCroppedImage })
      .then(() => {
        console.log('User avatar updated')
      })
      .catch(err => {
        console.error(err);
      })
  };

  return (
    <Grid style={{background: '4c3c4c'}}>
      <Grid.Column>
        <Grid.Row style={{padding: '1.2em', margin: 0}}>
          {/*App Header*/}
          <Header inverted floated="left" as="h2">
            <Icon name="code"/>
            <Header.Content>LDSlack</Header.Content>
          </Header>
          {/*User Dropdown*/}
          <Header style={{padding: '0.25em'}} as='h4' inverted>
            <Dropdown trigger={
              <span>
                              <Image src={user.photoURL} spaced='right' avatar/>
                {user.displayName}
                          </span>
            } options={dropdownOptions()}/>
          </Header>
        </Grid.Row>
        {/*Change Profile Picture*/}
        <Modal basic open={modal} onClose={closeModal}>
          <Modal.Header>Change Profile Picture</Modal.Header>
          <Modal.Content>
            <Input fluid
                   onChange={handleChange}
                   type='file'
                   label='New Profile Picture' name='previewImage'
            />
            <Grid centered stackable columns={2}>
              <Grid.Row centered>
                <Grid.Column className='ui centered aligned grid'>
                  {previewImage && (
                    <AvatarEditor
                      ref={node => (avatarEditor = node)}
                      image={previewImage}
                      width={120}
                      height={120}
                      border={50}
                      scale={1.2}
                    />
                  )}
                </Grid.Column>
                <Grid.Column>
                  {croppedImage && (
                    <Image
                      style={{margin: '3.5em auto'}}
                      width={100}
                      height={100}
                      src={croppedImage}
                    />
                  )}
                  {/*Cropped Image Preview*/}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Modal.Content>
          <Modal.Actions>
            {croppedImage && <Button color='green' inverted
                                     onClick={uploadCroppedImage}>
              <Icon name='save'/> Save
            </Button>}
            <Button color='green' inverted onClick={handleCrop}>
              <Icon name='image'/> Preview
            </Button>
            <Button color='red' inverted onClick={closeModal}>
              <Icon name='remove'/> Cancel
            </Button>
          </Modal.Actions>
        </Modal>
      </Grid.Column>
    </Grid>
  )
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(UserPanel);