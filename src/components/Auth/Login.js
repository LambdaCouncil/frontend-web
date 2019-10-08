import React, {useState} from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import { Link } from "react-router-dom";
import firebase from "../../firebase";


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        // console.log('Email', email)
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        // console.log('password', password)
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid(email, password)) {
            setErrors([]);
            setLoading(true);
            firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .then(signedInUser => {
                    console.log(signedInUser);
                })
                .catch(err => {
                    console.log(err);
                    setErrors((errors => errors.concat(err)));
                    setLoading(false);
                })

        }
    };

    const isFormValid = () => email && password;

    const handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLocaleLowerCase().includes(inputName))
            ? "error" : ""
    };

    const displayErrors = (errors) => errors.map((error, i) => <p key={i}>{error.message}</p>);


    return (
        <Grid textAlign="center"
            verticalAlign="middle"
            className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h1" icon color="green"
                    textAlign="center">
                    <Icon name="code branch"
                        color="green" />
                    Login for LDSlack
                </Header>
                <Form onSubmit={handleSubmit} size="large">
                    <Segment stacked>
                        <Form.Input fluid name="email"
                            icon="mail"
                            iconPosition="left"
                            placeholder={"Email"}
                            onChange={handleChangeEmail}
                            value={email}
                            type="text" />
                        <Form.Input fluid name="password"
                            icon="lock"
                            iconPosition="left"
                            placeholder={"Password"}
                            onChange={handleChangePassword}
                            value={password}
                            type="password" />
                        <Button color="green" fluid size="large">Submit</Button>
                    </Segment>
                </Form>
                <Message>Need the undapants? <Link to="/register">Register</Link></Message>
            </Grid.Column>
        </Grid>
    )
}
export default Login;