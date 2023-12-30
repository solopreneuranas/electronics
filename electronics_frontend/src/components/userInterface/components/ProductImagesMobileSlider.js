import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData } from '../../../services/FetchNodeServices';
import { makeStyles } from '@mui/styles';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';


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
    },
})


export default function ProductImagesMobileSlider(props) {

    const classes = useStyles();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        focusOnSelect: false,
        autoplay: false,
        slidesToShow: matches_md ? 3 : 4,
        slidesToScroll: 1,
        arrows: false
    };

    const imageArray = props.picture.split(',')

    const productImagesSlider = () => {

        const handleImageClick = (item) => {
            props.setMainImage(item)
            sliderRef.current.slickNext()
        };


        const imagesCarousel = () => {
            return (
                imageArray.map((item, i) => {
                    const isImageSelected = props.mainImage === item;
                    return (
                        <div>
                            <div onClick={() => handleImageClick(item)} style={{ border: isImageSelected ? '1px solid #00E9BF' : '1px solid gray', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 5, height: 100, width: 100 }}>
                                <img src={`${serverURL}/images/${item}`} style={{ width: '80%', height: '80%', cursor: 'pointer' }} />
                            </div>
                        </div>
                    )
                })
            )
        };

        return (
            <div style={{ margin: 0, width: matches_md ? 350 : 450 }}>
                <Slider ref={sliderRef} {...settings}>
                    {imagesCarousel()}
                </Slider>
            </div>
        );

    };

    return (
        <div style={{ width: '100%', marginTop: '5%' }}>
            {productImagesSlider()}<br />
        </div>
    );
}