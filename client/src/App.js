import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Main from './pages/Main';

import Header from './components/Header';
import UserInfo from './components/MyPage/userInfo';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/userinfo' element={<UserInfo />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
