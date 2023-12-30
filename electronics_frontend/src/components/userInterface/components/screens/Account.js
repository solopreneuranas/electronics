import useStyles from "./ProjectCSS";
import Header from "../Header";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import CheckoutForm from "../CheckoutForm";
import { Grid } from "@mui/material";
import CartSummary from "../CartSummary";
import { useSelector } from "react-redux";
import CheckoutProducts from "../CheckoutProducts";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from "react-router-dom";

export default function Account(props) {

    var navigate = useNavigate()
    const classes = useStyles()
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var myCart = useSelector(state => state.cart)
    var cartProducts = Object.values(myCart)
    const [refresh, setRefresh] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const accountItems = [
        {
            icon: <LocalShippingOutlinedIcon fontSize="large" />,
            title: 'My Orders',
            para: 'view, cancel orders and buy again.',
            link: '/account/orders'
        },
        {
            icon: <EmojiEventsOutlinedIcon fontSize="large" />,
            title: 'My Rewards',
            para: 'Exclusive offers and loyalty rewards for you.',
            link: '/account/rewards'
        },
        {
            icon: <FavoriteBorderIcon fontSize="large" />,
            title: 'My Wishlist',
            para: 'Have a look at your favourite products.',
            link: '/account/wishlist'
        },
        {
            icon: <AccountCircleOutlinedIcon fontSize="large" />,
            title: 'My Profile',
            para: 'Edit your profile details & shipping address.',
            link: '/account/profile'
        }
    ]

    return (
        <div className={classes.home_root}>
            <Header />
            <Grid container spacing={3} style={{ width: '100%', padding: '5% 10% 25%', height: '100%' }}>
                <Grid container spacing={0} style={{ width: '100%', paddingLeft: '2%' }}>
                    <Grid item md={12}>
                        <h3 style={{ fontWeight: 500, margin: 0, fontSize: 25 }}>My Account</h3>
                    </Grid>
                </Grid>
                {
                    accountItems.map((item, i) => {
                        return (
                            <Grid item md={4} onClick={()=>navigate(item.link)}>
                                <div style={{ cursor: "pointer", border: '1px solid #525252', borderRadius: 10, padding: '5% 7%', display: "flex", flexDirection: "row", alignItems: "center", gap: '8%' }}>
                                    <div>
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 500, margin: 0, fontSize: 23 }}>{item.title}</h3>
                                        <p style={{ margin: 0 }}>{item.para}</p>
                                    </div>
                                </div>
                            </Grid>
                        )
                    })
                }
            </Grid>
            <Footer />
        </div>
    )
}
