import React from 'react';
import '/profileImg.css';

const profileImg = (props) => {
    return <img src={props.profImg} id="profileimg" alt="profile"></img>;
};

export default profileImg;
