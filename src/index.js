import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css';
import App from "./components/App";
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter as Router, Switch, Route, withRouter} from "react-router-dom";
import Register from "./components/Auth/Register";
import Spinner from "./Spinner";
import Login from "./components/Auth/Login";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";
import rootReducer from "./reducers";
import { setUser } from "./actions";
import firebase from "./firebase";
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(rootReducer, composeWithDevTools());

function Root(props) {

    useEffect(() => {
        console.log(props.isLoading);
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                props.setUser(user);
                props.history.push('/');
            }
        })
    }, []);

    return props.isLoading ? <Spinner /> : (
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
        </Switch>
    )}

    const mapStateToProps = (state) => ({
        isLoading: state.user.isLoading
    });

    const RootWithAuth = withRouter(
        connect(
        mapStateToProps,
        { setUser }
        )(Root));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <RootWithAuth />
        </Router>
    </Provider>
    , document.getElementById('root'));

registerServiceWorker();
