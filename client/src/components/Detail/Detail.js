import React from 'react';
import styles from '../../assets/css/Detail.module.css'
import image2 from "../../assets/images/dummy2.png"


const Detail = () => { 

  return (
    <>
    <div className={styles.left}>
        <div >
            <img src= {image2} alt="dummy image" className={styles.squareImage}></img>
        </div>
        <div className={styles.Description}>
            <h3>Description</h3>
            <p>설명 부분 입니다.</p>
            <h3>Ditails</h3>
            <div>
                <div>
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
        <h2>title</h2>
        <p>Owned by</p>
        <div>
            <div>
                <span>Current price</span>
                <div>0.04ETH</div>
            </div>
            <button>Buy now</button>
        </div>
    </div>
      

    </>
  )
}

export default Detail;