import React , { useContext, useEffect, useState }from 'react';
import Slider from "react-slick";
import { Link } from 'react-router-dom';
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
  const [infoNft, setInfoNft] = useState([]);
  
  
  /**
   * 사용자의 동물 토큰 목록을 가져오는 비동기 함수.
   * 
   * @async
   * @throws {Error} 토큰 목록을 가져오는 중 에러가 발생한 경우.
   * @returns {void} 토큰 목록을 설정하고 상태에 저장다.
   */
  const getUserToken = async () => {
    let contractAddress = process.env.REACT_APP_ERC_721_ADDRESS;

    try {
      // const response = await get721Contract(contractAddress).methods.getNftTokenList(user.account).call();
      const response = await get721Contract(contractAddress).methods.getAllNftList().call();
      console.log('response', response)
      // setNftList(prevList => [...prevList, ...response]);
      setNftList(response.map(nft => [Number(nft[0]), nft[1]]));
    } catch (error) {
      console.error(error);
    }
  }
  
  useEffect(() => {
    getUserToken()
  }, []);

  /**
   * 주어진 URL을 IPFS 주소로 변환하는 함수.
   * 
   * @param {string} url 변환할 URL.
   * @returns {string | undefined} IPFS 주소로 변환된 URL입니다. URL이 주어지지 않은 경우 `undefined`를 반환.
   */
  const IpfsParser = (url) => {
    const cid = url.slice(7,url.length)
    const ipfsUrl = "https://ipfs.io/ipfs/" + cid
    console.log(ipfsUrl)
    return ipfsUrl
  }
    
  /**
   * 모든 NFT 데이터를 가져오는 비동기 함수.
   * 
   * @async
   * @throws {Error} 데이터를 가져오는 중 에러가 발생한 경우.
   * @returns {void} NFT 데이터를 설정하고 상태에 저장.
   */
  useEffect(() => {
    const fetchData = async (url) => {
        try {
          const response = await fetch(IpfsParser(url));
          const data = await response.json();
          setInfoNft(prevList => [...prevList, ...(Array.isArray(data) ? data : [data])]);
          // return data;  
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

    console.log('infoNft', infoNft);
  
  return (
    <>
      <Slider className={styles.mainSlide} {...settings}>
        {infoNft.map((data, i) => {
          console.log("data", data, i)
          return (
            <div className={`${styles.imgWrap} ${styles.nftImage}`} key={i}>
              {/* {console.log(NftList[i][0])} */}
              <Link to={`/detail/${i}`} state={{ info: data }}>
                <img src={IpfsParser(data.image)} alt={`Image ${i}`}/>
              </Link>
            </div>
          )
        })}
        
        <div className={styles.imgWrap}>
          <img src={IpfsParser('ipfs://bafybeigqxcwjlwmgkhg4i6sq6xptd4nfgext5kg5qxzrpap6nmzp6nwsli/img-1688047924434')} alt="Image 1"/>
        </div>
      </Slider>
    </>
  )
}

export default MainSlide;