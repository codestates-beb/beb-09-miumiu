import React from 'react';
import styles from '../../assets/css/Detail.module.css';
import image2 from "../../assets/images/dummy2.png";

const Detail = () => { 
  return (
    <>
      <div className={styles.detailContainer}>
        <div className={styles.left}>
            <div>
            <img src={image2} alt="dummy image" className={styles.squareImage}></img>
            </div>
            <div className={styles.Description}>
            <h3 className={styles.DescriptionH3}>Description</h3>
            <div className={styles.DescriptionLine}></div> {/* Add a separate div for the line */}
            <p className={styles.DescriptionP}>WonderPals is a collection of 10,000 delightfully cute pals. Our vision is to bring more joy to the world through community, creativity, and fun art!</p>
            <div className={styles.DescriptionLine}></div>
            <h3 className={styles.DescriptionDitails}>Ditails</h3>
            <div className={styles.DescriptionLine}></div>
            <div className={styles.DescriptionVal}>
                <div >
                Category
                <span>계정 주소</span>
                </div>
                <div>
                ExLink
                <span>Url</span>
                </div>
                <div>
                Extension
                <span>확장자명</span>
                </div>
            </div>
            </div>
        </div>

        <div className={styles.right}>
            <h1 className={`${styles.title} ${styles.owned} ${styles.titleSize}`}>title</h1>
            <p className={`${styles.title} ${styles.owned}`}>Owned by</p>
            <div className={styles.priceContainer}>
                <div>
                    <span>Current price</span>
                    <h1 className={styles.priceVal}>0.04ETH</h1>
                </div>
                <button className={styles.buyBtn}><h3>Buy now</h3></button>
            </div>
        </div>
      </div>
    </>
  );
}

export default Detail;
