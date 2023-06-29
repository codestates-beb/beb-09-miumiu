import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { 
    Card,
    CardMedia,
    CardContent,
  } from "@mui/material";
import image1 from "../../assets/images/dummy1.jpeg";
import styles from '../../assets/css/Item.module.css';

const Item = () => {
    return (
        <div className={styles.itemContainer}>
            <p className={styles.title}>Collected</p>
            <div className={styles.borderBottom}></div>
            <div className={styles.nftContainer}>
                <Card sx={{ maxWidth: '300px', borderRadius: '20px' }} className={styles.nft}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={image1}
                        title="green iguana"
                        />
                    <CardContent>
                        <div>
                            <p className={styles.cardTitle}>test</p>
                        </div>
                        <div className='cardContent'>
                            <div className={styles.cardFloor}>
                                <p>Floor</p>
                                <p>12 ETH</p>
                            </div>
                            <div className={styles.cardTotal}>
                                <p>Total Volume</p>
                                <p>23 ETH</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: '250px', borderRadius: '20px' }} className={styles.nft}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={image1}
                        title="green iguana"
                        />
                    <CardContent>
                        <div>
                            <p className={styles.cardTitle}>test</p>
                        </div>
                        <div className='cardContent'>
                            <div className={styles.cardFloor}>
                                <p>Floor</p>
                                <p>12 ETH</p>
                            </div>
                            <div className={styles.cardTotal}>
                                <p>Total Volume</p>
                                <p>23 ETH</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: '250px', borderRadius: '20px' }} className={styles.nft}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={image1}
                        title="green iguana"
                        />
                    <CardContent>
                        <div>
                            <p className={styles.cardTitle}>test</p>
                        </div>
                        <div className='cardContent'>
                            <div className={styles.cardFloor}>
                                <p>Floor</p>
                                <p>12 ETH</p>
                            </div>
                            <div className={styles.cardTotal}>
                                <p>Total Volume</p>
                                <p>23 ETH</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: '250px', borderRadius: '20px' }} className={styles.nft}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={image1}
                        title="green iguana"
                        />
                    <CardContent>
                        <div>
                            <p className={styles.cardTitle}>test</p>
                        </div>
                        <div className='cardContent'>
                            <div className={styles.cardFloor}>
                                <p>Floor</p>
                                <p>12 ETH</p>
                            </div>
                            <div className={styles.cardTotal}>
                                <p>Total Volume</p>
                                <p>23 ETH</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card sx={{ maxWidth: '250px', borderRadius: '20px' }} className={styles.nft}>
                    <CardMedia
                        sx={{ height: 140 }}
                        image={image1}
                        title="green iguana"
                        />
                    <CardContent>
                        <div>
                            <p className={styles.cardTitle}>test</p>
                        </div>
                        <div className='cardContent'>
                            <div className={styles.cardFloor}>
                                <p>Floor</p>
                                <p>12 ETH</p>
                            </div>
                            <div className={styles.cardTotal}>
                                <p>Total Volume</p>
                                <p>23 ETH</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
};

// const Item = (props) => {
//     const [collectionName, setCollectionName] = useState('');
//     useEffect(() => {
//         const apiUrl = 'http://localhost:8080/api/collection/info';
//         axios
//         .put(apiUrl, { contractAddress: props.contractAddress })
//         .then((res) => {
//             setCollectionName(res.data.content.collectionName);
//         });
//     }, []);
//     const onClickHandler = () => {
//         window.location.replace('http://localhost:3000');
//     };
//     const JSONmetadata = props.JSONmetadata;
//     const metadata = JSON.parse(JSONmetadata);
//     return (
//         <div key={props.className} id="id_div" onClick={onClickHandler}>
//             <img src={metadata.image} id="item_img" alt="item img"></img>
//             <p id="item_name">{metadata.name}</p>
//             <p id="item_collection">{collectionName}</p>
//         </div>
//     );
// };

export default Item;