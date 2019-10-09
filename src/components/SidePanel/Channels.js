import React, { useState } from 'react';
import { Menu, Icon } from "semantic-ui-react";

const Channels = () => {

    const [channels, setChannels] = useState([]);

    return (
        <Menu.Menu style={{ paddingBottom: '2em' }}>
            <Menu.Item>
                <span>
                    <Icon name='exchange'/> CHANNELS
                </span>
                ({ channels.length }) <Icon name="add" />
            </Menu.Item>
            {/*Channels*/}
        </Menu.Menu>

    )
};
export default Channels;