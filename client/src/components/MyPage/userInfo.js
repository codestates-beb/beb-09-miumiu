import React, { useContext } from 'react';
import './userInfo.css';
import { Context } from '../../Context/index';

const UserInfo = () => {
    const { state: { user }, dispatch } = useContext(Context);

    return (
        <div className='walletAddress'>
            <p>{user.account}</p>
            <div>
                <p>Collected</p>
            </div>
        </div>
    )
};

// const UserInfo = (props) => {
//     return (
//         <div>
//             <p id="username">{props.username}</p>
//             <p id="walletAddress">{props.walletAddress ? ${props.walletAddress.slice(0,6)}...${props.walletAddress.slice(-4)} : ""}</p>
//         </div>
//     )
// };

export default UserInfo;