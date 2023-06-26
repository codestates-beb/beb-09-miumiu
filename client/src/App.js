import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

import Main from './pages/Main';

import Header from './components/Header';

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
<<<<<<< HEAD
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
=======
        <main>
          <Routes>
            <Route path='/' element={<Main />} />
          </Routes>
        </main>
>>>>>>> ff15ae546a7a2b59ed15706275c7bfce98653dd7
      </div>
    </Router>
  );
}

export default App;
