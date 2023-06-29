import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Provider } from './Context/index'
import './App.css';

import Main from './pages/Main';
import NftCreate from './pages/NftCreate';
import MyPage from './pages/MyPage';
import NftDetail from './pages/NftDetail';

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
        <Route path='/detail/:id' element={<NftDetail />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Provider>
  );
}

export default App;