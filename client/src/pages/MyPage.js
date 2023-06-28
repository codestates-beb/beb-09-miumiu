import React, { useEffect } from 'react';
import BackgroundImg from '../components/MyPage/backgroundimg';
import ProfileImg from '../components/MyPage/profileImg';
import Item from '../components/MyPage/item';
import UserInfo from '../components/MyPage/userInfo';
import { useState } from 'react';
import axios from 'axios';
import image1 from '../assets/images/dummy1.jpeg';

//css
import '../assets/css/MyPage.css';

const Mypage = () => {

    const [walletAddress, setWalletAddress] = useState('');
    const [userInfo, setUserInfo] = useState();
    const [items, setItems] = useState([]);

/*     const apiUrl = '';
    const getItemApiUrl = '';
    const getInfo = async () => {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts',
        });
        setWalletAddress(accounts[0]);
        const apiRes = await axios.put(apiUrl, { walletAddress: accounts[0] });
        setUserInfo(apiRes.data);
        const getItemsRes = await axios.put(getItemApiUrl, {
            walletAddress: accounts[0],
        });
        setItems(getItemsRes.data.content);
    };

    useEffect(() => {
        getInfo();
    }, []); */

    /* let username = '';
    let backgroundImgUrl = '';
    let profileImg = '';
    if (userInfo) {
  //      username = userInfo.content.username;
        backgroundImgUrl = userInfo.content.backgroundPicUrl;
        profileImg = userInfo.content.profilePicUrl;
    } */
  
    return (
      <div>
        <div>
        <div id="backgroundimg">
                <BackgroundImg />
            </div>
            <div id="profileimage">
                <ProfileImg src={"Image1"} profImg={ProfileImg} sx={{ maxWidth: '400px' }} />
                {/* <UserInfo username={UserName} walletaddress={WalletAddress}/> */}
            </div>
        </div>
      </div>
    );
  };

// const Mypage = () => {
    

//     return (
//         <div id="myPage">
//             <div id="backgroundimg">
//                 <BackgroundImg />
//             </div>
//             <div id="profileimage">
//                 <ProfileImg profImg={ProfileImg} sx={{ maxWidth: '400px' }} />
//                 {/* <UserInfo username={UserName} walletaddress={WalletAddress}/> */}
//             </div>
//             {/* <div id="items">
//                 {items === 'No items' ? (
//                     <div>No Items</div>
//                 ) : (
//                     items.map((e) => (
//                         <item
//                             className={`item${items.indexOf(e)}`}
//                             metadata={e.metaData}
//                             contractAddress={e.collectionAddress}
//                         />
//                     ))
//                 )}
//             </div> */}
//         </div>
//     );
// };

export default Mypage;