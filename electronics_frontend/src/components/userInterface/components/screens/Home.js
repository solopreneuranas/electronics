import Header from "../Header";
import MainSlider from "../MainSlider";
import useStyles from "./ProjectCSS";
import CategorySlider from "../CategorySlider";
import FinanceSlider from "../FinanceSlider";
import ProductsSlider from "../ProductsSlider";
import CustomSlider from "../CustomSlider";
import Custom2Images from "../Custom2Images";
import BrandsSlider from "../BrandsSlider";
import ProductsSlider2 from "../ProductsSlider2";
import Custom3Images from "../Custom3Images";
import Footer from "../Footer";

import { useLocation } from "react-router-dom";

export default function Home(props) {

    const classes = useStyles()

    var location = useLocation()
    var category = location.state


    return (
        <div className={classes.home_root}>

            <Header />

            <MainSlider api='fetch_banners' />

            <Custom3Images image1='finance5.webp' image2='finance2.webp' image3='finance1.webp' />

            <CategorySlider/>

            <CustomSlider title="Today's Deal" images="d1.webp,d2.webp,d3.webp,d4.webp,d5.webp,d6.webp,d7.webp,d8.webp,d9.webp,d10.webp" slides={4} />

            <ProductsSlider api='fetch_product_details' title='Deals of the Day' slides={4} />

            <CustomSlider title="Highlights" images="high1.webp,high2.webp,high5.webp,high4.webp,high3.webp" slides={3} />
            <CustomSlider images="high6.webp,high7.webp,high8.webp,high9.webp,high10.webp" slides={3} />

            <ProductsSlider api='fetch_product_details_by_status' title='Trending Products' status='Trending' slides={4} />

            <BrandsSlider />

            <Custom2Images title="Apple Store" image1='appleBanner1.webp' image2='appleBanner2.webp' />
            <CustomSlider images="i1.webp,i2.webp,i3.webp,i4.webp,i5.webp" slides={4} />

            <Custom2Images title="New Released" image1='oneplusBanner1.webp' image2='oneplusBanner2.webp' />
            <CustomSlider images="new1.webp,new2.webp,new3.webp,new4.webp,new5.webp" slides={4} />

            <ProductsSlider2 api='fetch_product_details_by_status' title='Products on Sale' status='Sale' saleStatus={true} />

            <ProductsSlider api='fetch_product_details_by_status' title='New Arrivals' status='New Arrival' slides={4} />

            <Custom3Images title="Croma Exclusive" image1='ex6.webp' image2='ex7.webp' image3='ex8.webp' />
            <CustomSlider images="ex1.webp,ex2.webp,ex3.webp,ex4.webp,ex5.webp" slides={4} />

            <ProductsSlider api='fetch_product_details_by_category' title='Latest Smartwatches' categoryid={25} slides={4} />

            <ProductsSlider api='fetch_product_details_by_category' title='Latest Laptops' categoryid={47} slides={4} />

            <ProductsSlider api='fetch_product_details_by_category' title='Latest Mobile Phones' categoryid={28} slides={4} />

            <ProductsSlider api='fetch_product_details_by_category' title='Latest Headphones' categoryid={49} slides={4} />

            <Footer />

        </div>
    )
}