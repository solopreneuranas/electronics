import React, { useEffect, useState } from 'react';
import { Button, Grid, Box } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL } from "../../.././services/FetchNodeServices";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';

export default function UserOrdersComponent(props) {

    var navigate = useNavigate()
    var userData = JSON.parse(localStorage.getItem("User"))
    var number = userData[0].mobileno
    const [open, setOpen] = React.useState(false)
    const theme = useTheme();
    var userOrders = props.orders
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: matches_md ? '80%' : '50%',
        bgcolor: '#191919',
        color: 'white',
        p: matches_md ? '8% 6%' : '4%',
        borderRadius: 1
    };

    const handleInvoice = (item) => {
        navigate('/order-details', { state: { invoiceProduct: item, user: userData } })
        window.scrollTo(0, 0)
    }

    const handleProductClick = (item) => {
        var staticURL = `${item.brandname} ${item.productname} ${item.modelno} ${item.color}`
        var staticURLArray = staticURL.split(' ')
        var dynamicURL = staticURLArray.join('-').toLowerCase()
        navigate(`/product/?${dynamicURL}`, { state: { product: item } });
        window.scrollTo(0, 0);
    }

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const myOrders = () => {
        return (
            userOrders.map((item, i) => {
                var date = new Date(item.orderdate);
                var year = date.getFullYear();
                var month = date.getMonth()
                var day = date.getDate().toString().padStart(2, '0')
                var formattedDate = `${day} ${months[month]} ${year}`

                const formattedOfferPrice = (item.offerprice * item.qty).toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2,
                })

                return (
                    <div>
                        <Grid container spacing={1} style={{ width: matches_md ? '90%' : '70%', borderRadius: 15, margin: 'auto', padding: 0, height: '100%', display: "flex", justifyContent: "center", border: '1px solid #2D2D2D', marginBottom: matches_md ? '5%' : '2%' }}>
                            <Grid item xs={12} style={{ background: 'black', padding: matches_md ? '5%' : '2%', borderRadius: '15px 15px 0 0' }}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Total: {formattedOfferPrice} | Qty: {item.qty}
                                    <font style={{ minWidth: '100px', display: 'inline-block', marginLeft: matches_md ? '3%' : '1%', border: item.deliverystatus == 'Undelivered' ? '1px solid #FF02B9' : '1px solid #04d921', borderRadius: 5, padding: matches_md ? '1% 1.5%' : '0.5% 1%', fontSize: 16, fontWeight: 600, color: item.deliverystatus == 'Undelivered' ? '#FF02B9' : '#04d921', textAlign: 'center' }}>
                                        {item.deliverystatus}
                                    </font>
                                </h3>
                            </Grid>
                            <Grid item xs={12} style={{ padding: matches_md ? '5%' : '2%' }}>
                                <Grid item xs={12} style={{ marginBottom: '3%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>Ordered on - {formattedDate} </h3>
                                    <p style={{ margin: 0, opacity: '70%' }}>Package was handed to resident</p>
                                </Grid>
                                <Grid container spacing={1} style={{ width: '100%' }}>
                                    <Grid item md={9} style={{ width: '100%' }}>
                                        <Grid container spacing={1}>
                                            <Grid item md={2} onClick={() => handleProductClick(item)} style={{ cursor: 'pointer', width: '100%', display: "flex", justifyContent: matches_md ? "center" : "left" }}>
                                                <img src={`${serverURL}/images/${item.picture.split(',')[0]}`} style={{ width: matches_md ? 200 : 100, height: matches_md ? 200 : 100 }} />
                                            </Grid>
                                            <Grid item md={10}>
                                                <p style={{ margin: 0, fontSize: 14, opacity: '80%' }}>HSN code: {item.hsncode}</p>
                                                <p style={{ margin: 0, fontSize: 16, opacity: '80%' }}>{item.brandname} - {item.categoryname} </p>
                                                <h3 style={{ margin: 0, fontWeight: 400, fontSize: 18 }}>{item.productname} {item.modelno} {item.color}</h3>
                                                <Button onClick={() => handleInvoice(item)} startIcon={<ArrowRightAltIcon />} variant="contained" style={{ fontWeight: 500, margin: 0, fontSize: 17, color: 'black', background: '#00E9BF', marginTop: '3%', border: 'none', marginRight: '3%', borderRadius: 10, width: matches_md ? '100%' : '' }}>
                                                    {item.deliverystatus == 'Delivered' ? 'Return' : 'Cancel'}
                                                </Button>
                                                <Button onClick={() => handleInvoice(item)} startIcon={<ArrowRightAltIcon />} variant="outlined" style={{ fontWeight: 500, margin: 0, fontSize: 17, color: 'white', marginTop: '3%', border: '1px solid white', borderRadius: 10, width: matches_md ? '100%' : '' }}>View Invoice</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                )
            })
        )
    }
    return (
        <div style={{ width: '100%' }}>
            {myOrders()}
        </div >
    )
}
