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
import { useNavigate } from 'react-router-dom';

export default function BrandsSlider() {

    const navigate = useNavigate()

    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const sliderRef = useRef(null);

    const [brands, setBrands] = useState([]);

    const fetchBrands = async () => {
        var response = await getData('ui-Home/fetch_brands');
        setBrands(response.data);

    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        speed: matches ? 500 : 1500,
        focusOnSelect: false,
        autoplay: false,
        slidesToShow: matches ? 2 : 7,
        slidesToScroll: matches ? 2 : 7,
        arrows: false,
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const handleBrandClick = (brandid, brandname) => {
        var staticURL = brandname
        var staticURLArray = staticURL.split(' ')
        var dynamicURL = staticURLArray.join('-').toLowerCase()

        navigate(`/brand/?${dynamicURL}`, { state: { brandid: brandid, brandname: brandname } });
    }

    const bannerCarousel = () => {
        return brands.map((item, i) => (
            <div>
                <div onClick={() => handleBrandClick(item.brandid, item.brandname)}>
                    <center>
                        <img
                            src={`${serverURL}/images/${item.logo}`}
                            style={{ width: 200, height: 200, borderRadius: '50%' }}
                            className={classes.banner_hover}
                        />
                        {/* <h3 style={{fontWeight: 600, fontSize: 22}}>{item.categoryname}</h3> */}
                    </center>
                </div>
            </div>
        ));
    };

    return (
        <div style={{ padding: matches ? '2%' : '1% 7%', position: 'relative' }}>
            <h3 style={{ fontWeight: 500, fontSize: 30, margin: 0, marginBottom: '1%' }}>Shop by Brands</h3>
            <ArrowBackIosIcon
                onClick={handlePrev}
                style={{ display: matches ? 'none' : 'block', position: 'absolute', zIndex: 99, top: '50%', left: matches ? '3%' : '5%', cursor: 'pointer' }}
            />
            <Slider ref={sliderRef} {...settings}>
                {bannerCarousel()}
            </Slider>
            <ArrowForwardIosIcon
                onClick={handleNext}
                style={{ display: matches ? 'none' : 'block', position: 'absolute', zIndex: 99, top: '50%', right: matches ? '3%' : '5%', cursor: 'pointer' }}
            />
        </div>
    );
}