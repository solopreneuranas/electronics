import React, { useRef } from 'react';
import { Grid } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL } from '../../../services/FetchNodeServices';
import useStyles from './screens/ProjectCSS';

export default function CustomSlider(props) {
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
        slidesToShow: matches ? 1 : props.slides,
        slidesToScroll: matches ? 1 : props.slides,
        arrows: false,
    };

    const handleNext = () => {
        sliderRef.current.slickNext();
    };

    const handlePrev = () => {
        sliderRef.current.slickPrev();
    };

    const data = typeof props.images === 'string' ? props.images.split(',') : [];

    const bannerCarousel = () => {
        return data.map((item, i) => {
            return (
                <div key={i}>
                    <center>
                        <div className={classes.banner_hover} style={{ padding: '2%' }}>
                            <img
                                src={`${serverURL}/images/${item}`} 
                                style={{ width: '100%', height: '100%', borderRadius: 15 }}
                            />
                        </div>
                    </center>
                </div>
            );
        });
    };


    return (
        <div style={{ padding: matches ? '2%' : '0 7%', position: 'relative'}}>
            <h3 style={{ fontWeight: 500, fontSize: 30, margin: 0, marginBottom: '1%'}}>{props.title}</h3>
            <ArrowBackIosIcon
                style={{
                    display: matches ? 'none' : 'block',
                    position: 'absolute',
                    zIndex: 99,
                    top: '40%',
                    left: matches ? '3%' : '5%',
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
                    right: matches ? '3%' : '5%',
                    cursor: 'pointer'
                }}
                onClick={handleNext}
            />
        </div>
    );
}
