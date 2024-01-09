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
import UserOrdersComponent from "../UserOrdersComponent"

export default function UserOrders(props) {

    var navigate = useNavigate()
    var userData = JSON.parse(localStorage.getItem("User"))
    var number = userData[0].mobileno
    const classes = useStyles()
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [orders, setOrders] = useState([])
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

    const handleClickOpen = (item) => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    }

    const fetchOrders = async () => {
        var body = { 'mobileno': number }
        var respone = await postData('ui-Home/fetch_orders_by_user', body)
        if (respone.status === true) {
            setOrders(respone.data)
        }
        else {
            alert('Failed')
        }
    }

    useEffect(function () {
        fetchOrders()
    }, [])

    const sortedOrdersList = orders.sort((a, b) => {
        const dateA = new Date(a.orderdate);
        const dateB = new Date(b.orderdate);
        return dateB - dateA;
    })

    return (
        <div className={classes.home_root}>
            <Header />
            <div style={{ marginBottom: matches_md ? '15%' : '10%' }}>
                {
                    sortedOrdersList ?
                        <>
                            <Grid container spacing={1} style={{ width: matches_md ? '90%' : '70%', margin: 'auto', padding: 0, height: '100%', display: "flex", justifyContent: "center", marginTop: '3%' }}>
                                <Grid item xs={12} style={{ marginBottom: '3%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 30 }}>Your Orders</h3>
                                </Grid>
                            </Grid>
                            <UserOrdersComponent orders={orders} />
                        </>
                        :
                        <>
                            <EmptyCart title="You don't have any orders" />
                        </>
                }
            </div>
            <Footer />
        </div >
    )
}
