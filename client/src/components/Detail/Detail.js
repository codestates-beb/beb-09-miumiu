import React, { useContext, useEffect } from 'react';
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

    // user info
    const { state: { user }, dispatch } = useContext(Context);

    const getAnimalTokens = async () => {
      let contractAddress = process.env.REACT_APP_ERC_721_ADDRESS;

      try {
        // const response = await get721Contract(contractAddress).methods.getNftTokenList(user.account).call();
        const response = await get721Contract(contractAddress).methods.getAllNftList().call();
        console.log(response);

      } catch (error) {
          console.error(error);
      }
    }

    useEffect(() => {
      getAnimalTokens()
    }, []);

  return (

    <>
      <div className={styles.detailContainer}>
        <div className={styles.left}>
            <div>
            <img src={imgurl} alt="dummy image" className={styles.squareImage}></img>
            </div>
            
        </div>

        <div className={styles.right}>
            <div className={styles.titleContainer}>
                <h1 className={`${styles.title} ${styles.owned} ${styles.titleSize}`}>{title}</h1>
                <p className={`${styles.title} ${styles.owned}`}>Owned by {owned}</p>
            </div>
            

            <div className={styles.priceContainer}>
                <div>
                    <span>Current price</span>
                    <h1 className={styles.priceVal}>{price}ETH</h1>
                </div>
                <button className={styles.buyBtn}><h3>Buy now</h3></button>
            </div>

            <div className={styles.Description}>
                <h3 className={styles.DescriptionH3}>Description</h3>
                <div className={styles.DescriptionLine}></div> {/* Add a separate div for the line */}
                <p className={styles.DescriptionP}>{Description}</p>
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
