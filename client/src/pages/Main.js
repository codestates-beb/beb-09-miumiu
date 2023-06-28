import React from 'react';
import NftList from '../components/Main/NftList';
import MainCategory from '../components/Main/MainCategory';
import MainSlide from '../components/Main/MainSlide';
import Ranking from '../components/Main/Ranking';
import styles from '../assets/css/Main.module.css'

const Main = () =>  {

  return (
    <div className={styles.mainPage}>
      <MainCategory />
      <MainSlide />
      <Ranking />
      <NftList />
    </div>
  )
}

export default Main;