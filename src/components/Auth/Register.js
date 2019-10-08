import React, { useState } from 'react';
import firebase from "../../firebase";
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link } from "react-router-dom";
import md5 from 'md5';

function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userRef, setUserRef] = useState(firebase.database().ref('users'));


    const handleChangeUser = (e) => {
       setUserName(e.target.value);
        // console.log('userName', userName)
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        // console.log('Email', email)
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        // console.log('password', password)
    };
    const handleChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
        // console.log('passwordConfirm', passwordConfirm)
    };

    const isFormValid = () => {
        let error;
        if(isFormEmpty(userName, email, password, passwordConfirm)){
            error = {message: "Moroni needs all fields"};
            setErrors((errors => errors.concat(error)));
            return false;
        } else if (!isPasswordValid(password, passwordConfirm)){
            error = {message: 'Password not Joseph Smith. Why?'};
            setErrors((errors => errors.concat(error)));
            return false;
        } else {
            return true;
        }
    };

    const isFormEmpty = (userName, email, password, passwordConfirm) => {
        return !userName.length || !email.length || !password.length || !passwordConfirm.length;
    };

    const isPasswordValid = (password, passwordConfirm) => {
        if(password.length < 6 || passwordConfirm.length < 6) {
            return false;
        } else if (password !== passwordConfirm){
            return false;
        } else {
            return true;
        }
    };

    const displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error.message}</p>);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            setErrors([]);
            setLoading(true);
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(createdUser => {
                console.log('createdUser', createdUser);
                createdUser.user.updateProfile({
                    displayName: userName,
                    photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
                })
                    .then(() => {
                       saveUser(createdUser).then(() => {
                           console.log("user saved");
                           setLoading(false);
                           setUserName("");
                           setEmail("");
                           setPassword("");
                           setPasswordConfirm("");
                       })
                    })
                    .catch(err => {
                        console.log(err);
                        setErrors(errors.concat(err));
                        setLoading(false);
                    })
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setErrors((errors => errors.concat(err)));
            })
    }
    };

    const saveUser = (createdUser) => {
        return userRef.child(createdUser.user.uid).set({
            name: createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
    };

    const handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLocaleLowerCase().includes(inputName))
            ? "error" : ""
    };


    return (
        <Grid textAlign="center"
              verticalAlign="middle"
              className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="green"
                        textAlign="center">
                    <Icon name="puzzle piece"
                          color="green"/>
                    Register for LDSlack
                </Header>
                <Form onSubmit={handleSubmit} size="large">
                    <Segment stacked>
                        <Form.Input fluid name="username"
                                    icon="user"
                                    iconPosition="left"
                                    placeholder={"Username"}
                                    onChange={handleChangeUser}
                                    value={userName}
                                    type="text"/>
                        <Form.Input fluid name="email"
                                    icon="mail"
                                    iconPosition="left"
                                    placeholder={"Email"}
                                    onChange={handleChangeEmail}
                                    value={email}
                                    className={handleInputError(errors, 'email')}
                                    type="text"/>
                        <Form.Input fluid name="password"
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder={"Password"}
                                    onChange={handleChangePassword}
                                    value={password}
                                    className={handleInputError(errors, 'password')}
                                    type="password"/>
                        <Form.Input fluid name="passwordConfirm"
                                    icon="repeat"
                                    iconPosition="left"
                                    placeholder={"Confirm Password"}
                                    onChange={handleChangePasswordConfirm}
                                    value={passwordConfirm}
                                    className={handleInputError(errors, 'password')}
                                    type="password"/>
                        <Button disabled={loading} className = {loading ? 'loading' : ''}
                            color="green" fluid size="large">Submit</Button>
                    </Segment>
                </Form>
                {errors.length > 0 && (
                    <Message error>
                        <h3>This is where the errors go</h3>
                        {displayErrors(errors)}
                    </Message>
                )}
                <Message>Already have the undapants? <Link to="/login">Login</Link></Message>
            </Grid.Column>
        </Grid>
    )
}
export default Register;