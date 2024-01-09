import useStyles from "./ProjectCSS";
import Header from "../Header";
import Footer from "../Footer";
import React, { useEffect, useState } from 'react';
import { Button, Grid, Box } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { getData, postData, serverURL } from "../../../../services/FetchNodeServices";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from "react-router-dom";
import EmptyCart from "../EmptyCart";
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from "react-router-dom";

export default function OrderDetails(props) {

    var location = useLocation()
    var invoiceProduct = location.state.invoiceProduct
    var user = location.state.user
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [orders, setOrders] = useState([])
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    var originalPrice = [invoiceProduct].reduce((p1, p2) => {
        return (p1 + (p2.price * p2.qty))
    }, 0)

    var offerPrice = [invoiceProduct].reduce((p1, p2) => {
        return (p1 + (p2.offerprice * p2.qty))
    }, 0)

    var amountSaved = originalPrice - offerPrice

    const formattedOfferPrice = invoiceProduct.offerprice.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });

    const formattedPrice = invoiceProduct.price.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    })

    var formattedSavedAmount = amountSaved.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });

    const orderSummary = () => {
        return (
            <div style={{ width: '100%' }}>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <p style={{ fontSize: 16, margin: '2% 0' }}>Original Price</p>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 16, margin: '2% 0' }}>{formattedPrice}</p>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <p style={{ fontSize: 16, margin: 0 }}>Amount Payable</p>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 16, margin: '2% 0' }}>{formattedOfferPrice}</p>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <p style={{ fontSize: 16, margin: '2% 0' }}>Saved</p>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 16, margin: '2% 0' }}>{formattedSavedAmount}</p>
                    </Grid>
                </Grid>

                <Grid container spacing={0} >
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <p style={{ fontSize: 16, margin: '2% 0' }}>Delivery</p>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 16, margin: '2% 0', textDecoration: 'line-through' }}>₹150</p>
                    </Grid>
                </Grid>

                <hr style={{ opacity: '30%', color: 'white' }} />

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>Total</p>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>
                            {formattedOfferPrice}
                        </p>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const userOrderDetails = () => {

        var date = new Date(invoiceProduct.orderdate);
        var year = date.getFullYear();
        var month = date.getMonth()
        var day = date.getDate().toString().padStart(2, '0')
        var formattedDate = `${day} ${months[month]} ${year}`

        return (
            <div style={{ width: '100%' }}>
                <Grid container spacing={1} style={{ width: '100%', margin: '0 0 3%', display: 'flex', alignItems: 'start', border: '1px solid #2D2D2D', borderRadius: 10, padding: '2%' }}>
                    <Grid item md={8} style={{ width: '100%' }}>
                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 23 }}>Shipping Address</h3>
                        <div>
                            <h3 style={{ fontWeight: 500, margin: 0, fontSize: 18 }}>{user[0].firstname} {user[0].lastname}</h3>
                            <p style={{ margin: 0, opacity: '70%' }}>Email: {user[0].email}</p>
                            <p style={{ margin: 0, opacity: '70%' }}>Mob no.: {user[0].mobileno}</p>
                            <p style={{ margin: 0, opacity: '70%' }}>{user[0].address1}, {user[0].address2} - {user[0].pincode}</p>
                            <p style={{ margin: 0, opacity: '70%' }}>{user[0].city}, {user[0].state}</p>
                        </div>
                    </Grid>
                    <Grid item md={4} style={{ width: '100%', textAlign: "right" }}>
                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 23 }}>Order Summary</h3>
                        {orderSummary()}
                    </Grid>
                </Grid>
                <Grid container spacing={1} style={{ width: '100%', margin: '3% 0 0', display: 'flex', alignItems: 'start', border: '1px solid #2D2D2D', borderRadius: 10, padding: '1%' }}>
                    <Grid item md={12} style={{ width: '100%' }}>
                        <Grid container spacing={1} style={{ width: '100%', borderRadius: 15, margin: 'auto', padding: 0, height: '100%', display: "flex", justifyContent: "center", marginBottom: matches_md ? '5%' : '2%' }}>
                            <Grid item xs={12} style={{ padding: matches_md ? '5%' : '1%', borderRadius: '15px 15px 0 0' }}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Total: {formattedOfferPrice} | Qty: {invoiceProduct.qty}
                                    <font style={{ minWidth: '100px', display: 'inline-block', marginLeft: matches_md ? '3%' : '1%', border: invoiceProduct.deliverystatus == 'Undelivered' ? '1px solid #FF02B9' : '1px solid #04d921', borderRadius: 5, padding: matches_md ? '1% 1.5%' : '0.5% 1%', fontSize: 16, fontWeight: 600, color: invoiceProduct.deliverystatus == 'Undelivered' ? '#FF02B9' : '#04d921', textAlign: 'center' }}>
                                        {invoiceProduct.deliverystatus}
                                    </font>
                                </h3>
                            </Grid>
                            <hr style={{ opacity: '40%', width: '100%' }} />
                            <Grid item xs={12} style={{ padding: matches_md ? '5%' : '1%' }}>
                                <Grid item xs={12} style={{ marginBottom: '3%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>Ordered on - {formattedDate} </h3>
                                </Grid>
                                <Grid item md={12} style={{ width: '100%' }}>
                                    <Grid container spacing={1}>
                                        <Grid item md={3} style={{ width: '100%', display: "flex", justifyContent: matches_md ? "center" : "left" }}>
                                            <img src={`${serverURL}/images/${invoiceProduct.picture.split(',')[0]}`} style={{ width: '90%', height: '100%' }} />
                                        </Grid>
                                        <Grid item md={7}>
                                            <p style={{ margin: 0, fontSize: 14, opacity: '80%' }}>HSN code: {invoiceProduct.hsncode}</p>
                                            <p style={{ margin: 0, fontSize: 16, opacity: '80%' }}>{invoiceProduct.brandname} - {invoiceProduct.categoryname} </p>
                                            <hr style={{ opacity: '30%', width: '100%' }} />
                                            <h3 style={{ margin: 0, fontWeight: 400, fontSize: 18 }}>{invoiceProduct.productname} {invoiceProduct.modelno} {invoiceProduct.color}</h3>
                                            <h3 style={{ fontWeight: 500, fontSize: 25, margin: '1% 0 0' }}>
                                                {formattedOfferPrice}
                                            </h3>
                                            <hr style={{ opacity: '30%', width: '100%' }} />
                                            <span>(Incl. all Taxes)</span>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </div>
        )
    }


    return (
        <div className={classes.home_root}>
            <Header />
            <div style={{ padding: '5% 15%' }}>
                <h3 style={{ fontWeight: 500, fontSize: 30, margin: '0 0 2%' }}>
                    Invoice : orderid - #{invoiceProduct.orderid}
                </h3>
                {userOrderDetails()}
            </div>
            <Footer />
        </div >
    )
}
