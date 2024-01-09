import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2'
import { useTheme } from '@mui/material/styles';
import Login from './Login';
import { postData, serverURL } from '../../../services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';
import useRazorpay from "react-razorpay";
import { useDispatch } from 'react-redux';

export default function CartSummary(props) {

    var navigate = useNavigate()
    var dispatch = useDispatch()
    const theme = useTheme()
    const [Razorpay] = useRazorpay();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [status, setStatus] = useState(false)
    const [coupon, setCoupon] = useState('')

    var firstName = props.firstName
    var lastName = props.lastName
    var number = props.number
    var email = props.email
    var address1 = props.address1
    var address2 = props.address2
    var pincode = props.pincode
    var city = props.city
    var state = props.state
    var products = props.products
    var userId = props.userId

    var originalPrice = products.reduce((p1, p2) => {
        return (p1 + (p2.price * p2.qty))
    }, 0)

    var offerPrice = products.reduce((p1, p2) => {
        return (p1 + (p2.offerprice * p2.qty))
    }, 0)

    var amountSaved = originalPrice - offerPrice
    var cartItems = products.length

    const options = {
        key: "rzp_test_GQ6XaPC6gMPNwH", // Enter the Key ID generated from the Dashboard
        amount: offerPrice * 100,
        currency: "INR",
        name: "Electronics",
        description: "Test Transaction",
        image: `${serverURL}/images/croma-logo.png`,

        handler: async function (response) {
            // alert(response.razorpay_payment_id)
            // alert(response.razorpay_signature)
            var body = { 'cart': products, 'mobileno': number, 'email': email, 'userid': userId, 'paymentstatus': response.razorpay_payment_id }
            var result = await postData('ui-Home/submit_order', body)
            if (result.status == true) {
                //dispatch({ type: 'DELETE_PRODUCT', payload: [products.productdetailsid, products] })
                navigate('/order-successfull', { state: { orderAmount: offerPrice } })
                window.scrollTo(0, 0)

            }
        },
        prefill: {
            name: `${firstName} ${lastName}`,
            email: email,
            contact: number,
        },
        notes: {
            address: "Razorpay Corporate Office",
        },
        theme: {
            color: "#3399cc",
        },
    };

    const handleClickOpen = () => {
        var userData = JSON.parse(localStorage.getItem("User"))
        if (userData) {
            navigate('/checkout', { state: { 'mobileno': userData[0].mobileno, status: true, data: userData } })
            window.scrollTo(0, 0)
        }
        else {
            setStatus(true)
        }
    }

    const handleRzrpPayment = async (params) => {
        const rzp1 = new Razorpay(options);
        rzp1.on("payment.failed", function (response) {
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.payment_id);
        });
        rzp1.open();
    }

    const handlePayment = async () => {
        if (props.status === false) {
            var body = { 'firstname': firstName, 'lastname': lastName, 'email': email, 'mobileno': number, 'address1': address1, 'address2': address2, 'pincode': pincode, 'city': city, 'state': state }
            var response = await postData('ui-Home/submit_user', body)
            if (response.status === true) {
                localStorage.setItem("User", JSON.stringify([body]))
                handleRzrpPayment()
            } else {
                alert('Something is missing!')
            }
        }
        else {
            handleRzrpPayment()
        }
    }

    var formattedOfferPrice = offerPrice.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });
    var formattedPrice = originalPrice.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });
    var formattedSavedAmount = amountSaved.toLocaleString('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: matches_md ? '80%' : '25%',
        bgcolor: 'white',
        boxShadow: 0,
        p: 5,
        borderRadius: 2
    };

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    var couponAppliedPrice
    const handleCoupon = () => {
        if (coupon == 'ANAS2024') {
            couponAppliedPrice = offerPrice - 1000
            alert(couponAppliedPrice)
        }
        setOpen(false)
    }

    const couponModal = () => {
        return (
            <div style={{ position: 'relative' }}>
                <Modal
                    style={{ background: '#323232a1' }}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade in={open}>
                        <Box sx={style}>
                            <CloseIcon onClick={handleClose} fontSize='large' style={{ position: 'absolute', top: '6%', right: '4%', cursor: 'pointer' }} />
                            <h3 style={{ fontWeight: 600, fontSize: 25, margin: 0 }}>Coupon</h3>
                            <Grid container spacing={2} style={{ marginTop: '3%' }}>
                                <Grid item md={8}>
                                    <TextField value={coupon} onChange={(e) => setCoupon(e.target.value)} label="Enter coupon code" variant="outlined" fullWidth />
                                </Grid>
                                <Grid item md={4}>
                                    <Button variant='contained' onClick={handleCoupon}
                                        style={{ height: '100%', padding: '0 15%', borderRadius: 5, color: 'white', border: 'none', background: '#00B594', fontWeight: 500, fontSize: 16, boxShadow: 'none' }}
                                    >Apply</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </div>
        )
    }

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const date = new Date()

    const laterDate = new Date();
    laterDate.setDate(date.getDate() + 7);

    const month = laterDate.getMonth()
    const monthDate = laterDate.getDate()
    var formattedMonthDate = ''
    var lastDigitOfMonthDate = monthDate.toString().charAt(monthDate.toString().length - 1)

    if (lastDigitOfMonthDate == 1) {
        formattedMonthDate = monthDate + 'st'
    }
    else if (lastDigitOfMonthDate == 2) {
        formattedMonthDate = monthDate + 'nd'
    }
    else if (lastDigitOfMonthDate == 3) {
        formattedMonthDate = monthDate + 'rd'
    }
    else {
        formattedMonthDate = monthDate + 'th'
    }

    const day = laterDate.getDay()

    const deliveryDate = `${daysOfWeek[day].substring(0, 3)}, ${formattedMonthDate} ${months[month].substring(0, 3)}`

    return (
        <div>
            {couponModal()}
            <h3 style={{ fontWeight: 500, fontSize: matches_md ? 20 : 25, margin: 0 }}>Delivery options for <font style={{ color: '#00E9BF' }}>474006</font></h3>
            <div style={{ display: 'flex', alignItems: 'center', marginTop: '2%' }}>
                <LocalShippingIcon style={{ marginRight: '2%' }} />
                <h3 style={{ fontWeight: 500, fontSize: matches_md ? 16 : 20, margin: 0 }}>Standard Delivery by {deliveryDate} </h3>
            </div><br /><br />

            <div style={{ width: '100%' }}>
                <h3 style={{ fontWeight: 500, fontSize: matches_md ? 20 : 25, margin: 0 }}>Order Summary ({cartItems} {cartItems <= 1 ? 'item' : 'items'})</h3>
                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>Original Price</p>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>{formattedPrice}</p>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>Amount Payable</p>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>{formattedOfferPrice}</p>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>Saved</p>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>{formattedSavedAmount}</p>
                    </Grid>
                </Grid>

                <Grid container spacing={0} >
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>Delivery</p>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 20, margin: '5% 0', textDecoration: 'line-through' }}>₹150</p>
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'left' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>Total</p>
                    </Grid>
                    <Grid item sm={6} style={{ width: '50%', display: 'flex', justifyContent: 'right' }}>
                        <p style={{ fontSize: 20, margin: '5% 0' }}>
                            {formattedOfferPrice}
                            {couponAppliedPrice}
                        </p>
                    </Grid>
                </Grid>

                <div onClick={handleOpen} style={{ background: '#2D2D2D', borderRadius: 8, padding: '4% 3%', display: 'flex', flexDirection: 'row', alignItems: 'center', margin: '2% 0 5%', cursor: 'pointer' }}>
                    <LocalOfferIcon style={{ marginRight: '3%' }} />
                    <h3 style={{ fontWeight: 500, fontSize: 18, margin: 0 }}>Apply Coupon</h3>
                    < ArrowForwardIosIcon style={{ marginLeft: 'auto' }} />
                </div>
                {
                    props.screen == 'cart' ?
                        <>
                            <Button onClick={handleClickOpen} fullWidth variant='contained' style={{ padding: '2% 0', borderRadius: 8, color: 'black', background: '#00E9BF', fontWeight: 500, fontSize: 18 }} >Checkout</Button>
                        </> :
                        <>
                            <Button onClick={handlePayment} fullWidth variant='contained' style={{ padding: '2% 0', borderRadius: 8, color: 'black', background: '#00E9BF', fontWeight: 500, fontSize: 18 }} >Proceed To Payment</Button>
                        </>
                }
            </div>
            <Login status={status} setStatus={setStatus} />
        </div>
    );
}