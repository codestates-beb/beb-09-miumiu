import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import WalletIcon from '@mui/icons-material/Wallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../assets/css/Header.css';

export default function Header () {

  const [searchTerm, setSearchTerm] = useState("");

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
          <Button className="walletBtn" 
            sx={{
            color: 'white', 
            bgcolor: 'rgba(255, 255, 255, 0.2)', 
            borderRadius: '10px',
            ':hover': {bgcolor: 'rgba(255, 255, 255, 0.4)'},
            padding: '15px',
            marginRight: '10px'
            }}>
            <WalletIcon sx={{ marginRight: '10px' }}/>
            Connect Wallet
          </Button>
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
