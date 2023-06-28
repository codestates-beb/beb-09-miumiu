import React, { useRef } from 'react';
import { Box, Button, Card, CardMedia, Typography } from '@mui/material';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import styles from '../../assets/css/Create.module.css'

const Create = () => {
  const fileInput = useRef(null);

  const handleButtonClick = () => {
    fileInput.current.click();
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    // 여기에서 선택된 파일을 사용하십시오.
  }

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
          onChange={handleFileChange}
          accept="image/*,video/*"  // 이미지와 비디오 파일만 받아들입니다.
        />
        <Box sx={{ 
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
        }}>
          <ImageOutlinedIcon sx={{ color: 'rgb(204, 204, 204)', fontSize: '8rem' }} />
        </Box>
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
      <Button variant="contained" sx={{ alignSelf: 'flex-start' }}>Mint</Button>
    </Box>
  )

}

export default Create;
