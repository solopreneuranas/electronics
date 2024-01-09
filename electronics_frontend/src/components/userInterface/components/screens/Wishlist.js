import useStyles from "./ProjectCSS";
import Header from "../Header";
import MenuComponent from "../MenuComponent";
import ProductsSlider from "../ProductsSlider"
import ProductsSlider2 from "../ProductsSlider2"
import CartProducts from "../CartProducts";
import Footer from "../Footer";
import { useSelector } from 'react-redux';
import { useState } from "react";
import WishlistProducts from "../WishlistProducts";
import EmptyCart from "../EmptyCart";

export default function Wishlist() {
    const classes = useStyles()
    var myWishlist = useSelector(state => state.wishlist)
    var wishlistProducts = Object.values(myWishlist)
    const [refresh, setRefresh] = useState(false)
    console.log("WISHLIST", wishlistProducts)

    return (
        <div className={classes.home_root}>

            <Header />
            {
                wishlistProducts.length == 0 ?
                    <>
                        <EmptyCart title='Your Wishlist is Empty' />
                    </>
                    :
                    <>
                        <WishlistProducts wishlistProducts={wishlistProducts} setRefresh={setRefresh} refresh={refresh} />
                    </>
            }
            <ProductsSlider api='fetch_product_details_by_status' title='Buy Trending Products' status='Trending' slides={4} />
            <ProductsSlider2 api='fetch_product_details_by_status' title='Buy Products on Sale' status='Sale' saleStatus={true} />
            <Footer />

        </div>
    )
}