import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getData, serverURL } from "../../../services/FetchNodeServices";
import { useEffect, useState } from "react";

export default function MainSlider(props) {

    const [banners, setBanners] = useState([])

    const fetchBanners = async () => {
        var response = await getData(`ui-Home/${props.api}/?brandid=${props.brandid}&categoryid=${props.categoryid}`)
        setBanners(response.data)
    }

    useEffect(function () {
        fetchBanners()
    }, [])

    var settings = {
        dots: false,
        infinite: true,
        speed: 300,
        focusOnSelect: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        nextArrow: <button type="button" class="slick-next">Next</button>,
        prevArrow: <button type="button" class="slick-prev">Previous</button>
    }

    const bannerCarousel = () => {
        return (
            banners.map((item, i) => {
                const files = item.files.split(',');
                return (
                    files.map ((file)=>{
                        return (
                            <div>
                                <img src={`${serverURL}/images/${file}`} style={{ width: '100%' }} />
                            </div>
                        )
                    })
                )
            })
        )
    }

    return (
        <div>
            <Slider {...settings}>
                {bannerCarousel()}
            </Slider>
        </div>
    )
}
