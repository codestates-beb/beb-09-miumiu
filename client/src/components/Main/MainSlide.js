import React from 'react';
import '../../assets/css/MainSlide.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../assets/images/dummy1.jpeg";
import image2 from "../../assets/images/dummy2.png";
import image3 from "../../assets/images/dummy3.jpeg";


const MainSlide = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000
  };

  return (
    <>
      <Slider className='mainSlide' {...settings}>
        <div className='imgWrap'>
          <img src={image1} alt="Image 1"/>
        </div>
        <div className='imgWrap'>
          <img src={image1} alt="Image 1"/>
        </div>
        <div className='imgWrap'>
          <img src={image1} alt="Image 1"/>
        </div>
        <div className='imgWrap'>
          <img src={image2} alt="Image 2" />
        </div>
        <div className='imgWrap'>
          <img src={image3} alt="Image 3" />
        </div>
        <div className='imgWrap'>
          <img src={image3} alt="Image 3" />
        </div>
        <div className='imgWrap'>
          <img src={image3} alt="Image 3" />
        </div>
        {/* 추가 이미지 */}
      </Slider>
    </>
  )
}

export default MainSlide;