import React, { useContext } from 'react';
import styles from '../../assets/css/UserInfo.module.css';
import { Context } from '../../Context/index';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const UserInfo = () => {
    const { state: { user }, dispatch } = useContext(Context);

    return (
        <div className={styles.walletAddress}>
            <AccountBalanceWalletIcon className={styles.walletIcon}/>
            <p className={styles.address}>
                {`${user.account.slice(0,6)}...${user.account.slice(-5)}`}
            </p>
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