import React, { useContext, useEffect, useState } from 'react';
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
    const id = 0

    // user info
    const { state: { user }, dispatch } = useContext(Context);
    const [NftList, setNftList] = useState([]);
  const [jsonData, setJsonData] = useState([]);
  const [NftUrl, setNftUrl] = useState()
  
  

  const getAnimalTokens = async () => {
    let contractAddress = process.env.REACT_APP_ERC_721_ADDRESS;

    try {
      // const response = await get721Contract(contractAddress).methods.getNftTokenList(user.account).call();
      const response = await get721Contract(contractAddress).methods.getAllNftList().call();
      //console.log(response)
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
    

    
    
    useEffect(() => {
      const fetchData = async (url) => {
        try {
          const response = await fetch(IpfsParser(url));
          const data = await response.json();
          console.log(data)
          setJsonData(data)
          // const image = data['image'];
          // setJsonData(prevData => [...prevData, image]);
        } catch (error) {
          console.error(error);
        }
      };
    
      const fetchAllData = async () => {
        const url = NftList[id]
        await fetchData(url[1]);
        
        console.log("jsonData", jsonData);
      };
    
      fetchAllData();
    }, [NftList]);
    
    console.log("jsonData", jsonData)
    

  return (

    <>
      <div className={styles.detailContainer}>
        <div className={styles.left}>
            <div>
            <img src={IpfsParser(jsonData['image'])} alt="dummy image" className={styles.squareImage}></img>
            </div>
            
        </div>

        <div className={styles.right}>
            <div className={styles.titleContainer}>
                <h1 className={`${styles.title} ${styles.owned} ${styles.titleSize}`}>{jsonData['name']}</h1>
                <p className={`${styles.title} ${styles.owned}`}>Owned by {owned}</p>
            </div>
            

            <div className={styles.priceContainer}>
                <div>
                    <span>Current price</span>
                    <h1 className={styles.priceVal}>{jsonData['price']}ETH</h1>
                </div>
                <button className={styles.buyBtn}><h3>Buy now</h3></button>
            </div>

            <div className={styles.Description}>
                <h3 className={styles.DescriptionH3}>Description</h3>
                <div className={styles.DescriptionLine}></div> {/* Add a separate div for the line */}
                <p className={styles.DescriptionP}>{jsonData['description']}</p>
                <div className={styles.DescriptionLine}></div>
                <h3 className={styles.DescriptionDitails}>Details</h3>
                <div className={styles.DescriptionLine}></div>
                <div className={styles.DescriptionVal}>
                    <div >
                    Category
                    <span className={styles.rightAlign}>{category}</span>
                    </div>
                    <div>
                    ExLink
                    <span className={styles.rightAlign}>{exlink}</span>
                    </div>
                    <div>
                    Extension
                    <span className={styles.rightAlign}>{extension}</span>
                    </div>
                </div>
            </div>
            
        </div>
      </div>
    </>
  );
}


export default Detail;
