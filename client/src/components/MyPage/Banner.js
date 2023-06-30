import React from 'react';
import '../../assets/css/Banner.css';
import banner from '../../assets/images/qna_banner_img@3x.png'

const Banner = () => {
  const handleBackgroundUpload = (event) => {
    // Handle background image upload logic here
  };

  return (
    <div className="background-container">
      {/* <label htmlFor="background-upload" className="background-upload-label">
        <input
          type="file"
          className="background-upload-input"
          onChange={handleBackgroundUpload}
          style={{ display: 'none'}}
        />
      </label> */}
      <img src={banner} alt='banner' className='banner' />
      {/* Other content */}
    </div>
  );
};

export default Banner;