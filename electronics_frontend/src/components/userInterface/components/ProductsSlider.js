import React, { useRef, useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData } from '../../../services/FetchNodeServices';
import useStyles from '../components/screens/ProjectCSS';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';

export default function ProductsSlider(props) {

    var navigate = useNavigate()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [value, setValue] = useState(5);
    const classes = useStyles();
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const sliderRef = useRef(null);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        var response = await getData(`ui-Home/${props.api}/?status=${props.status}&categoryid=${props.categoryid}&brandid=${props.brandid}`);
        setProducts(response.data);

    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const settings = {
        dots: false,
        infinite: false,
        speed: matches_md ? 500 : 1500,
        focusOnSelect: false,
        autoplay: false,
        slidesToShow: matches_sm ? 1 : matches_md ? 2 : props.slides,
        slidesToScroll: matches_sm ? 1 : matches_md ? 2 : props.slides,
        arrows: false
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const rating = () => {
        return (
            <Box
                sx={{
                    '& > legend': { mt: 2 },
                }}
            >
                <Rating name="read-only" value={value} readOnly style={{ color: '#12DAA8' }} />
            </Box>
        )
    }

    const handleProductClick = (item) => {
        var staticURL = `${item.brandname} ${item.productname} ${item.modelno} ${item.color}`
        var staticURLArray = staticURL.split(' ')
        var dynamicURL = staticURLArray.join('-').toLowerCase()
        window.scrollTo(0, 0);
        navigate(`/product/?${dynamicURL}`, { state: { product: item } });
    }

    const bannerCarousel = () => {
        return products.slice(0, 18).map((item, i) => {

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
            var formattedProductName = `${item.brandname} ${item.productname} ${item.modelno}`

            return (
                <div key={i}>
                    <div onClick={() => handleProductClick(item)} style={{ background: '#121212', cursor: 'pointer', borderRadius: 15, padding: '8% 5% 4%', margin: '12px', height: matches_md ? '100%' : 410, position: 'relative' }}>
                        <div className={classes.like_button_div}>
                            <Checkbox {...label} icon={<FavoriteBorder style={{ color: 'white', width: 30, height: 30 }} />}
                                checkedIcon={<Favorite style={{ color: '#12DAA9', width: 30, height: 30 }} />}
                            />
                        </div>
                        <center>
                            <img src={`${serverURL}/images/${mainImage}`} style={{ width: '80%', height: '80%', marginBottom: '10%' }} />
                        </center>
                        <h3 style={{ fontWeight: 500, fontSize: 22, margin: '3% 0' }}>{formattedProductName.substring(0, 35)}...</h3>
                        <h3 style={{ fontWeight: 500, fontSize: 28, margin: '3% 0' }}>
                            {formattedOfferPrice}
                            <s style={{ fontSize: 20, opacity: '70%', marginLeft: '3%', fontWeight: 400 }}>
                                {formattedPrice}
                            </s>
                        </h3>
                        {rating()}
                    </div>
                </div>
            );
        });
    };

    return (
        <div style={{ padding: matches_md ? '2%' : '1% 7%', position: 'relative', margin: '2% 0' }}>
            <h3 style={{ fontWeight: 500, fontSize: 30, margin: 0, marginBottom: '1%' }}>{props.title}</h3>
            <ArrowBackIosIcon
                onClick={handlePrev}
                style={{ display: matches_md ? 'none' : 'block', position: 'absolute', zIndex: 99, top: '40%', left: matches_md ? '3%' : '5%', cursor: 'pointer' }}
            />
            <Slider ref={sliderRef} {...settings}>
                {bannerCarousel()}
            </Slider>
            <ArrowForwardIosIcon
                onClick={handleNext}
                style={{ display: matches_md ? 'none' : 'block', position: 'absolute', zIndex: 99, top: '40%', right: matches_md ? '3%' : '5%', cursor: 'pointer' }}
            />
        </div>
    );
}