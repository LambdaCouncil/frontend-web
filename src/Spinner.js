import React from 'react';
import { Loader, Dimmer } from "semantic-ui-react";

const Spinner = () => {
    return (
    <Dimmer active>
        <Loader size="huge" content="Preparing the Pearl of Great Price"/>
    </Dimmer>
    )};

export default Spinner;