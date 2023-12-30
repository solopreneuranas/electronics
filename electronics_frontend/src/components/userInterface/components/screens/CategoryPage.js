import useStyles from "./ProjectCSS";
import Header from "../Header";
import MenuComponent from "../MenuComponent";
import ProductsSlider from "../ProductsSlider"
import MainSlider from "../MainSlider";
import Footer from "../Footer";

import { useLocation } from "react-router-dom";

export default function CategoryPage(props) {

    var location = useLocation()
    var category = location.state
    console.log(location.state)

    const classes = useStyles()

    return (
        <div className={classes.home_root}>

            <Header />

            <MainSlider api='fetch_banners_by_category' categoryid={category.categoryid} />

            <ProductsSlider api='fetch_product_details_by_category' title={category.categoryname} categoryid={category.categoryid} slides={4} />

            <Footer />

        </div>
    )
}