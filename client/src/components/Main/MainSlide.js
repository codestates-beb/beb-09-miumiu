import React , { useContext, useEffect, useState }from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import image1 from "../../assets/images/dummy1.jpeg";
import image2 from "../../assets/images/dummy2.png";
import image3 from "../../assets/images/dummy3.jpeg";
import styles from '../../assets/css/MainSlide.module.css'

import { get721Contract } from '../../Contract/Contract'
import { Context } from '../../Context/index';


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

  // user info
  const { state: { user }, dispatch } = useContext(Context);
  const [NftList, setNftList] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [NftUrl, setNftUrl] = useState();
  
  

  const getAnimalTokens = async () => {
    let contractAddress = process.env.REACT_APP_ERC_721_ADDRESS;

    try {
      // const response = await get721Contract(contractAddress).methods.getNftTokenList(user.account).call();
      const response = await get721Contract(contractAddress).methods.getAllNftList().call();
      console.log('response', response)
      setNftList(prevList => [...prevList, ...response]);
    } catch (error) {
      console.error(error);
    }
  }
  
    useEffect(() => {
      getAnimalTokens()
    }, []);

    // NftList.map((el, index) => {
    //   setNftUrl(el[1])
    //   console.log(el[1])
    // })
    

    

    const IpfsParser = (url) => {
      const cid = url.slice(7,url.length)
      const ipfsUrl = "https://ipfs.io/ipfs/" + cid
      console.log(ipfsUrl)
      return ipfsUrl
    }
    

    // useEffect(() => {
    //   const fetchData = async (url) => {
    //     try {
    //       const response = await fetch(IpfsParser(url));
    //       const data = await response.json();
    //       const image = data['image'];
    //       setJsonData(prevData => [...prevData, image]);
    //     } catch (error) {
    //       console.error(error);
    //     }
    //   };
    
    //   const fetchAllData = async () => {
    //     for (const data of NftList) {
    //       await fetchData(data[1]);
    //     }
    //     console.log("jsonData", jsonData);
    //   };
    
    //   fetchAllData();
    // }, [NftList]);

    // useEffect(() => {
    //   const fetchData = async (url) => {
    //       try {
    //           const response = await fetch(IpfsParser(url));
    //           const data = await response.json();
    //           return IpfsParser(data['image']);  // IPFS URL을 반환하도록 변경
    //       } catch (error) {
    //           console.error(error);
    //       }
    //   };
  
    //   const fetchAllData = async () => {
    //       try {
    //           const allData = await Promise.all(NftList.map(data => fetchData(data[1])));
    //           setJsonData(allData);  // allData는 이미 IPFS URL의 배열입니다.
    //           console.log('jsonData', allData);
    //       } catch (error) {
    //           console.error(error);
    //       }
    //   };
  
    //   fetchAllData();
    // }, [NftList]);
    useEffect(() => {
      const fetchData = async (url) => {
          try {
              const response = await fetch(IpfsParser(url));
              const data = await response.json();
              return IpfsParser(data['image']);  // IPFS URL을 반환하도록 변경
          } catch (error) {
              console.error(error);
          }
      };
  
      const fetchAllData = async () => {
          try {
              const allData = await Promise.all(NftList.map(data => fetchData(data[1])));
              setJsonData(allData);  // allData는 'image' 속성의 값의 배열입니다.
              console.log('jsonData', allData);
          } catch (error) {
              console.error(error);
          }
      };
  
      fetchAllData();
    }, [NftList]);
  
    return (
      <>
        <Slider className={styles.mainSlide} {...settings}>
          {jsonData.map((data, i) => {
            console.log("data", data)
            return (
              <div className={styles.imgWrap} key={i}>
                <img src={data} alt={`Image ${i}`}/>
              </div>
            )
          })}
          <div className={styles.imgWrap}>
            <img src={IpfsParser('ipfs://bafybeigqxcwjlwmgkhg4i6sq6xptd4nfgext5kg5qxzrpap6nmzp6nwsli/img-1688047924434')} alt="Image 1"/>
          </div>
          {/* <div className={styles.imgWrap}>
            <img src={image1} alt="Image 1"/>
          </div>
          <div className={styles.imgWrap}>
            <img src={image1} alt="Image 1"/>
          </div>
          <div className={styles.imgWrap}>
            <img src={image2} alt="Image 2" />
          </div>
          <div className={styles.imgWrap}>
            <img src={image3} alt="Image 3" />
          </div> */}
          {/* <div className={styles.imgWrap}>
            <img src={image3} alt="Image 3" />
          </div> */}
          {/* <div className={styles.imgWrap}>
            <img src={image3} alt="Image 3" />
          </div> */}
        </Slider>
      </>
    )
  
    
    
  // return (
  //   <>
  //     <Slider className={styles.mainSlide} {...settings}>
  //       {jsonData.map((data, i) => {
  //         console.log("data",IpfsParser(data))
  //         return(
  //         <div className={styles.imgWrap} key={i}>
  //           <img src={IpfsParser(data)} alt="Image 1"/>
  //       </div>
  //         )
  //       })}
  //       
  //       {/* 추가 이미지 */}
  //     </Slider>
  //   </>
  // )
}

export default MainSlide;