import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData } from '../../../services/FetchNodeServices';
import useStyles from '../components/screens/ProjectCSS';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Filters from './Filters';
import FiltersMobile from './FiltersMobile';

export default function AllProducts() {

    var navigate = useNavigate()
    var location = useLocation()
    //const [products, setProducts] = useState(location?.state?.result)
    var products = location?.state?.result
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [value, setValue] = useState(5);
    const classes = useStyles();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const rating = () => {
        return (
            <Box>
                <Rating name="read-only" value={value} readOnly style={{ color: '#12DAA8' }} />
            </Box>
        )
    }

    const handleProductClick = (item) => {
        var staticURL = `${item.brandname} ${item.productname} ${item.modelno} ${item.color}`
        var staticURLArray = staticURL.split(' ')
        var dynamicURL = staticURLArray.join('-').toLowerCase()
        navigate(`/product/?${dynamicURL}`, { state: { product: item } });
        window.scrollTo(0, 0);
    }

    const allProducts = () => {
        return products.map((item, i) => {

            var imageArray = item.picture.split(',')
            var mainImage = imageArray[0]

            const formattedOfferPrice = item.offerprice.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
            });

            const formattedPrice = item.price.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
            });

            const originalPrice = item.price;
            const offerPrice = item.offerprice;

            const discount = originalPrice - offerPrice

            const percentageDiscount = Math.floor(((originalPrice - offerPrice) / originalPrice) * 100)

            return (
                <div key={i}>
                    <Grid container spacing={1} style={{ padding: matches_md ? '10% 2%' : '1% 2%', width: 'auto', borderBottom: '1px solid #353535', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                        {matches_md ? <div className={classes.like_button_div}>
                            <Checkbox {...label} icon={<FavoriteBorder style={{ color: 'white', width: 30, height: 30 }} />}
                                checkedIcon={<Favorite style={{ color: '#12DAA9', width: 30, height: 30 }} />}
                            />
                        </div> : <></>}

                        <Grid item md={3} onClick={() => handleProductClick(item)} style={{ cursor: 'pointer' }}>
                            <center><img src={`${serverURL}/images/${mainImage}`} style={{ width: matches_sm ? '80%' : '110%', height: matches_sm ? '80%' : '110%' }} /></center>
                        </Grid>
                        <Grid item md={8} style={{ paddingLeft: '5%' }}>
                            <h3 onClick={() => handleProductClick(item)} style={{ fontWeight: 500, fontSize: matches_md ? 20 : 25, margin: '3% 0', cursor: 'pointer' }}>{`${item.brandname} ${item.modelno} ${item.productname}`}</h3>

                            <p style={{ display: 'inline-block', margin: '0.5% 0', border: '1px solid #FF02B9', borderRadius: 5, padding: '1% 2%', fontSize: 16, fontWeight: 600, color: '#FF02B9' }}>
                                {item.status}
                            </p>

                            <p style={{ display: 'block', margin: '0.5% 0', fontSize: matches_md ? 16 : 18, fontWeight: 400, opacity: '100%', color: '#12DAA4' }}>
                                4.8 (193 Ratings & 185 Reviews) {rating()}
                            </p>

                            <h3 style={{ fontWeight: 500, fontSize: 32, margin: '2% 0 0' }}>
                                {formattedOfferPrice}
                            </h3>

                            <span>(Incl. all Taxes)</span>

                            <div style={{ fontSize: matches_md ? 18 : 20, opacity: '100%', fontWeight: 400, margin: '1% 0' }}>
                                <font style={{ opacity: '70%' }}>MRP:</font> &nbsp;
                                <s style={{ fontSize: matches_md ? 18 : 20, opacity: '70%', fontWeight: 400 }}>
                                    {formattedPrice}
                                </s>

                                <p style={{ display: 'inline-block', fontSize: matches_md ? 18 : 20, fontWeight: 400, margin: '0 2%', opacity: '70% ' }}>
                                    {`(Save ₹${discount})`}
                                </p>

                                <p style={{ display: 'inline-block', border: '1px solid gray', borderRadius: 5, padding: '1% 2%', fontSize: matches_md ? 18 : 20, fontWeight: 600, margin: '2% 0' }}>
                                    {percentageDiscount}% Off
                                </p>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'left', margin: '2% 0', fontSize: matches_md ? 16 : 18, fontWeight: 400, opacity: '100%' }}>
                                <LocationOnIcon /> Delivery within 7 days
                            </div>
                        </Grid>
                        {matches_md ? <></> : <Grid item md={1} style={{ position: 'relative' }}>
                            <div className={classes.like_button_div}>
                                <Checkbox {...label} icon={<FavoriteBorder style={{ color: 'white', width: 30, height: 30 }} />}
                                    checkedIcon={<Favorite style={{ color: '#12DAA9', width: 30, height: 30 }} />}
                                />
                            </div>
                        </Grid>}

                    </Grid>
                </div >
            );
        });
    };


    return (
        <div style={{ padding: matches_md ? '2% 0' : '2% 8%', margin: '1% 0' }}>
            <Grid container spacing={1}>
                {matches_md ?
                    <>
                        <Grid item md={3} style={{ width: '100%', marginBottom: '5%', position: 'sticky', top: '21%', zIndex: 999 }}>
                            <div style={{ width: '100%' }}>
                                <FiltersMobile />
                            </div>
                        </Grid>
                    </> :
                    <Grid item md={3} style={{ borderRight: '1px solid #353535', padding: '1%' }}>
                        <div>
                            <Filters />
                        </div>
                    </Grid>}
                <Grid item md={9} style={{ padding: '0 1%' }}>
                    {allProducts()}
                </Grid>
            </Grid>
        </div>
    );
}