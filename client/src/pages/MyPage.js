import React, { useEffect } from 'react';
import Banner from '../components/MyPage/Banner';
import ProfileImg from '../components/MyPage/profileImg';
import Item from '../components/MyPage/Item';
import UserInfo from '../components/MyPage/UserInfo';
import { useState } from 'react';
import axios from 'axios';

//css
import styles from '../assets/css/MyPage.module.css';

const MyPage = () => {

    return (
        <div className={styles.myPageContainer}>
            <Banner/>
            <ProfileImg/>
            <UserInfo/>
            <Item />
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