import React from 'react';
import './userInfo.css';
import accounts from '../Header';

const UserInfo = (accounts) => {
    return (
        <div>
            {/* <div>
            <p>Unnamed</p>
            <p id="walletAddress">{props.walletAddress ? `${props.walletAddress.slice(0,6)}...${props.walletAddress.slice(-4)}` : ""}</p>
        </div> */}
            <p>Collected</p>
        </div>
    )
};
//컬렉티드 문자 넣어야 한다 

export default UserInfo;
