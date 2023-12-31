import useStyles from "./ProjectCSS";
import Header from "../Header";
import MenuComponent from "../MenuComponent";
import ProductsSlider from "../ProductsSlider"
import ProductsSlider2 from "../ProductsSlider2"
import CartProducts from "../CartProducts";
import Footer from "../Footer";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmptyCart from "../EmptyCart";

export default function Cart() {

    var navigate = useNavigate()
    const classes = useStyles()
    var myCart = useSelector(state => state.cart)
    var cartProducts = Object.values(myCart)
    const [refresh, setRefresh] = useState(false)

    return (
        <div className={classes.home_root}>

            <Header />
            {
                cartProducts.length == 0 ?
                    <>
                        <EmptyCart title='Yor Cart is Empty' />
                    </>
                    :
                    <>
                        <CartProducts cartProducts={cartProducts} setRefresh={setRefresh} refresh={refresh} />
                    </>
            }
            <ProductsSlider api='fetch_product_details_by_status' title='Buy Trending Products' status='Trending' slides={4} />
            <ProductsSlider2 api='fetch_product_details_by_status' title='Buy Products on Sale' status='Sale' saleStatus={true} />

            <Footer />

        </div>
    )
}