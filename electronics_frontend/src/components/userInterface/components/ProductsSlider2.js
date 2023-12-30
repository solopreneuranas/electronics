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

export default function ProductsSlider2(props) {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const classes = useStyles();
    const theme = useTheme();
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const sliderRef = useRef(null);

    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        var response = await getData(`ui-Home/${props.api}/?categoryid=${props.categoryid}&status=${props.status}`);
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
        slidesToShow: matches_sm ? 1 : matches_md ? 2 : 4,
        slidesToScroll: matches_sm ? 1 : matches_md ? 2 : 4,
        arrows: false,
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const bannerCarousel = () => {
        return products.slice(0,18).map((item, i) => {

            var imageArray = item.picture.split(',')
            var mainImage = imageArray[0]

            var formattedProductName = `${item.brandname} ${item.productname} ${item.modelno}`

            const originalPrice = item.price;
            const offerPrice = item.offerprice;

            const percentageDiscount = Math.floor(((originalPrice - offerPrice) / originalPrice) * 100)

            return (
                <div>
                    <div style={{ background: '#383838', borderRadius: 15, padding: '8% 5% 4%', margin: '8px', height: matches_md ? '100%' : 350, position: 'relative' }}>
                        {props.saleStatus ?
                            <div style={{ position: 'absolute', zIndex: 99, background: '#12DAA8', color: 'white', padding: '1% 6%', left: 0, top: 0, borderRadius: '15px 0 3px 0' }}>SALE</div>
                            : <></>}
                        <center>
                            <h3 style={{ fontWeight: 500, fontSize: 22, margin: '3% 0' }}>{formattedProductName.substring(0,40)}...</h3>
                            <hr style={{ width: '50%', margin: 'auto', opacity: '70%' }} />
                            <h3 style={{ fontWeight: 500, fontSize: 25, margin: '3% 0' }}>Up to <span style={{ fontWeight: 700 }}>{percentageDiscount}%</span> Off</h3>
                            <img src={`${serverURL}/images/${mainImage}`} style={{ width: '70%', height: '70%' }} />
                        </center>
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