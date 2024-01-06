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

export default function UserOrders(props) {

    var navigate = useNavigate()
    var userData = JSON.parse(localStorage.getItem("User"))
    var userId = userData[0].userid
    const classes = useStyles()
    const theme = useTheme();
    const [orders, setOrders] = useState([])
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const fetchOrders = async () => {
        var body = { 'userid': userId }
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

    const handleClick = () => {
        navigate('/account/orders')
    }

    const sortedOrdersList = orders.sort((a, b) => {
        const dateA = new Date(a.orderdate);
        const dateB = new Date(b.orderdate);
        return dateB - dateA;
    })

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const myOrders = () => {
        return (
            sortedOrdersList.map((item, i) => {
                var date = new Date(item.orderdate);
                var year = date.getFullYear();
                var month = date.getMonth()
                var day = date.getDate().toString().padStart(2, '0')
                var formattedDate = `${day} ${months[month]} ${year}`;
                return (
                    <div>
                        <Grid container spacing={1} style={{ width: '70%', borderRadius: 15, margin: 'auto', padding: 0, height: '100%', display: "flex", justifyContent: "center", border: '1px solid #2D2D2D', marginBottom: '2%' }}>
                            <Grid item xs={12} style={{ background: 'black', padding: '2%', borderRadius: '15px 15px 0 0' }}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Ship to Anas Khan</h3>
                            </Grid>
                            <Grid item xs={12} style={{ padding: '2%' }}>
                                <Grid item xs={12} style={{ marginBottom: '3%' }}>
                                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>Ordered on {formattedDate}</h3>
                                    <p style={{ margin: 0, opacity: '70%' }}>Package was handed to resident</p>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item md={9}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={2}>
                                                <img src={`${serverURL}/images/${item.picture.split(',')[0]}`} style={{ width: 100 }} />
                                            </Grid>
                                            <Grid item xs={10}>
                                                <h3 style={{ margin: 0, fontWeight: 400, fontSize: 18 }}>Boat Smart Watch with Sports Mode Max-3501 black</h3>
                                                <Button onClick={handleClick} startIcon={<ArrowRightAltIcon />} variant="contained" style={{ fontWeight: 500, margin: 0, fontSize: 17, color: 'black', background: '#00E9BF', marginTop: '3%', border: 'none', marginRight: '3%', borderRadius: 10 }}>Buy Again</Button>
                                                <Button onClick={handleClick} startIcon={<ArrowRightAltIcon />} variant="outlined" style={{ fontWeight: 500, margin: 0, fontSize: 17, color: 'white', marginTop: '3%', border: '1px solid white', borderRadius: 10 }}>View Item</Button>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item md={3} style={{ display: "flex", flexDirection: "column", alignItems: "start", padding: '2%' }}>
                                        {/* <div style={{ background: '#00E9BF', borderRadius: 10, padding: '2% 5%', color: 'black', width: '100%', textAlign: "center" }}>
                                            <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Write a Review</h3>
                                        </div> */}
                                    </Grid>
                                </Grid>
                            </Grid>
                            <hr style={{ opacity: '40%', width: '100%' }} />
                            <Grid item xs={12} style={{ padding: '1% 2% 0' }}>
                                <h3 style={{ fontWeight: 400, fontSize: 15, margin: 0 }}>Cancel order</h3><br />
                            </Grid>
                        </Grid>
                    </div>
                )
            })
        )
    }
    return (
        <div className={classes.home_root}>
            <Header />
            <div>
                <Grid container spacing={1} style={{ width: '70%', margin: 'auto', padding: 0, height: '100%', display: "flex", justifyContent: "center", marginTop: '3%' }}>
                    <Grid item xs={12} style={{ marginBottom: '3%' }}>
                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 30 }}>Your Orders</h3>
                    </Grid>
                </Grid>
                {myOrders()}
            </div>
            <Footer />
        </div >
    )
}
