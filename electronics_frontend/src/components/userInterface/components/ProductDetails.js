import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData, postData } from '../../../services/FetchNodeServices';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Button, Grid, setRef } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import { makeStyles } from '@mui/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { useNavigate } from 'react-router-dom';
import parse from 'html-react-parser';
import BuyButtons from './BuyButtons';
import ProductAccordians from './ProductAccordians';
import ProductBreadcrumbs from './ProductBreadcrumbs';
import ProductImagesMobileSlider from './ProductImagesMobileSlider';
import ProductMainImage from './ProductMainImage';
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux';
import ProductModels from './ProductModels';

var useStyles = makeStyles({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center'
    },
    right: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center'
    }
})

export default function ProductDetails(props) {

    var dispatch = useDispatch()
    const navigate = useNavigate()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [value, setValue] = useState(5);
    const classes = useStyles();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const sliderRef = useRef(null);
    // const [product, setProduct] = useState(props.product)
    var product = props.product
    const imageArray = product.picture.split(',')
    const [mainImage, setMainImage] = useState(imageArray[0]);
    var myCart = useSelector(state => state.cart)
    var keys = Object.keys(myCart)
    const [refresh, setRefresh] = useState(false)

    if (keys.length == 0) {
        product['qty'] = 0
    }
    else {
        if (keys.includes(product.productdetailsid + "")) {
            product = myCart[product.productdetailsid + ""]
        }
        else {
            product['qty'] = 0
        }
    }

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        focusOnSelect: false,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        vertical: matches_md ? false : true,
        verticalSwiping: matches_md ? false : true,
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const rating = () => {
        return (
            <Box>
                <Rating name="read-only" value={value} readOnly style={{ color: '#12DAA8' }} />
            </Box>
        )
    }

    const handleQtyChange = (value) => {
        product['qty'] = value
        dispatch({ type: 'ADD_PRODUCT', payload: [product.productdetailsid, product] })
        props.setRefresh(!props.refresh)
    }

    const productDetails = () => {
        const handleImageClick = (item, i) => {
            setMainImage(item);
        };
        const imageCarousel = () => {
            return (
                imageArray.map((item, i) => {
                    const isImageSelected = mainImage === item;
                    return (
                        <div style={{ height: '100%', width: '100%' }}>
                            <div onMouseEnter={() => handleImageClick(item)} style={{ border: isImageSelected ? '1px solid #00E9BF' : '1px solid gray', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '5%', borderRadius: 5, height: 100, width: 100 }}>
                                <img src={`${serverURL}/images/${item}`} style={{ width: '80%', height: '80%', cursor: 'pointer' }} />
                            </div>
                        </div>
                    )
                })
            )
        };

        const formattedOfferPrice = product.offerprice.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        });

        const formattedPrice = product.price.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        });

        const originalPrice = product.price;
        const offerPrice = product.offerprice;
        const discount = originalPrice - offerPrice
        const percentageDiscount = Math.floor(((originalPrice - offerPrice) / originalPrice) * 100)
        var stockStatus = ''
        var stockColor = ''

        if (product.stock == 0) {
            stockStatus = 'Out of Stock'
            stockColor = '#CC0C39'
        }
        else {
            stockStatus = 'In Stock'
            stockColor = '#008a00'
        }

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const date = new Date()
        const laterDate = new Date();
        laterDate.setDate(date.getDate() + 7);
        const month = laterDate.getMonth()
        const monthDate = laterDate.getDate()
        var formattedMonthDate = ''
        var lastDigitOfMonthDate = monthDate.toString().charAt(monthDate.toString().length - 1)

        if (lastDigitOfMonthDate == 1) {
            formattedMonthDate = monthDate + 'st'
        }
        else if (lastDigitOfMonthDate == 2) {
            formattedMonthDate = monthDate + 'nd'
        }
        else if (lastDigitOfMonthDate == 3) {
            formattedMonthDate = monthDate + 'rd'
        }
        else {
            formattedMonthDate = monthDate + 'th'
        }

        const day = laterDate.getDay()
        const deliveryDate = `${daysOfWeek[day].substring(0, 3)}, ${formattedMonthDate} ${months[month].substring(0, 3)}`
        return (
            <div>
                <Grid container spacing={1} style={{ margin: 0, padding: '2%', width: '100%', borderBottom: '1px solid #353535', display: 'flex', justifyContent: 'center', alignItems: 'start' }}>
                    {matches_md ? <></> :
                        <Grid item md={12} style={{ margin: '0 0 3%', display: 'flex', flexDirection: 'row' }}>
                            <ProductBreadcrumbs
                                brandid={product.brandid}
                                brandname={product.brandname}
                                categoryid={product.categoryid}
                                categoryname={product.categoryname}
                                productname={product.productname}
                            />
                        </Grid>
                    }
                    <Grid item md={6} style={{ position: matches_md ? 'relative' : 'sticky', top: '20%' }}>
                        <Grid container spacing={1} style={{ margin: 0 }}>
                            {matches_md ? <></> :
                                <Grid item md={2} style={{ paddingLeft: 0, width: '100%' }}>
                                    <div style={{ position: 'relative' }}>
                                        <KeyboardArrowUpIcon
                                            onClick={handlePrev}
                                            style={{ display: imageArray.length <= 4 ? 'none' : 'block', color: 'white', position: 'absolute', zIndex: 99, top: '-50', left: '25%', cursor: 'pointer', height: 50, width: 50 }}
                                        />
                                    </div>
                                    <div style={{ padding: '2%', height: 'fit-content', width: '100%' }}>
                                        <Slider ref={sliderRef} {...settings}>
                                            {imageCarousel()}
                                        </Slider>
                                    </div>

                                    <div style={{ position: 'relative' }}>
                                        <KeyboardArrowDownIcon
                                            onClick={handleNext}
                                            style={{ display: imageArray.length <= 4 ? 'none' : 'block', color: 'white', position: 'absolute', zIndex: 99, bottom: '-40', left: '25%', cursor: 'pointer', height: 50, width: 50 }}
                                        />
                                    </div>
                                </Grid>
                            }
                            <Grid item md={10}>
                                <ProductMainImage picture={product.picture} mainImage={mainImage} />
                                {matches_md ?
                                    <ProductImagesMobileSlider picture={product.picture} setMainImage={setMainImage} mainImage={mainImage} />
                                    : <></>
                                }
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item md={6} style={{ paddingLeft: matches_md ? 0 : '2%', paddingTop: 0, width: '100%' }}>
                        <h3 style={{ fontWeight: 500, fontSize: matches_sm ? 20 : 30, margin: 0 }}>{`${product.brandname} ${product.productname} ${product.modelno} ${product.color}`}</h3>
                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: '2%', margin: '3% 0', alignItems: 'center' }}>
                            <span style={{ minWidth: '100px', display: 'inline-block', marginBottom: '0 0 1%', border: '1px solid #FF02B9', borderRadius: 5, padding: '1% 2%', fontSize: 16, fontWeight: 600, color: '#FF02B9' }}>
                                <center>{product.status}</center>
                            </span>
                            <span style={{ fontSize: 19, color: stockColor, fontWeight: 600, display: 'flex', alignItems: 'center', width: '100%' }}>
                                <FiberManualRecordIcon style={{ height: 15, width: 15, marginRight: '1%' }} />{stockStatus}
                            </span>
                        </div>
                        <p style={{ display: 'block', margin: '0.5% 0', fontSize: 17, fontWeight: 400, opacity: '100%', color: '#12DAA4' }}>
                            4.8 (193 Ratings & 185 Reviews) {rating()}
                        </p>
                        <h3 style={{ fontWeight: 500, fontSize: 35, margin: '1% 0 0' }}>
                            {formattedOfferPrice}
                        </h3>
                        <span>(Incl. all Taxes)</span>
                        <div style={{ fontSize: 18, opacity: '100%', fontWeight: 400, margin: 0 }}>
                            <font style={{ opacity: '70%' }}>MRP:</font> &nbsp;
                            <s style={{ fontSize: 18, opacity: '70%', fontWeight: 400 }}>
                                {formattedPrice}
                            </s>
                            <p style={{ display: 'inline-block', fontSize: 18, fontWeight: 400, margin: '0 2%', opacity: '70% ' }}>
                                {`(Save ₹${discount})`}
                            </p>
                            <p style={{ display: 'inline-block', border: '1px solid gray', borderRadius: 5, padding: '1% 2%', fontSize: 18, fontWeight: 600, margin: '2% 0' }}>
                                {percentageDiscount}% Off
                            </p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', width: '80%', flexWrap: 'wrap', alignContent: 'flex-start' }}>
                            <h4 style={{ fontWeight: 500, margin: 0 }}>Model:</h4>
                            <div>
                                <ProductModels product={product} setProduct={props.setProduct} setMainImage={setMainImage} />
                            </div>
                        </div><br />
                        <div style={{ display: 'flex', width: '100%', margin: '2% 0 6%', alignItems: 'center' }}>
                            <BuyButtons onChange={handleQtyChange} product={product} setRefresh={setRefresh} refresh={refresh} screen='product' buttonBg='#00E9BF' border='none' color='black'/>
                        </div>
                        <div style={{ width: '100%', margin: matches_md ? '10% 0' : 0 }}>
                            <p style={{ margin: '1% 0 2%', opacity: '70%', fontWeight: 400, fontSize: 15 }}>Secure Payment with: </p>
                            <div style={{ flexDirection: 'row', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start', width: '100%', margin: '5% 0', gap: '3%', justifyContent: 'start', margin: 0, padding: 0 }}>
                                <img src='https://cdn1.avada.io/boost-sales/visa.svg' style={{ width: 80, margin: '2% 0' }} />
                                <img src='https://cdn1.avada.io/boost-sales/mastercard.svg' style={{ width: 80, margin: '2% 0' }} />
                                <img src='https://cdn1.avada.io/boost-sales/paypal.svg' style={{ width: 80, margin: '2% 0' }} />
                                <img src='https://cdn1.avada.io/boost-sales/americanexpress.svg' style={{ width: 80, borderRadius: 5, margin: '2% 0' }} />
                                <img src='https://cdn1.avada.io/boost-sales/stripe-pay.svg' style={{ width: 80, margin: '2% 0' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'left', margin: '4% 0', fontSize: 13, fontWeight: 400, opacity: '100%', background: '#353535', borderRadius: 10, padding: '2%' }}>
                            <LocationOnIcon style={{ marginRight: '1%' }} /> Delivery within 7 days<br />
                            Will be delivered by {deliveryDate}
                        </div>
                        <div style={{ padding: '3%', border: '1px solid gray', borderRadius: 10, fontSize: 18, fontWeight: 400, opacity: '100%' }}>
                            {parse(product.description)}
                        </div><br />
                        <hr />
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <VerifiedUserOutlinedIcon style={{ marginRight: '1%' }} /><h3 style={{ fontWeight: 600, fontSize: '20px' }}>ZipCare Protection Plan</h3>
                            <p style={{ marginLeft: '2%' }}>Add extra protection to your products.</p>
                        </div>
                        <hr style={{ opacity: '40%' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}>
                            <h3 style={{ fontWeight: 600, fontSize: '20px' }}>Extended Warranty</h3>
                            <p style={{ fontSize: '13px', margin: '0 0 2%' }}>
                                Extended protection for your device beyond the manufacturer warranty with coverage against all manufacturing defects.
                            </p>
                        </div>
                        <hr />
                    </Grid>
                </Grid>

                <Grid container spacing={1} style={{ width: '100%', margin: 0 }}>
                    <Grid item md={12} style={{ width: '100%' }}>
                        <ProductAccordians product={product} description={product.description} color={product.color} categoryname={product.categoryname} modelno={product.modelno} brandname={product.brandname} productname={product.productname} hsncode={product.hsncode} />
                    </Grid>
                </Grid>
            </div >
        );

    };

    return (
        <div style={{ padding: matches_md ? '2%' : '0 8%' }}>
            <Grid container spacing={1}>
                <Grid item md={12} style={{ padding: matches_md ? '5% 1%' : '0 1%', width: '100%' }}>
                    {productDetails()}
                </Grid>
            </Grid>
        </div>
    );
}