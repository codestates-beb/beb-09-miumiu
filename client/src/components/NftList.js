import React from 'react';
import { 
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import '../assets/css/NftList.css'
import image1 from "../assets/images/dummy1.jpeg";
import image2 from "../assets/images/dummy2.png";
import image3 from "../assets/images/dummy3.jpeg";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "black" }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", color: "#000" }}
      onClick={onClick}
    />
  );
}


export default function NftList () {

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };


  const data = [
    {title: 'NFT 1', floor: '6', totalVolume: '6'},
    {title: 'NFT 2', floor: '4', totalVolume: '1.5'},
    {title: 'NFT 3', floor: '0.002', totalVolume: '7'},
    {title: 'NFT 4', floor: '1.2', totalVolume: '2'},
    {title: 'NFT 5', floor: '5', totalVolume: '2'},
    {title: 'NFT 6', floor: '5', totalVolume: '2'},
    {title: 'NFT 7', floor: '5', totalVolume: '2'},
    //... More cards
  ]


  return (
    <>
      <div className='nftList'>
        <h1>Notable Collections</h1>
        <Slider {...settings}>
          {data.map((item, index) => (
            <div className='card' key={index}>
              <Card sx={{ maxWidth: '400px', borderRadius: '20px' }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={image1}
                  title="green iguana"
                />
                <CardContent>
                  <div>
                    <p className='cardTitle'>{item.title}</p>
                  </div>
                  <div className='cardContent'>
                    <div className='cardFloor'>
                      <p>Floor</p>
                      <p>{item.floor} ETH</p>
                    </div>
                    <div className='cardTotal'>
                      <p>Total Volume</p>
                      <p>{item.totalVolume} ETH</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
      <div className='nftList'>
        <h1>Top Collector Buys Today</h1>
        <Slider {...settings}>
          {data.map((item, index) => (
            <div className='card' key={index}>
              <Card sx={{ maxWidth: '400px', borderRadius: '20px' }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={image2}
                  title="green iguana"
                />
                <CardContent>
                  <div>
                    <p className='cardTitle'>{item.title}</p>
                  </div>
                  <div className='cardContent'>
                    <div className='cardFloor'>
                      <p>Floor</p>
                      <p>{item.floor} ETH</p>
                    </div>
                    <div className='cardTotal'>
                      <p>Total Volume</p>
                      <p>{item.totalVolume} ETH</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
      <div className='nftList'>
        <h1>LGBTQIA+ Pride Month Creator Spotlight</h1>
        <Slider {...settings}>
          {data.map((item, index) => (
            <div className='card' key={index}>
              <Card sx={{ maxWidth: '400px', borderRadius: '20px' }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={image3}
                  title="green iguana"
                />
                <CardContent>
                  <div>
                    <p className='cardTitle'>{item.title}</p>
                  </div>
                  <div className='cardContent'>
                    <div className='cardFloor'>
                      <p>Floor</p>
                      <p>{item.floor} ETH</p>
                    </div>
                    <div className='cardTotal'>
                      <p>Total Volume</p>
                      <p>{item.totalVolume} ETH</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}