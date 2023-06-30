import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Web3 from 'web3';
import { Context } from '../../Context/index'
import { get721Contract } from '../../Contract/Contract'
import { 
  Box, 
  Button, 
  Typography, 
  Select, 
  MenuItem, 
  FormControl, 
  InputLabel,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
} from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CircularProgress from '@mui/material/CircularProgress';
import styles from '../../assets/css/Create.module.css'

const Create = () => {

  let web3 = new Web3(window.ethereum);

  const [cookies, setCookie, removeCookie] = useCookies(['address']);

  // user info
  const { state: { user }, dispatch } = useContext(Context);

  const fileInput = useRef(null);
  const navigate = useNavigate();
  const [category, setCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);    // Modal Open handling
  const [message, setMessage] = useState("");               // Modal Message
  const [checkFile, setCheckFile] = useState(0);            // 비디오(1)인지 이미지(0)인지 체크
  const [nftItem, setNftItem] = useState(null);
  const [nftItemUrl, setNftItemUrl] = useState(null);
  const [loading, setLoading] = useState(false);  // Add this line
  const [modalTitle, setModalTitle] = useState(null)

  // NFT 정보
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [externalLink, setExternalLink] = useState('');
  const [price, setPrice] = useState('');
  const [tokenId, setTokenId] = useState(0); // 초기 토큰 ID를 0으로 설정

  // input value
  const titleChange = (event) => {
    setTitle(event.target.value);
  };

  // input value
  const descriptionChange = (event) => {
    setDescription(event.target.value);
  };

  // input value
  const externalLinkChange = (event) => {
    setExternalLink(event.target.value);
  };

  // input value  
  const priceChange = (event) => {
    setPrice(event.target.value);
  };

  // file upload
  const imageUpload = (event) => {
    if (event.target.files[0] !== undefined) {
      // 업로드 한 파일 가져오기
      const file = event.target.files[0];
      let maxSize = 100;
      let ipfsSize = 50;

      // 파일을 메가바이트 단위로 변환
      let fileSize = (file.size) / Math.pow(10, 6);

      if(fileSize < maxSize) {
        let fileType = (file.type).split('/')[1];
        const imageURL = URL.createObjectURL(file);

        if(fileType === 'png' || fileType === 'jpg' || fileType === 'jpeg' || fileType === 'gif') {
          setCheckFile(0);

          setNftItem(file);
          setNftItemUrl(imageURL);
        } else if (fileType === 'mp4' || fileType === 'mkv') {
          setCheckFile(1);
          
          setNftItem(file);
          setNftItemUrl(imageURL);
        } else {
          setModalTitle('Error');
          setMessage("File type is not supported. Please upload a PNG, JPG, JPEG, GIF, MP4, or MKV file.");
          setIsModalOpen(true);
        }
      }
    }
  }

  console.log('nftItem', nftItem);
  console.log('url', nftItemUrl);

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  /**
   * 주어진 메타데이터 URL을 사용하여 비동기적으로 새 NFT 토큰을 발행다.
   *
   * @async
   * @param {string} metadata_url - 토큰 메타데이터의 URL.
   * @throws {Error} 토큰 발행 중 에러가 발생한 경우.
   * @returns {void} 토큰 발행이 성공하면 '/mypage'로 이동
   */
  const mintToken = async (metadata_url) => {
    let minter = user.account;
    let lastTokenId = tokenId;
    let tokenURI = metadata_url;
    let zeroWord = '0x0000000000000000000000000000000000000000000000000000000000000000';
    let gasPrice = await web3.eth.getGasPrice();
    let contractAddress = process.env.REACT_APP_ERC_721_ADDRESS;
  
    try {
      const receipt = await get721Contract(contractAddress).methods.mintNFT(tokenURI).send({
        from: minter,
        gasPrice: gasPrice,
        gasLimit: 500000
      });
  
      console.log('ERC_721 Success!');
      navigate('/mypage'); 
      setIsModalOpen(true);
      setMessage('Minting completed.');
      setTimeout(() => {
        setIsModalOpen(false);
        setMessage('');
      }, 5000);
    }
    catch (e) {
      console.log(e);
      setModalTitle('Error');
      setMessage(e.message); // Set the error message here
      setIsModalOpen(true);  // And open the modal with the error
      setLoading(false);  // Stop loading
    }
  }
  
  /**
   * NFT 토큰을 발행하는 비동기 함수다.
   *
   * @async
   * @throws {Error} 파일, 타이틀, 가격 중 하나라도 입력하지 않은 경우, 또는 토큰 발행 중 에러가 발생한 경우.
   * @returns {void} 발행이 성공하면 토큰 ID를 1 증가시키고 토큰 발행 함수(mintToken)를 호출합니다.
   */
  const mint = async () => {
    
    if(nftItem == null) { 
      setModalTitle('Error');
      setMessage('파일을 선택해 주세요.'); 
      setIsModalOpen(true); 
    } else if (title.length === 0) {
      setModalTitle('Error');
      setMessage('타이틀을 입력해 주세요.'); 
      setIsModalOpen(true); 
    } else if (price.length === 0) {
      setModalTitle('Error');
      setMessage('가격을 입력해 주세요.'); 
      setIsModalOpen(true); 
    } else {

      // 민팅 중 상태로 설정
      setLoading(true); 
      setModalTitle('Minting');
      setMessage('Minting...'); 
      setIsModalOpen(true); 
      let from = user.account;
      let params = [localStorage.getItem('Sign'), from];
      let method = 'personal_sign'
      console.log(params);
      try {
        web3.currentProvider.sendAsync({
          method,
          params,
          from
        }, function (err, result) {
          if (!err) {
            const signature = result.result;
  
            const formData = new FormData();
            formData.append('img', nftItem);
            formData.append('title', title);
            formData.append('exLink', externalLink);
            formData.append('description', description);
            formData.append('category', category);
            formData.append('price', price);
            formData.append('signature', signature);
            formData.append('message', localStorage.getItem('Sign'));
            formData.append('userAddress', user.account);
  
            axios(`http://localhost:8082/create`, {
              method: 'POST',
              data: formData,
              headers: {
                'Content-Type': 'multipart/form-data',
                'Accept': '*/*',
              }
            }).then(res => {
              console.log(res);
              // Here you can call the mintToken function and pass the metadata url.
              let metadata_url = res.data.resultUri; // assuming this is the format of the response
  
              mintToken(metadata_url);
              setTokenId(tokenId + 1);    // 토큰이 발행된 후 토큰 ID 증가
            })
          }
        })
      } catch (error) {
        console.log(error);
        setModalTitle('Error');
        setMessage(error.message); // Set the error message here
        setIsModalOpen(true);  // And open the modal with the error
        setLoading(false);  // Stop loading
      }
    }
  }

  // Add the following useEffect
  useEffect(() => {
    if (message === 'Minting Complete!') {
      setTimeout(() => {
        setIsModalOpen(false);
      }, 5000);
    }
  }, [message]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      gap: 2, 
      width: '646px',
      maxWidth: '100%',
      margin: '0 auto',
      marginTop: '100px', 
    }}>
      <Box sx={{ alignSelf: 'flex-start' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>Create New Item</Typography>
      </Box>
      <Box sx={{ alignSelf: 'flex-start' }}>
        <Typography variant="caption" sx={{
          fontSize: '0.8rem'
          }}
        >
          <span style={{ color: 'red' }}>*</span> Required fields
        </Typography>
      </Box>
      <Box sx={{ alignSelf: 'flex-start' }}>
        <Typography variant='body1' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Image, Video <span style={{ fontWeight: 'bold' }}>*</span>
        </Typography>
        <Typography variant='caption'>File types supported: JPG, PNG, GIF, MP4. Max size: 100 MB</Typography>
      </Box>
      <Box sx={{ alignSelf: 'flex-start' }}>
        <input
          ref={fileInput}
          type="file"
          style={{ display: 'none' }}
          onChange={(e) => imageUpload(e)}
          required
        />
        {nftItemUrl ? (
          <Box
            className={styles.boxHover}
            sx={{
              width: '420px',
              height: '320px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '3px dashed rgb(204, 204, 204)',
              borderRadius: '3px',
              marginTop: '20px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: '0.3s',
            }}
            onClick={() => fileInput.current.click()}
          >
            <img 
              className={styles.fileInput}
              src={nftItemUrl} 
              alt="Uploaded" 
            />
          </Box>
        ) : (
          <Box
            onClick={() => fileInput.current.click()}
            sx={{
              width: '400px',
              height: '300px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              border: '3px dashed rgb(204, 204, 204)',
              borderRadius: '3px',
              padding: '10px 10px',
              marginTop: '20px',
              transition: '0.3s',
              ':hover': {
                backgroundColor: '#888',
              },
              cursor: 'pointer',
            }}
          >
            <ImageOutlinedIcon sx={{ color: 'rgb(204, 204, 204)', fontSize: '8rem' }} />
          </Box>
        )}
      </Box>
      <Box sx={{ alignSelf: 'flex-start', marginTop: '20px' }}>
        <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Title <span style={{ fontWeight: 'bold' }}>*</span>
        </Typography>
        <input type="text" className={styles.nftName} placeholder='Item name' value={title} onChange={titleChange} required />
      </Box>
      <Box sx={{ alignSelf: 'flex-start', marginTop: '20px' }}>
        <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          External link
        </Typography>
        <Typography variant='caption'>
          OpenC will include a link to this URL on this item's detail page, so that users can click to learn more about it. 
          You are welcome to link to your own webpage with more details.
        </Typography>
        <input type="text" className={styles.nftName} 
          placeholder='https://yoursite.io/item/123' 
          value={externalLink} 
          onChange={externalLinkChange}/>
      </Box>
      <Box sx={{ alignSelf: 'flex-start', marginTop: '20px' }}>
        <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Description
        </Typography>
        <Typography variant='caption'>
          The description will be included on the item's detail page underneath its image. Markdown syntax is supported.
        </Typography>
        <textarea type="text" 
          className={styles.description} 
          placeholder='Provide a detailed description of your item.' 
          value={description}
          onChange={descriptionChange}/>
      </Box>
      <Box sx={{ 
        alignSelf: 'flex-start', 
        marginTop: '20px',
      }}>
        <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Category
        </Typography>
        <Typography variant='caption'>
          The description will be included on the item's detail page underneath its image. Markdown syntax is supported.
        </Typography>
        <FormControl fullWidth sx={{
          marginTop: '20px'
        }}>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Category"
            onChange={handleChange}
          >
            <MenuItem value={'all'}>All</MenuItem>
            <MenuItem value={'art'}>Art</MenuItem>
            <MenuItem value={'gaming'}>Gaming</MenuItem>
            <MenuItem value={'memberships'}>Memberships</MenuItem>
            <MenuItem value={'pfps'}>PFPs</MenuItem>
            <MenuItem value={'photography'}>Photography</MenuItem>
            <MenuItem value={'music'}>Music</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ alignSelf: 'flex-start', marginTop: '20px' }}>
        <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Price
        </Typography>
        <Typography variant='caption'>
          OpenC will include a link to this URL on this item's detail page, so that users can click to learn more about it. 
          You are welcome to link to your own webpage with more details.
        </Typography>
        <input type="number" 
          className={styles.nftName}
          placeholder='amount' 
          value={price}
          onChange={priceChange}
          required/>
      </Box>
      <Box sx={{ 
        borderBottom: '1px solid rgb(204, 204, 204)',
        width: '100%',
        margin: '20px 0'
      }}></Box>
      <Button 
        variant="contained" 
        sx={{ 
        alignSelf: 'flex-start',
        width: '120px',
        height: '50px',
        borderRadius: '15px'
        }}
        onClick={mint}
      >
        Mint
      </Button>
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className={styles.logoutModal}
      >
        <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
        <DialogContent sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <DialogContentText id="alert-dialog-description">
            {loading ? (
              <CircularProgress />
            ) : (
              message
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} sx={{ color: '#000' }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )

}

export default Create;
