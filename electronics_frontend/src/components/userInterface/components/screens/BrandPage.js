import useStyles from "./ProjectCSS";
import Header from "../Header";
import MenuComponent from "../MenuComponent";
import ProductsSlider from "../ProductsSlider"
import MainSlider from "../MainSlider";
import Footer from "../Footer";

import { useLocation } from "react-router-dom";

export default function BrandPage(props) {

    var location = useLocation()
    var brand = location.state

    const classes = useStyles()

    return (
        <div className={classes.home_root}>

            <Header />

            <MainSlider api='fetch_banners_by_brands' brandid={brand.brandid} />

            <ProductsSlider api='fetch_product_details_by_brand' title={brand.brandname} brandid={brand.brandid} categoryid={28} slides={4} />

            <Footer />

        </div>
    )
}