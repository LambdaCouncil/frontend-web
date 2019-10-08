import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css';
import App from "./components/App";
import registerServiceWorker from './registerServiceWorker';
import firebase from './firebase';



import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";

function Root(props) {
    useEffect(() => 
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                props.history.push("/");
            }
        })
    );
        return (
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
        );
} 

const RouteWithAuth = withRouter(Root);

ReactDOM.render(
<Router>
    <RouteWithAuth />
</Router>, 
document.getElementById('root'));
registerServiceWorker();
