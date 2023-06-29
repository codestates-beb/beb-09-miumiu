import React, { useRef, useState } from 'react';
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
import styles from '../../assets/css/Create.module.css'

const Create = () => {
  const fileInput = useRef(null);
  const [category, setCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);    // Modal Open handling
  const [errorMessage, setErrorMessage] = useState("");
  const [checkFile, setCheckFile] = useState(0);            // 비디오(1)인지 이미지(0)인지 체크
  const [nftItem, setNftItem] = useState(null);
  const [nftItemUrl, setNftItemUrl] = useState(null);

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
          setErrorMessage("File type is not supported. Please upload a PNG, JPG, JPEG, GIF, MP4, or MKV file.");
          setIsModalOpen(true);
        }
      }
    }
  }

  console.log('nftItem', nftItem);
  console.log('url', nftItemUrl);

  const closeModal = () => {
    setIsModalOpen(false);
    setErrorMessage("");
  };

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  
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
          Name <span style={{ fontWeight: 'bold' }}>*</span>
        </Typography>
        <input type="text" className={styles.nftName} placeholder='Item name'/>
      </Box>
      <Box sx={{ alignSelf: 'flex-start', marginTop: '20px' }}>
        <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          External link
        </Typography>
        <Typography variant='caption'>
          OpenC will include a link to this URL on this item's detail page, so that users can click to learn more about it. 
          You are welcome to link to your own webpage with more details.
        </Typography>
        <input type="text" className={styles.nftName} placeholder='https://yoursite.io/item/123'/>
      </Box>
      <Box sx={{ alignSelf: 'flex-start', marginTop: '20px' }}>
        <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Description
        </Typography>
        <Typography variant='caption'>
          The description will be included on the item's detail page underneath its image. Markdown syntax is supported.
        </Typography>
        <textarea type="text" className={styles.description} placeholder='Provide a detailed description of your item.'/>
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
          Supply
        </Typography>
        <Typography variant='caption'>
          The number of items that can be minted.
        </Typography>
        <input type="number" className={styles.nftName} placeholder='Amount'/>
      </Box>
      <Box sx={{ alignSelf: 'flex-start', marginTop: '20px' }}>
        <Typography variant='body2' sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
          Price
        </Typography>
        <Typography variant='caption'>
          OpenC will include a link to this URL on this item's detail page, so that users can click to learn more about it. 
          You are welcome to link to your own webpage with more details.
        </Typography>
        <input type="number" className={styles.nftName} placeholder='https://yoursite.io/item/123'/>
      </Box>
      <Box sx={{ 
        borderBottom: '1px solid rgb(204, 204, 204)',
        width: '100%',
        margin: '20px 0'
      }}></Box>
      <Button variant="contained" sx={{ 
        alignSelf: 'flex-start',
        width: '120px',
        height: '50px',
        borderRadius: '15px'
      }}>
        Mint
      </Button>
      <Dialog
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Error"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMessage}
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
