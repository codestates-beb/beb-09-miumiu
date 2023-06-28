import React from 'react';
import './profileImg.css';
import image1 from "../../assets/images/dummy1.jpeg";

const profileImg = () => {
    return (
        <div>
            <img src={image1} alt="ProfileImage" className='profileimage'/>
        </div>
    )
};

export default profileImg;
