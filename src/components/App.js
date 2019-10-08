import React from 'react';
import './App.css'
import {Link} from "react-router-dom";


function App() {
    return (
        <div>
            <p>Mormon Slack 2.1</p>
            <Link to="/register">Need the undapants?</Link>
            <br/>
            <Link to="/login">Have the undapants?</Link>
        </div>
    );
}

export default App;