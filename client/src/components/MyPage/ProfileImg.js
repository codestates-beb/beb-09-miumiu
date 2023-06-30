import React from 'react';
import '../../assets/css/ProfileImg.css';
import profile from "../../assets/images/artist_profile_dummy_1@3x.png";

const profileImg = () => {
    return (
        <div>
            <img src={profile} alt="ProfileImage" className='profileimage'/>
        </div>
    )
};

export default profileImg;
