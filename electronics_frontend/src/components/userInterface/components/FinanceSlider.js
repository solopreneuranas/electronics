import React, { useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL } from '../../../services/FetchNodeServices';
import useStyles from '../components/screens/ProjectCSS';

export default function FinanceSlider() {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const sliderRef = useRef(null);

    var settings = {
        dots: false,
        infinite: true,
        speed: matches ? 500 : 1500,
        focusOnSelect: false,
        autoplay: false,
        slidesToShow: matches ? 1 : 3,
        slidesToScroll: matches ? 1 : 2,
        arrows: false,
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const data = ['finance2.webp', 'finance5.webp', 'finance1.webp'];

    const bannerCarousel = () => {
        return data.map((item, i) => {
            return (
                <div key={i}>
                    <center>
                        <div className={classes.banner_hover} style={{ padding: '1%' }}>
                            <img
                                src={`${serverURL}/images/${item}`}
                                style={{ width: '100%', height: matches ? 120 : 160, marginRight: '2%' }}
                                alt={`finance-${i}`}
                            />
                        </div>
                    </center>
                </div>
            );
        });
    };

    return (
        <div style={{ padding: matches ? '2%' : '2% 10%', position: 'relative' }}>
            <ArrowBackIosIcon
                style={{
                    display: matches ? 'none' : 'block',
                    position: 'absolute',
                    zIndex: 99,
                    top: '40%',
                    left: matches ? '3%' : '4%',
                    cursor: 'pointer'
                }}
                onClick={handlePrev}
            />
            <Slider {...settings} ref={sliderRef}>
                {bannerCarousel()}
            </Slider>
            <ArrowForwardIosIcon
                style={{
                    display: matches ? 'none' : 'block',
                    position: 'absolute',
                    zIndex: 99,
                    top: '40%',
                    right: matches ? '3%' : '4%',
                    cursor: 'pointer'
                }}
                onClick={handleNext}
            />
        </div>
    );
}
