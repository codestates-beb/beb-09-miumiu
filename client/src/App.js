import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Main from './pages/Main';
import NftCreate from './pages/NftCreate';
import MyPage from './pages/MyPage';

import Header from './components/Header';
import Footer from './components/Footer';

function Layout() {
  const location = useLocation();
  const [isMainPage, setIsMainPage]  = useState(true);    // Main Page Check

  useEffect(() => {
    setIsMainPage(location.pathname === '/');
  }, [location]);

  return (
    <div className={isMainPage ? 'App' : `App otherApp`}>
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/create' element={<NftCreate />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;