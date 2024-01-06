import useStyles from "./ProjectCSS";
import Header from "../Header";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { getData, postData, serverURL } from "../../../../services/FetchNodeServices";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function OrderPlaced(props) {

    var navigate = useNavigate()
    var location = useLocation()
    var orderAmount = location.state.orderAmount
    const classes = useStyles()
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const formattedOrderAmount = orderAmount.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });

    const handleClick = () => {
        navigate('/account/orders')
    }

    return (
        <div className={classes.home_root}>
            <Header />
            <Grid container spacing={3} style={{ width: '70%', margin: 'auto', padding: '8% 5% 10%', height: '100%', display: "flex", justifyContent: "center" }}>

                <Grid item md={12} style={{ display: "flex", width: '100%', alignItems: "center", justifyContent: "center", padding: '10% 6%', borderRadius: 20, background: 'black', flexDirection: "column", position: "relative" }}>
                    <img src={`${serverURL}/images/icon-check.svg`} style={{ width: 130, position: "absolute", top: '-20%' }} /><br />
                    <h3 style={{ fontWeight: 500, margin: 0, fontSize: 37 }}>Order Placed!!</h3>
                    <h3 style={{ fontWeight: 400, margin: 0, fontSize: 22, textAlign: "center" }}>Your order of <font style={{ fontWeight: 600, color: '#00E9BF' }}>Rs. {formattedOrderAmount}</font> has been placed successfully!!</h3>
                    <Button onClick={handleClick} startIcon={<ArrowRightAltIcon />} variant="outlined" style={{ fontWeight: 500, margin: 0, fontSize: 19, color: '#00E9BF', marginTop: '3%', border: 'none' }}>My orders</Button>
                </Grid>

            </Grid>
            <Footer />
        </div>
    )
}
