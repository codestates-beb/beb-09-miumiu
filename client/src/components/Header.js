import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
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
  DialogTitle 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Web3 from 'web3';
import '../assets/css/Header.css';

export default function Header () {
  let web3;
  if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.ethereum);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [account, setAccount]  = useState('');
  const [open, setOpen] = useState(false); // 추가된 부분

  useEffect(() => {
    if(typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    }
  })

  const LoginWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Logout = () => {
    setAccount(null);
    setOpen(false); // 추가된 부분
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault(); // Prevents page refresh
    console.log("Search submitted: ", searchTerm);
    // Here you can add the function to perform the search
  }

  return (
    <div className="header">
      <Grid container spacing={3} justifyContent="space-between" alignItems="center" className="gridContainer">
        <Grid item xs={3} className="logoWrap">
          <div className="logoContainer">
            <Link to='/'>
              <img src="https://cdn.worldvectorlogo.com/logos/opensea.svg" width="40" height="40" alt="logo"  />
              <span className="logoText">Open C</span>
            </Link>
          </div>
          <div className="headerBar"></div>
          <div className="headerMenu">
            <Link to='/drops' className="navLink">Drops</Link>
            <Link to='/stats' className="navLink">Stats</Link>
          </div>
        </Grid>
        <Grid item xs={6}>
          <form onSubmit={handleSearchSubmit}>
            <InputBase
              className="searchInput"
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                color: 'white',
                borderRadius: '10px',
                padding: '10px',
                bgcolor: 'rgba(255, 255, 255, 0.2)',
                border: 'none'
              }}
              startAdornment={
                <InputAdornment position="start">
                  <IconButton onClick={handleSearchSubmit}>
                    <SearchIcon sx={{ color: 'white' }} />
                  </IconButton>
                </InputAdornment>
              }
              placeholder="Search items, collections, and accounts"
            />
          </form>
        </Grid>
        <Grid item container justifyContent={"flex-end"} xs={3} className="headerUser">
          {
            !account ? (
              <Button className="walletBtn" 
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
                <Button className="walletBtn" 
                  sx={{
                  color: 'white', 
                  bgcolor: 'rgba(255, 255, 255, 0.2)', 
                  borderRadius: '10px',
                  ':hover': {bgcolor: 'rgba(255, 255, 255, 0.4)'},
                  padding: '15px',
                  marginRight: '10px'
                  }}
                  onClick={handleClickOpen}
                  >
                  <WalletIcon sx={{ marginRight: '10px' }}/>
                  {account.slice(0, 13) + '...'}
                </Button>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">{"Confirm Logout"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you want to logout?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={Logout} autoFocus>
                      Logout
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )
          }
          <Grid item>
            <Button className="walletBtn" 
              sx={{
              color: 'white', 
              bgcolor: 'rgba(255, 255, 255, 0.2)', 
              borderRadius: '10px',
              ':hover': {bgcolor: 'rgba(255, 255, 255, 0.4)'},
              padding: '15px',
              }}>
              <AccountCircleIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}
