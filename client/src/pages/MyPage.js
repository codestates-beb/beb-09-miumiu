import React, { useEffect } from 'react';
import Banner from '../components/MyPage/Banner';
import ProfileImg from '../components/MyPage/ProfileImg';
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



export default MyPage;