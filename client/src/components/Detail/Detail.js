import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import styles from '../../assets/css/Detail.module.css';
import image2 from "../../assets/images/dummy2.png";
import { get721Contract } from '../../Contract/Contract'
import { Context } from '../../Context/index';

const Detail = () => { 

  const imgurl = image2
  const title = "ether"
  const owned = "5E97A8"
  const price = "0.04"
  const Description = "WonderPals is a collection of 10,000 delightfully cute pals. Our vision is to bring more joy to the world through community, creativity, and fun art!"
  const category = "Art"
  const exlink = "http://aaa.com"
  const extension = "png"
  const location = useLocation();

  const info = location.state.info;

  console.log(info);

    // user info
  const { state: { user }, dispatch } = useContext(Context);
  const [NftList, setNftList] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [NftUrl, setNftUrl] = useState();
  const [selectedNft, setSelectedNft] = useState(null);

  /**
   * 주어진 URL을 IPFS 주소로 변환하는 함수.
   * 
   * @param {string} url 변환할 URL.
   * @returns {string | undefined} IPFS 주소로 변환된 URL입니다. URL이 주어지지 않은 경우 `undefined`를 반환.
   */
    const IpfsParser = (url) => {
      if (!url) {
        return;
      }
      const cid = url.slice(7,url.length)
      const ipfsUrl = "https://ipfs.io/ipfs/" + cid
      console.log(ipfsUrl)
      return ipfsUrl
    }
    
  return (

    <>
      <div className={styles.detailContainer}>
        <div className={styles.left}>
            <div className={styles.imageContainer}>
              <img src={IpfsParser(info.image)} alt="NFT image" className={styles.squareImage} />
            </div>
            
            
        </div>
        <div className={styles.right}>
            <div className={styles.titleContainer}>
                <h1 className={`${styles.title} ${styles.owned} ${styles.titleSize}`}>{info.name}</h1>
                <p className={`${styles.title} ${styles.owned}`}>Owned by {owned}</p>
            </div>
            

            <div className={styles.priceContainer}>
                <div>
                    <span>Current price</span>
                    <h1 className={styles.priceVal}>{Number(info.price)}ETH</h1>
                </div>
                <button className={styles.buyBtn}><h3>Buy now</h3></button>
            </div>

            <div className={styles.Description}>
                <h3 className={styles.DescriptionH3}>Description</h3>
                <div className={styles.DescriptionLine}></div> {/* Add a separate div for the line */}
                <p className={styles.DescriptionP}>{info.description}</p>
                <div className={styles.DescriptionLine}></div>
                <h3 className={styles.DescriptionDitails}>Details</h3>
                <div className={styles.DescriptionLine}></div>
                <div className={styles.DescriptionVal}>
                    <div >
                    Category
                    <span className={styles.rightAlign}>{info.properties.category}</span>
                    </div>
                    <div>
                    ExLink
                    <span className={styles.rightAlign}>{info.properties.exLink}</span>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </>
  );
}


export default Detail;
