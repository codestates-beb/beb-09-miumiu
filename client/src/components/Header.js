import React, { useState, useEffect, useCallback, useContext } from "react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { getUserAccount, getUserBalance, fromWei } from '../Contract/Contract';
import { Context } from '../Context/index';
import { SET_ACCOUNT, SET_BALANCE, SET_LOGOUT } from '../Context/ActionTypes';
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
  // cookie
  const [cookies, setCookie, removeCookie] = useCookies(['isLoggedIn']);

  let web3 = new Web3(window.ethereum);

  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);                  // Modal Open handling
  const [anchorEl, setAnchorEl] = useState(null);           // Menu Cursor Anchor
  const [isMainPage, setIsMainPage]  = useState(true);      // Main Page Check
  const [scrollPosition, setScrollPosition] = useState(0);  // Scroll Position Check

  const { state: { user }, dispatch } = useContext(Context);
  console.log('user', user);

  // 쿠키에 로그인 정보 저장
  const setLoginCookie = useCallback((account) => {
    setCookie('user', account, { path: '/' });
  }, [setCookie]);

  // 쿠키에서 로그인 정보 삭제
  const removeLoginCookie = useCallback(() => {
    removeCookie('user', { path: '/' });
  }, [removeCookie]);

  // 쿠키에 저장된 로그인 정보 확인
  useEffect(() => {
    const userCookie = cookies.user;
    if (userCookie) {
      // 쿠키에 저장된 로그인 정보가 있을 경우 상태 업데이트
      dispatch({ type: SET_ACCOUNT, payload: userCookie });
    }
  }, [cookies.user, dispatch]);

  // scroll 위치에 변경사항이 생길 시 현재 scroll 위치 저장
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* 유저 account fetching */
  const fetchAccountInfo = useCallback(async () => {
    try {
      let userAddr = await getUserAccount();
      let userBal = await getUserBalance(userAddr);
      let userBalance = Number(fromWei(userBal)).toFixed(4);

      dispatch({ type: SET_ACCOUNT, payload: userAddr });
      dispatch({ type: SET_BALANCE, payload: userBalance });

      setLoginCookie(userAddr);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    fetchAccountInfo();
  }, [fetchAccountInfo]);
  

  // 스크롤 위치 값이 30 이상일 경우
  let isScrolled = scrollPosition > 30;
  
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

  // 메타마스크 연결
  const LoginWallet = async () => {

    // 유저 브라우저 확인
    let agent = navigator.userAgent.toLowerCase();

    fetchAccountInfo();
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.log(error);
      if (!window.ethereum) {
        // 메타마스크 설치가 안되어 있을 경우 설치 페이지로 이동
        if (agent.indexOf('chrome') != -1 || agent.indexOf('msie') != -1) {         // 크롬일 경우
          window.open(`${process.env.REACT_APP_INSTALL_META_CHROME}`, '_blank');
        } else if (agent.indexOf('firefox') != -1) {                                // firefox일 경우
          window.open(`${process.env.REACT_APP_INSTALL_META_FIREFOX}`, '_blank');
        }
      }
    }
  };

  const LogoutModal = () => {
    setOpen(true);
  };

  const ModalClose = () => {
    setOpen(false);
    window.location.reload();
  };

  // 메타마스크 연결 해제
  const Logout = () => {
    setOpen(false); 
    removeLoginCookie();
    navigate('/')
    dispatch({ type: SET_LOGOUT });   // Context 상태 초기화
  };

  const MenuMouseOver = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const MenuMouseLeave = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setIsMainPage(location.pathname === '/');
  }, [location]);

  return (
    <div className={isMainPage && !isScrolled ? styles.header : `${styles.header} ${styles.otherPageHeader}`}>
      <Grid container spacing={3} justifyContent="center" alignItems="center" className={styles.gridContainer}>
        <Grid item xs={3} className={styles.logoWrap}>
          <div className={styles.logoContainer}>
            <Link to='/'>
              <img src="https://cdn.worldvectorlogo.com/logos/opensea.svg" width="40" height="40" alt="logo"  />
              <span className={isMainPage && !isScrolled ? styles.logoText : `${styles.logoText} ${styles.otherPageLogoText} ${styles.scrolledLogoText}`}>Open C</span>
            </Link>
          </div>
          <div className={isMainPage && !isScrolled ? styles.headerBar : `${styles.headerBar} ${styles.otherPage}`} ></div>
          <div className={styles.headerMenu}>
            <Link to='/drops' className={isMainPage && !isScrolled ? styles.navLink : `${styles.navLink} ${styles.otherPageNavLink}`}>Drops</Link>
            <Link to='/stats' className={isMainPage && !isScrolled ? styles.navLink : `${styles.navLink} ${styles.otherPageNavLink}`}>Stats</Link>
          </div>
        </Grid>
        <Grid item xs={6}>
          <InputBase
            type="text"
            className={isMainPage && !isScrolled ? styles.searchInput : `${styles.searchInput} ${styles.otherPageSearchInput}`}
            startAdornment={
              <InputAdornment position="start">
                <IconButton>
                  <SearchIcon className={isMainPage && !isScrolled ? styles.searchIcon : `${styles.searchIcon} ${styles.otherPageSearchIcon}`}/>
                </IconButton>
              </InputAdornment>
            }
            placeholder="Search items, collections, and accounts"
          />
        </Grid>
        <Grid item container justifyContent={"flex-end"} xs={3} className={styles.headerUser}>
          {
            !user.account ? (
              <Button className={isMainPage && !isScrolled ? styles.walletBtn : `${styles.walletBtn} ${styles.otherPageWalletBtn}`} 
                onClick={LoginWallet}
              >
                <WalletIcon sx={{ marginRight: '10px', }}/>
                Connect Wallet
              </Button>
            ) : (
              <>
                <Button className={isMainPage && !isScrolled ? styles.walletBtn : `${styles.walletBtn} ${styles.otherPageWalletBtn}`}>
                  <WalletIcon sx={{ marginRight: '10px'}}/>
                  {user.account.slice(0, 13) + '...'}
                </Button>
              </>
            )
          }
          <Grid item onMouseEnter={MenuMouseOver}
              onMouseLeave={MenuMouseLeave}>
            <Button className={isMainPage && !isScrolled ? styles.walletBtn : `${styles.walletBtn} ${styles.otherPageWalletBtn}`}>
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
                  if(!user.account) {
                    e.preventDefault();
                    await new Promise((resolve) => {
                      alert('Connect to Wallet');
                      resolve();
                    });
                  }
              }}>
                <MenuItem>
                  <PersonIcon sx={{ marginRight: '10px'}} />
                  Profile
                </MenuItem>
              </Link>
              <Link to='/create' onClick={async (e) => {
                  if(!user.account) {
                    e.preventDefault();
                    await new Promise((resolve) => {
                      alert('Connect to Wallet');
                      resolve();
                    });
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
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

export default Header;
