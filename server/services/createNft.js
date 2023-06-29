import { NFTStorage, File } from "nft.storage";
import dotenv from "dotenv";
import fs from "fs"
import path from "path"

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
/**
 * getExampleImage
 * @returns {Promise<Blob>}
 */
async function getImage(img) {
  //로컬이미지 blob으로 변환
  // let blob = new Blob([img.beffer], {type: img.mimetype });
  // console.log(img.beffer, img.mimetype)
  // //blob을 url로 변환
  // const url = URL.createObjectURL(blob);
  const imageOriginUrl = "https://gateway.pinata.cloud/ipfs/QmZeVQcVQnhmavnLbJ5yvsbaMGHZSvTiHC4NyjbtrpmJbc?_gl=1*1mljk3z*_ga*NjE0NDE3MjYzLjE2ODc3NjA4NjU.*_ga_5RMPXG14TE*MTY4Nzk3NDY3OS4zLjEuMTY4Nzk3NDY4My41Ni4wLjA.";
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
  extension
) {
  //url로 이미지 불러오기
  //const image = await getImage(img);
  const nft = {
    //local image 가져오기
    //image: new File([UTF-8], 'cat.png', { type: 'image/png' }),
    image: new File([fs.readFileSync("./wave.mp4")], "wave.mp4", {type: "video/mp4"}),
    name: title,
    description: description,
    properties: {
      type: "blog-post",
      origins: {
        http: "https://blog.nft.storage/posts/2021-11-30-hello-world-nft-storage/",
        ipfs: "ipfs://bafybeieh4gpvatp32iqaacs6xqxqitla4drrkyyzq6dshqqsilkk3fqmti/blog/post/2021-11-30-hello-world-nft-storage/",
      },
      //속성
      authors: [{ exLink: exLink, category : category , extension: extension }],
      content: {
        "text/markdown":
          "The last year has witnessed the explosion of NFTs onto the world’s mainstage. From fine art to collectibles to music and media, NFTs are quickly demonstrating just how quickly grassroots Web3 communities can grow, and perhaps how much closer we are to mass adoption than we may have previously thought. <... remaining content omitted ...>",
      },
    },
  };

  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store(nft);

  console.log("NFT data stored!");
  console.log("Metadata URI: ", metadata.url);
}

//storeNFT();
