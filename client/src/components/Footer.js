import React from 'react';
import { Container, Grid, Link, Typography, Box, InputBase, InputAdornment, IconButton, Button } from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import styles from '../assets/css/Footer.module.css';

const Footer = () => {

  return (
    <Box 
      component="footer" 
      sx={{
        backgroundColor: 'rgb(24, 104, 183)',
        padding: 6,
        paddingBottom: 0,
        height: 350,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '50px'
      }}
    >
      <Container maxWidth={100}>
        <Grid container spacing={2} justifyContent="space-between" sx={{
          width: '90%',
        }}>
          <Grid item xs={4} sm={4}>
            <Typography variant="h5" color="white" gutterBottom sx={{ fontWeight: 'bold' }}>
              Stay in the loop
            </Typography>
            <Typography variant="subtitle1" color="white" component="p">
              Join our mailing list to stay in the loop with our newest feature release, NFT drops, and tips and tricks for navigating OpenC.
            </Typography>
            <Grid item xs={12} sx={{ marginTop: '20px'}}>
              <form style={{ display: 'flex', alignItems: 'center' }}>
                <InputBase
                  className={styles.searchInput}
                  value=''
                  sx={{
                    color: '#222',
                    borderRadius: '10px',
                    padding: '10px',
                    bgcolor: 'white',
                    border: 'none',
                    width: '570px'
                  }}
                  placeholder="Your email address"
                />
                <Button type="submit" sx={{
                  width: '150px',
                  height: '60px',
                  bgcolor: 'rgb(32, 129, 226)',
                  color: 'white',
                  borderRadius: '20px',
                  marginLeft: '20px'
                }}>
                  Sign up
                </Button>
              </form>
            </Grid>
          </Grid>
          <Grid item xs={6} sm={3} justifyContent={'flex-start'}>
            <Typography variant="h5" color="white" gutterBottom sx={{ fontWeight: 'bold' }}>
              Join the community
            </Typography>
            <Grid container direction="row" spacing={2} sx={{ marginTop: '20px'}}>
              <Grid item className={styles.footerIcon}>
                <TwitterIcon sx={{ color: 'white', fontSize: 30 }} />
              </Grid>
              <Grid item className={styles.footerIcon}>
                <InstagramIcon sx={{ color: 'white', fontSize: 30 }} />
              </Grid>
              <Grid item className={styles.footerIcon}>
                <GitHubIcon sx={{ color: 'white', fontSize: 30 }} />
              </Grid>
              <Grid item className={styles.footerIcon}>
                <YouTubeIcon sx={{ color: 'white', fontSize: 30 }} />
              </Grid>
              <Grid item className={styles.footerIcon}>
                <MailOutlineIcon sx={{ color: 'white', fontSize: 30 }} />
              </Grid>
            </Grid>
          </Grid>
          {/* 추가적인 컬럼들을 여기에 추가 */}
        </Grid>
      </Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-end',
          padding: 2,
          color: 'white',
          marginTop: '30px'
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>
          Copyright © 2023 BEB-09-MiuMiu
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer;