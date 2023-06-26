import React, { useState } from 'react';
import { Button, Grid } from "@mui/material";
import '../assets/css/NftList.css'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from "../assets/images/dummy1.jpeg";
import image2 from "../assets/images/dummy2.png";
import image3 from "../assets/images/dummy3.jpeg";

const categories = ['All', 'Art', 'Gaming', 'Memberships', 'PFPs', 'Photography', 'Music']; 

export default function NftList () {
  const [value, setValue] = useState(50);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleCategoryClick = (category) => {
    // 카테고리 버튼 클릭 시 처리할 로직 작성
    console.log(`Clicked category: ${category}`);
  };

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
      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        {categories.map((category) => (
          <Grid item key={category}>
            <Button variant="outlined" className='categoryBtn' onClick={() => handleCategoryClick(category)}>
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>
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