import React, {useState} from 'react';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react'
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
        console.log('Email', email)
    };
    const handleChangePassword = (e) => {
        setPassword(e.target.value);
        console.log('password', password)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <Grid textAlign="center"
            verticalAlign="middle"
            className="app">
            <Grid.Column style={{ maxWidth: 450 }}>
                <Header as="h2" icon color="red"
                    textAlign="center">
                    <Icon name="code branch"
                        color="red" />
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
                        <Button color="red" fluid size="large">Submit</Button>
                    </Segment>
                </Form>
                <Message>Don't have the undapants? <Link to="/register">Register</Link></Message>

            </Grid.Column>

        </Grid>
    )
}
export default Login;