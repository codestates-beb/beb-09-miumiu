import { NFTStorage } from "nft.storage";
import dotenv from "dotenv";

dotenv.config();

const API_KEY = process.env.NFT_STORAGE_API_KEY;

// // 이미지 url,  url 만 가능하다
// const imgURL =
//   "https://health.chosun.com/site/data/img_dir/2023/03/17/2023031701883_0.jpg";
// // nft 이름
// const name = "cheese cat";
// // nft 설명
// const description = "귀여운 치즈냥이";
// // nft 테마
// const theme = "art";
// // nft 확장자
// const extension = "jpg";

/**
 * getImage
 * 받아온 이미지 데이터를 url로 변환 후 업로드
 */
async function getImage(img) {
  // img를 url로 변환
  // let blob = new Blob([img], { type: "image/*" }); //로컬이미지 blob으로 변환
  // const chgUrl = URL.createObjectURL(blob); //blob을 url로 변환

  // 이미지 업로드
  const imageOriginUrl = img;
  const r = await fetch(imageOriginUrl);
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`);
  }
  return r.blob();
}

/**
 * storeNFT
 * nft 데이터를 저장한다.
 */
export async function storeNFT(
  img,
  title,
  exLink,
  description,
  category,
  price
) {
  //url로 이미지 불러오기
  // const image = await getImage(img);
  const image = img;
  const nft = {
    //local image 가져오기
    //image: new File([UTF-8], 'cat.png', { type: 'image/png' }),
    image,
    name: title,
    description: description,
    price: price,
    properties: {
      exLink: exLink,
      category: category,
    },
  };

  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store(nft);

  console.log("NFT data stored!");
  console.log("Metadata URI: ", metadata.url);
}

// storeNFT();
