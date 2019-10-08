import React, { useState } from 'react';
import firebase from "../../firebase";
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { Link } from "react-router-dom";

function Register() {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');;

    const handleChangeUser = (e) => {
       setUserName(e.target.value);
        console.log('userName', userName)
    };
    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        console.log('Email', email)
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        console.log('password', password)
    };
    const handleChangePasswordConfirm = (e) => {
        setPasswordConfirm(e.target.value);
        console.log('passwordConfirm', passwordConfirm)
    };

    const handleSubmit = (e) =>{
        e.preventDefault();
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(createdUser => {
                console.log('createdUser', createdUser)
            })
            .catch(err => {
                console.log(err)
            })
    };

    return (
        <Grid textAlign="center"
              verticalAlign="middle"
              className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="greem"
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
                                    type="text"/>
                        <Form.Input fluid name="password"
                                    icon="lock"
                                    iconPosition="left"
                                    placeholder={"Password"}
                                    onChange={handleChangePassword}
                                    value={password}
                                    type="password"/>
                        <Form.Input fluid name="passwordConfirm"
                                    icon="repeat"
                                    iconPosition="left"
                                    placeholder={"Confirm Password"}
                                    onChange={handleChangePasswordConfirm}
                                    value={passwordConfirm}
                                    type="password"/>
                        <Button color="green" fluid size="large">Submit</Button>
                    </Segment>
                </Form>
                <Message>Already wearing the undapants? <Link to="/login">Login</Link></Message>

            </Grid.Column>

        </Grid>
    )
}
export default Register;