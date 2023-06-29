import React from 'react';


const Detail = () => {

  return (
    <>
    <div>
        <div>
            <img src='./img'></img>
        </div>
        <div>
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
      
    <div>
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