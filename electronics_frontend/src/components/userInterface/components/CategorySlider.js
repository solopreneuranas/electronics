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

export default function CategorySlider(props) {

    const navigate = useNavigate()
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    const sliderRef = useRef(null);

    const [category, setCategory] = useState([]);

    const fetchCategory = async () => {
        var response = await getData('ui-Home/display_all_category');
        setCategory(response.data);

    };

    useEffect(() => {
        fetchCategory();
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

    const handleCategoryClick = (categoryid, categoryname) => {
        var staticURL = categoryname
        var staticURLArray = staticURL.split(' ')
        var dynamicURL = staticURLArray.join('-').toLowerCase()

        navigate(`/category/?${dynamicURL}`, { state: { categoryid: categoryid, categoryname: categoryname } });
    }

    const bannerCarousel = () => {
        return category.map((item, i) => {
            return (
                <div>
                    <center>
                        <div onClick={() => handleCategoryClick(item.categoryid, item.categoryname)} style={{ textAlign: 'center', padding: '2%', width: '100%' }}>
                            <img
                                src={`${serverURL}/images/${item.image}`}
                                style={{ width: 200, height: 170 }}
                                className={classes.banner_hover}
                            />
                            <h3 style={{ fontWeight: 500, fontSize: 22 }}>{item.categoryname}</h3>
                        </div>
                    </center>
                </div>
            )
        })
    };

    return (
        <div style={{ padding: matches ? '2%' : '1% 7%', position: 'relative' }}>
            <ArrowBackIosIcon
                onClick={handlePrev}
                style={{ display: matches ? 'none' : 'block', position: 'absolute', zIndex: 99, top: '40%', left: matches ? '3%' : '5%', cursor: 'pointer' }}
            />
            <Slider ref={sliderRef} {...settings}>
                <div>
                    <center>
                        <div style={{ textAlign: 'center', padding: '2%', width: '100%' }}>
                            <img
                                src={`${serverURL}/images/whats-new.png`}
                                style={{ width: 200, height: 170 }}
                                className={classes.banner_hover}
                            />
                            <h3 style={{ fontWeight: 500, fontSize: 22 }}>What's new</h3>
                        </div>
                    </center>
                </div>
                {bannerCarousel()}
            </Slider>
            <ArrowForwardIosIcon
                onClick={handleNext}
                style={{ display: matches ? 'none' : 'block', position: 'absolute', zIndex: 99, top: '40%', right: matches ? '3%' : '5%', cursor: 'pointer' }}
            />
        </div>
    );
}