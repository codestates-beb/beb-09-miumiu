import express from "express";
import cors from "cors";
import { articleFormDataHandler } from "./loaders/multer.js";
import { storeNFT } from "./services/createNft.js";
import http from "http";

const app = express();
const PORT = 8082;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/src/App.js"));
});

// create nft
app.post("/create", articleFormDataHandler, async (req, res) => {
  // console.log("req.body", req.body);
  console.log("req.files", req.files);

  const { img } = req.files;
  const {
    title,
    exLink,
    description,
    category,
    price,
    signature,
    message,
    userAddress,
  } = req.body;

  try {
    //@args 이미지 경로, 이미지 이름, 이미지 타입, 제목, 링크, 설명, 카테고리
    const resultUri = await storeNFT(
      img[0].destination + img[0].path,
      img[0].filename,
      img[0].mimetype,
      title,
      exLink,
      description,
      category,
      price,
      signature,
      message,
      userAddress
    );

    res.json({ resultUri });
  } catch (err) {
    console.log(err);
    res.status(500).send("Failed to store NFT");
  }
});

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`server is listening on PORT ${PORT}`);
});
