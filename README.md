# **OpenSea 클론코딩**
OpenSea는 이더리움 기반의 NFT 거래소 입니다. 저희는 OpenSea 일부 기능(ERC-721)만을 클론 코딩 하였습니다. 저희 프로젝트의 OpenC에서는 ERC-721 기술로 생성된 NFT를 지갑을 연결하고 민팅을 하실 수 있습니다.

---

<h3 style="font-weight:bold">💻 Front-end Stack 💻 <h3/>
<img alt="HTML" src="https://img.shields.io/badge/HTML-E34F26.svg?style=for-the-badge&logo=HTML5&logoColor=white"/>
<img alt="CSS3" src="https://img.shields.io/badge/CSS3-1572B6.svg?style=for-the-badge&logo=CSS3&logoColor=white"/>
<img alt="Javascript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=for-the-badge&logo=JavaScript&logoColor=white"/>
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=for-the-badge&logo=React&logoColor=white"/>
<img alt="MUI" src="https://img.shields.io/badge/MUI-007FFF.svg?style=for-the-badge&logo=MUI&logoColor=white"/>
<img alt="Web3.js" src="https://img.shields.io/badge/Web3.js-F16822.svg?style=for-the-badge&logo=Web3.js&logoColor=white"/>
<br/>
<br/>

<h3 style="font-weight:bold">📫 Back-end Stack 📫 <h3/>
<img alt="Solidity" src="https://img.shields.io/badge/Solidity-363636.svg?style=for-the-badge&logo=Solidity&logoColor=white"/>
<img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=Node.js&logoColor=white"/>
<img alt="Express" src="https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white"/>
<img alt="Ethers.js" src="https://img.shields.io/badge/Ethers.js-3C3C3D.svg?style=for-the-badge&logo=Ethereum&logoColor=white"/>
<img alt="IPFS" src="https://img.shields.io/badge/IPFS-65C2CB.svg?style=for-the-badge&logo=IPFS&logoColor=white"/>
<br/>
<br/>

<h3 style="font-weight:bold"> 💾 Etc Stack 💾 <h3/>
<img alt="npm" src="https://img.shields.io/badge/npm-CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"/>
<img alt=".ENV" src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=.ENV&logoColor=white"/>
<img alt="Discord" src="https://img.shields.io/badge/Discord-5865F2.svg?style=for-the-badge&logo=Discord&logoColor=white"/>
<img alt="Ethereum" src="https://img.shields.io/badge/Ethereum-3C3C3D.svg?style=for-the-badge&logo=Ethereum&logoColor=white"/>
<img alt="MetaMask" src="https://img.shields.io/badge/MetaMask-F16822.svg?style=for-the-badge&logo=MetaMask&logoColor=white"/>
<img alt="Sepolia" src="https://img.shields.io/badge/Sepolia-9558B2.svg?style=for-the-badge&logo=Sepolia&logoColor=white"/>
<br/>

---

## **👨‍👩‍👧‍👦팀 멤버**

|팀원|역할|기타|
|---------|----------|---------|
|**김서연(팀장)**|Front-end|[Blog link](https://kimseoyeon23.github.io/blog/dev/codestates/2023-06-30-FirstProject/)
|**김가연**|Back-end|[Blog link]()
|**이지수**|Back-end|[Blog link](https://dlwltn98.tistory.com/85)
|**유채원**|Front-end|[Blog link]()

---

## **Flow Chart**
![FlowChart](https://github.com/KimSeoYeon23/KimSeoYeon23/assets/115128505/81bebbfc-ff2c-4023-95b5-15698837f89b)  

## **화면 흐름도**
![화면흐름도](https://github.com/KimSeoYeon23/KimSeoYeon23/assets/115128505/4bfe341b-05df-4ba0-a854-eee46dcddc78)

---

## **기능**
- 로그인 / 로그아웃
  - 메타마스크 지갑을 이용해 로그인 할 수 있습니다.
    - 쿠키에 메타마스크에 로그인한 지갑 주소를 저장합니다.
  - 로그아웃을 하는 경우 지갑 연결이 해제 됩니다.
    - 로그아웃 시에 쿠키에 저장된 지갑 주소도 삭제됩니다.
- NFT 생성
  - 파일 첨부, NFT 타이틀, 가격 등을 모두 입력 후 Mint 버튼 클릭 하면 메타마스크 서명 요청을 할 수 있습니다.
  - 해당 서명은 서버에서 서명 검증을 하고, 검증이 완료되면 가스비를 지불 할 수 있는 창이 생성됩니다. 
  - 가스비 지불이 완료되면 마이 페이지로 이동하면서 NFT 생성, 즉 민팅이 완료됩니다. 
- IPFS
  - 이미지와 메타 데이터를 저장합니다.
  - 메타 데이터에는 NFT의 타이틀, 설명, 가격 등 NFT와 관련된 정보들이 포함되어 있습니다.
  - 해당 메타 데이터를 이용해 프론트에서 NFT 정보를 가져올 수 있습니다.
    - 메인 페이지와 NFT 상세 페이지, 마이 페이지에서 메타 데이터를 이용해 NFT 정보를 출력합니다.

---

## **프로젝트 실행 전 필요 항목**

### **Contract Address**
`client` 폴더 안에 `.env` 파일을 생성 후 아래 코드를 작성합니다.  
> *현재 저희 repository에는 해당 코드가 작성이 되어 있는 상태입니다.*
```env
  REACT_APP_ERC_721_ADDRESS = "0x3b975dF52Bd5899c0600E3FEa9D4326c9c2b83Ee"
```  
<br />  

### **NFT.Storage API KEY**
`server` 폴더 안에 `.env` 파일을 생성 후 [NFT.Storage](https://nft.storage/) 홈페이지에서 생성한 API KEY를 작성합니다.
```.env
NFT_STORAGE_API_KEY = "Your API KEY"
```
NFT.Storage 홈페이지에 회원 가입 후 API Keys 탭에서 API KEY를 생성하실 수 있습니다.
![NFT.Storage](https://github.com/KimSeoYeon23/KimSeoYeon23/assets/115128505/04a70a45-610d-46ec-91da-1bd8d7c48236)  

---
  
## **실행 화면**  

### Main Page
![MainPage](https://github.com/KimSeoYeon23/KimSeoYeon23/assets/115128505/4cbfcc40-1570-4fe9-abb2-0cb3d49d9f90)  

### Create Page
![CreatePage](https://github.com/KimSeoYeon23/KimSeoYeon23/assets/115128505/588a5085-6415-4b8d-b534-1519f662874b)  

### Request Signature(서명 요청)
![Signature](https://github.com/KimSeoYeon23/KimSeoYeon23/assets/115128505/49de09d2-350a-4424-861e-614f7a3e47b0)

### Pay for Gas Fee(가스비 지불)
![GasFee](https://github.com/KimSeoYeon23/KimSeoYeon23/assets/115128505/4c454db0-b8f9-4099-9875-5b7e7c79aff3)

### My Page
![MyPage](https://github.com/KimSeoYeon23/KimSeoYeon23/assets/115128505/5520847c-1930-4c4f-bf46-0b9118d21fb0)

## Detail Page
![DetailPage](https://github.com/KimSeoYeon23/KimSeoYeon23/assets/115128505/bc6d021e-4411-4318-938d-2bbdf968db3a)  

---

## Package.json 
### Client
1. React Version
   ```json
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
   ```
2. react-router-dom Version
    ```json
    "react-router-dom": "^6.13.0",
    ```
3. React-slick Version
    ```json
    "react-slick": "^0.29.0",
    "slick-carousel": "^1.8.1",
    ```
4. React-cookie Version
    ```json
    "react-cookie": "^4.1.1",
    ```
5. MUI Version
    ```json
    "@mui/icons-material": "^5.11.16",
    "@mui/material": "^5.13.5",
    "@mui/styles": "^5.13.2",
    ```

### Server
1. OpenZeppelin Version
    ```json
    "@openzeppelin/contracts": "^4.9.2",
    ```
2. cors Version
    ```json
    "cors": "^2.8.5",
    ```
3. dotenv Version
    ```json
    "dotenv": "^16.3.1",
    ```
4. Express Version
    ```json
    "express": "^4.18.2",
    ```
5. multer Version
    ```json
    "multer": "^1.4.5-lts.1",
    ```
6. nft.storage Version
    ```json
    "nft.storage": "^7.1.0",
    ```
7. nodemon Version
    ```json
    "nodemon": "^2.0.22"
    ```
8. ethers Version
    ```json
    "ethers": "^5.7.2"
    ```
