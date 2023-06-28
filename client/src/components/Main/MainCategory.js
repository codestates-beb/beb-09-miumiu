import React from 'react';
import { 
  Button, 
  Grid, 
} from "@mui/material";
import styles from '../../assets/css/MainCategory.module.css'


const MainCategory = () => {
  const categories = ['All', 'Art', 'Gaming', 'Memberships', 'PFPs', 'Photography', 'Music']; 

  const handleCategoryClick = (category) => {
    // 카테고리 버튼 클릭 시 처리할 로직 작성
    console.log(`Clicked category: ${category}`);
  };


  return (
    <>
      <Grid container spacing={2} sx={{ marginTop: '20px' }}>
        {categories.map((category) => (
          <Grid item key={category}>
            <Button variant="outlined" className={styles.categoryBtn} onClick={() => handleCategoryClick(category)}>
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default MainCategory;