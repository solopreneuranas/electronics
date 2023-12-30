import useStyles from "./ProjectCSS";
import Header from "../Header";
import ProductDetails from "../ProductDetails";
import ProductsSlider from "../ProductsSlider"
import Footer from "../Footer";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ProductPage(props) {

    var location = useLocation()
    const classes = useStyles()
    const [product, setProduct] = useState(location.state.product)
    const [refresh, setRefresh] = useState(false)

    return (
        <div className={classes.home_root}>
            <Header />
            <ProductDetails
                setRefresh={setRefresh}
                refresh={refresh}
                setProduct={setProduct}
                product={product}
            />
            <ProductsSlider
                api='fetch_product_details_by_category'
                title='Similar Products'
                categoryid={product.categoryid}
                slides={4} />
            <Footer />
        </div>
    )
}
