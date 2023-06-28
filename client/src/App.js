import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Main from './pages/Main';
import NftCreate from './pages/NftCreate';

import Header from './components/Header';
import UserInfo from './components/MyPage/userInfo';
import Footer from './components/Footer'
import Mypage from './pages/MyPage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/create' element={<NftCreate />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
