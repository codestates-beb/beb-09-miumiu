import React from 'react';
import './backgroundimg.css';

const BackgroundImg = () => {
  const handleBackgroundUpload = (event) => {
    // Handle background image upload logic here
  };

  return (
    <div className="background-container">
      <label htmlFor="background-upload" className="background-upload-label">
        Upload Background Image
        <input
          type="file"
          id="background-upload"
          className="background-upload-input"
          onChange={handleBackgroundUpload}
        />
      </label>
      {/* Other content */}
    </div>
  );
};

export default BackgroundImg;