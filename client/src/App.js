import React from 'react';
import './App.css';
import './assets/css/global.css'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Main from './pages/Main';
import NftCreate from './pages/NftCreate';

import Header from './components/Header';
import UserInfo from './components/MyPage/userInfo';
import Footer from './components/Footer'

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/userinfo' element={<UserInfo />} />
          <Route path='/create' element={<NftCreate />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
