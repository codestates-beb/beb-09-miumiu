import React from 'react';
import NftList from '../components/NftList';
import MainCategory from '../components/MainCategory';
import MainSlide from '../components/MainSlide';
import Ranking from '../components/Ranking';

export default function Main () {

  return (
    <div>
      <MainCategory />
      <MainSlide />
      <Ranking />
      <NftList />
    </div>
  )
}