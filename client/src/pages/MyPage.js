import React, { useEffect } from 'react';
import BackgroundImg from '../components/MyPage/backgroundimg';
import ProfileImg from '../components/MyPage/profileImg';
import Item from '../components/MyPage/item';
import UserInfo from '../components/MyPage/userInfo';
import { useState } from 'react';
import axios from 'axios';

//css
import styles from '../assets/css/MyPage.module.css';

const MyPage = () => {

    return (
        <div className={styles.myPageContainer}>
            <BackgroundImg/>
            <ProfileImg/>
            <UserInfo/>
        </div>
    );
  };


//     return (
//         <div id="myPage">
//             <div id="backgroundimg">
//                 <BackgroundImg />
//             </div>
//             <div id="profileimage">
//                 <ProfileImg profImg={ProfileImg} sx={{ maxWidth: '400px' }} />
//                 {/* <UserInfo username={UserName} walletaddress={WalletAddress}/> /}
//             </div>
//             {/ <div id="items">
//                 {items === 'No items' ? (
//                     <div>No Items</div>
//                 ) : (
//                     items.map((e) => (
//                         <item
//                             className={item${items.indexOf(e)}}
//                             metadata={e.metaData}
//                             contractAddress={e.collectionAddress}
//                         />
//                     ))
//                 )}
//             </div> */}
//         </div>
//     );
// };

export default MyPage;