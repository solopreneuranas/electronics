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
import { getData, postData } from "../../../../services/FetchNodeServices";
import UserAddress from "../userAddress";
import { useLocation } from "react-router-dom";

export default function Checkout(props) {

    var location = useLocation()
    var mobileno = location.state.mobileno
    var status = location.state.status
    //var userData = location.state.userData
    var userData = JSON.parse(localStorage.getItem("User"))
    const classes = useStyles()
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var myCart = useSelector(state => state.cart)
    var cartProducts = Object.values(myCart)
    const [refresh, setRefresh] = useState(false)
    const [firstName, setFirstName] = useState(userData[0]?.firstname)
    const [userId, setUserId] = useState(userData[0]?.userid)
    const [lastName, setLastName] = useState(userData[0]?.lastname)
    const [number, setNumber] = useState(userData[0]?.mobileno)
    const [email, setEmail] = useState(userData[0]?.email)
    const [address1, setAddress1] = useState(userData[0]?.address1)
    const [address2, setAddress2] = useState(userData[0]?.address2)

    return (
        <div className={classes.home_root}>
            <Header />
            <Grid container spacing={3} style={{ width: '100%', padding: '5% 10%' }}>
                <Grid item md={8}>
                    {
                        status == true ? <><UserAddress userData={userData} /></>
                            :
                            <>
                                <CheckoutForm
                                    number={number}
                                    setFirstName={setFirstName}
                                    setLastName={setLastName}
                                    setEmail={setEmail}
                                    setNumber={setNumber}
                                    setAddress1={setAddress1}
                                    setAddress2={setAddress2}
                                />
                            </>
                    }
                    <CheckoutProducts products={cartProducts} setRefresh={setRefresh} refresh={refresh} />
                </Grid>
                <Grid item md={4}>
                    <div style={{ position: matches_md ? 'relative' : 'sticky', top: matches_md ? 0 : '28%', width: '100%' }}>
                        <CartSummary
                            screen='checkout'
                            userId={userId}
                            status={status}
                            firstName={firstName}
                            lastName={lastName}
                            email={email}
                            number={number}
                            address1={address1}
                            address2={address2}
                            products={cartProducts}
                        />
                    </div>
                </Grid>
            </Grid>
            <Footer />
        </div>
    )
}
