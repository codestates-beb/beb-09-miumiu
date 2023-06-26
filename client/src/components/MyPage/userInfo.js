import React from 'react';
import './userInfo.css';

const UserInfo = (props) => {
    return (
        <div>
            <p id="username">{props.username}</p>
            <p id="walletAddress">{props.walletAddress ? `${props.walletAddress.slice(0,6)}...${props.walletAddress.slice(-4)}` : ""}</p>
        </div>
    );
};

export default UserInfo;
