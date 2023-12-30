import useStyles from "./ProjectCSS";
import Header from "../Header";
import MenuComponent from "../MenuComponent";
import AllProducts from "../AllProducts";
import Footer from "../Footer";

export default function Store() {
    const classes = useStyles()

    return (
        <div className={classes.home_root}>

            <Header />
            <AllProducts/>

            <Footer />

        </div>
    )
}