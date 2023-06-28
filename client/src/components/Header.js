import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { getUserAccount } from '../Contract/Contract'
import { 
  Grid, 
  InputBase, 
  Button, 
  IconButton, 
  InputAdornment, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  Menu,
  MenuItem 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import CreateIcon from '@mui/icons-material/Create';
import LogoutIcon from '@mui/icons-material/Logout';
import Web3 from 'web3';
import styles from '../assets/css/Header.module.css'
import { makeStyles } from '@mui/styles';

const Header = () => {

  let web3 = new Web3(window.ethereum);

  const navigate = useNavigate();
  const [account, setAccount]  = useState('');        // MetaMask Address
  const [open, setOpen] = useState(false);            // Modal Open handling
  const [anchorEl, setAnchorEl] = useState(null);     // Menu Cursor Anchor
  
  const useStyles = makeStyles((theme) => ({
    menu: {
      '& .MuiMenuItem-root': {
        fontSize: '1rem', // MenuItem의 폰트 크기 변경
        padding: '10px 30px', // MenuItem의 패딩 변경
        textAlign: 'left'
      },  
    },
  }));
  const classes = useStyles();

  useEffect(() => {
    if(typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
  })

  // 메타마스크 연결
  const LoginWallet = async () => {

    // 유저 브라우저 확인
    let agent = navigator.userAgent.toLowerCase();

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log(error);
      if (window.ethereum) {
        // 메타마스크 설치가 안되어 있을 경우 설치 페이지로 이동
      } else {
        if (agent.indexOf('chrome') != -1 || agent.indexOf('msie') != -1) {         // 크롬일 경우
          window.open(`${process.env.REACT_APP_INSTALL_META_CHROME}`, '_blank');
        } else if (agent.indexOf('firefox') != -1) {                                // firefox일 경우
          window.open(`${process.env.REACT_APP_INSTALL_META_FIREFOX}`, '_blank');
        }
      }
    }
    setAccount(await getUserAccount());
  };

  /* chain, account 변화 감지 후 callback 함수 실행, return 값으로 리스너 삭제 */
  // useEffect(() => {
  //   const { ethereum } = window;

  //   if (ethereum && ethereum.on) {
  //     const handleChainChanged = () => {
  //       window.location.reload();
  //     };

  //     const handleAccountsChanged = (accounts) => {
  //       fetchAccountInfo();
  //       if (sessionStorage.getItem('logged')) {
  //         sessionStorage.clear();
  //         removeCookie('premium', { path: '/' });
  //         setDefaultVisible(!defaultVisible);
  //         setErrModalText('A metamask account change has been detected.');
  //         dispatch({ type: SET_LOGOUT });
  //         navigate('/');
  //         fetchAccountInfo();
  //       }
  //     };

  //     ethereum.on('chainChanged', handleChainChanged);
  //     ethereum.on('accountsChanged', handleAccountsChanged);

  //     return () => {
  //       if (ethereum.removeListener) {
  //         ethereum.removeListener('chainChanged', handleChainChanged);
  //         ethereum.removeListener('accountsChanged', handleAccountsChanged);
  //       }
  //     };
  //   } 
  // }, []);

  const LogoutModal = () => {
    setOpen(true);
  };

  const ModalClose = () => {
    setOpen(false);
    window.location.reload();
  };

  // 메타마스크 연결 해제
  const Logout = () => {
    setAccount(null);
    setOpen(false); // 추가된 부분
  };

  const MenuMouseOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const MenuMouseLeave = () => {
    setAnchorEl(null);
  };

  

  return (
    <div className={styles.header}>
      <Grid container spacing={3} justifyContent="space-between" alignItems="center" className={styles.gridContainer}>
        <Grid item xs={3} className={styles.logoWrap}>
          <div className={styles.logoContainer}>
            <Link to='/'>
              <img src="https://cdn.worldvectorlogo.com/logos/opensea.svg" width="40" height="40" alt="logo"  />
              <span className={styles.logoText}>Open C</span>
            </Link>
          </div>
          <div className={styles.headerBar}></div>
          <div className={styles.headerMenu}>
            <Link to='/drops' className={styles.navLink}>Drops</Link>
            <Link to='/stats' className={styles.navLink}>Stats</Link>
          </div>
        </Grid>
        <Grid item xs={6}>
          <form>
            <InputBase
              className={styles.searchInput}
              value=''
              sx={{
                color: 'white',
                borderRadius: '10px',
                padding: '10px',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                border: 'none'
              }}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton>
                    <SearchIcon sx={{ color: 'white' }} />
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Search items, collections, and accounts"
            />
          </form>
        </Grid>
        <Grid item container justifyContent={"flex-end"} xs={3} className={styles.headerUser}>
          {
            !account ? (
              <Button className={styles.walletBtn} 
                sx={{
                color: 'white', 
                bgcolor: 'rgba(255, 255, 255, 0.2)', 
                borderRadius: '10px',
                ':hover': {bgcolor: 'rgba(255, 255, 255, 0.4)'},
                padding: '15px',
                marginRight: '10px'
                }}
                onClick={LoginWallet}
                >
                <WalletIcon sx={{ marginRight: '10px' }}/>
                Connect Wallet
              </Button>
            ) : (
              <>
                <Button className={styles.walletBtn} 
                  sx={{
                  color: 'white', 
                  bgcolor: 'rgba(255, 255, 255, 0.2)', 
                  borderRadius: '10px',
                  ':hover': {bgcolor: 'rgba(255, 255, 255, 0.4)'},
                  padding: '15px',
                  marginRight: '10px'
                  }}
                  >
                  <WalletIcon sx={{ marginRight: '10px' }}/>
                  {account.slice(0, 13) + '...'}
                </Button>
                <Dialog
                  open={open}
                  onClose={ModalClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className={styles.logoutModal}
                >
                  <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to logout?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={ModalClose} sx={{ color: '#000' }}>Cancel</Button>
                    <Button onClick={Logout} autoFocus sx={{ color: 'red' }}>
                      Logout
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )
          }
          <Grid item onMouseEnter={MenuMouseOver}
              onMouseLeave={MenuMouseLeave}>
            <Button className="walletBtn" 
              sx={{
              color: 'white', 
              bgcolor: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '10px',
              ':hover': {bgcolor: 'rgba(255, 255, 255, 0.4)'},
              padding: '15px',
              }}
            >
              <AccountCircleIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              className={classes.menu}
            >
              <Link to='/mypage' onClick={async (e) => {
                  if(!account) {
                    e.preventDefault();
                    await new Promise((resolve) => {
                      alert('Connect to Wallet');
                      resolve();
                    });
                    window.location.reload();
                  }
              }}>
                <MenuItem>
                  <PersonIcon sx={{ marginRight: '10px'}} />
                  Profile
                </MenuItem>
              </Link>
              <Link to='/create' onClick={async (e) => {
                  if(!account) {
                    e.preventDefault();
                    await new Promise((resolve) => {
                      alert('Connect to Wallet');
                      resolve();
                    });
                    window.location.reload();
                  }
              }}>
                <MenuItem>
                  <CreateIcon sx={{ marginRight: '10px'}} />
                  Create
                </MenuItem>
              </Link>
              <MenuItem onClick={LogoutModal}>
                <LogoutIcon sx={{ marginRight: '10px'}} />
                Log Out
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header;
