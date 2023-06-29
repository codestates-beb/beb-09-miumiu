import { NFTStorage, File } from "nft.storage";
import dotenv from "dotenv";
import fs from "fs"

dotenv.config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;

/**
 * storeNFT
 * nft 데이터를 저장한다.
 */
export async function storeNFT(
  imgPath,        //@이미지 경로
  imgName,        //@이미지 이름
  imgType,        //@이미지 타입
  title,          //@제목
  exLink,         //@링크
  description,    //@설명
  category,       //@카테고리
  
) {
  console.log(imgPath + imgName, imgType)
  const nft = {
    //local image 가져오기
    image: new File([fs.readFileSync(imgPath)], imgName, {type: imgType}),
    name: title,
    description: description,
    properties: {
        exLink: exLink, 
        category : category,
        extension: imgType      //@확장자명
    },
  };

  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store(nft);

  console.log("NFT data stored!");
  console.log("Metadata URI: ", metadata.url);
}

//storeNFT();
