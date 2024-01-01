import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData } from '../../../services/FetchNodeServices';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { makeStyles } from '@mui/styles';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import CartSummary from './CartSummary';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import BuyButtons from './BuyButtons';
import CheckIcon from '@mui/icons-material/Check';

var useStyles = makeStyles({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center'
    },
    right: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center'
    }
})

export default function CartProducts(props) {

    var dispatch = useDispatch()
    var navigate = useNavigate()
    var products = props.cartProducts
    const [refresh, setRefresh] = useState(false)
    const [wishlistDialog, setWishlistDialog] = useState(false)

    const handleCloseWishlistDialog = () => {
        setWishlistDialog(false);
    };

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [value, setValue] = useState(5);

    const classes = useStyles();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

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

    const removeProductStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: matches_md ? '80%' : '30%',
        bgcolor: '#191919',
        color: 'white',
        boxShadow: 0,
        p: 5,
        borderRadius: 2
    };

    useEffect(function () {
        props.setRefresh(!props.refresh)
    }, [props])

    const rating = () => {
        return (
            <Box>
                <Rating name="read-only" value={value} readOnly style={{ color: '#12DAA8' }} />
            </Box>
        )
    }

    const handleProductClick = (item) => {
        var staticURL = `${item.brandname} ${item.productname} ${item.modelno} ${item.color}`
        var staticURLArray = staticURL.split(' ')
        var dynamicURL = staticURLArray.join('-').toLowerCase()
        window.scrollTo(0, 0);
        navigate(`/product/?${dynamicURL}`, { state: { product: item } });
    }

    const handleQtyChange = (product, value) => {
        if (value <= 0) {
            dispatch({ type: 'DELETE_PRODUCT', payload: [product.productdetailsid, product] })
        }
        else {
            product['qty'] = value
            dispatch({ type: 'EDIT_PRODUCT', payload: [product.productdetailsid, product] })
        }
        props.setRefresh(!props.refresh)
    }

    const handleWishlist = (item, id) => {
        var count = item.qty * 0;
        var body = { ...item, qty: count }
        dispatch({ type: 'ADD_PRODUCT_WISHLIST', payload: [id, body] })
        dispatch({ type: 'DELETE_PRODUCT', payload: [id, item] })
        setWishlistDialog(true)
        props.setRefresh(!props.refresh)
    }

    const addedToWishlistDialog = () => {
        return (
            <div style={{ position: 'relative', width: '100%' }}>
                <Modal
                    style={{ background: '#9b9b9ba1' }}
                    open={wishlistDialog}
                    onClose={handleCloseWishlistDialog}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}>
                    <Fade in={wishlistDialog}>
                        <Box sx={style}>
                            <CloseIcon onClick={handleCloseWishlistDialog} fontSize='large' style={{ position: 'absolute', top: '6%', right: '4%', cursor: 'pointer' }} />
                            <h3 style={{ fontWeight: 500, fontSize: 25, margin: 0, display: 'flex', alignItems: 'center' }}>
                                <CheckIcon style={{ color: '#00E9BF', marginRight: '2%' }} fontSize='large' />
                                Item moved to Wishlist
                            </h3>
                        </Box>
                    </Fade>
                </Modal>
            </div >
        )
    }

    const cartProductComponent = () => {
        return products.map((item, i) => {

            var imageArray = item.picture.split(',')
            var mainImage = imageArray[0]
            const formattedOfferPrice = (item.offerprice * item.qty).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
            });
            const formattedPrice = (item.price * item.qty).toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
            });
            const originalPrice = item.price * item.qty;
            const offerPrice = item.offerprice * item.qty;
            const discount = originalPrice - offerPrice
            const percentageDiscount = Math.floor(((originalPrice - offerPrice) / originalPrice) * 100)

            return (
                <div key={i}>
                    <Grid container spacing={1} style={{ width: '100%', display: 'flex', alignItems: 'start', padding: matches_md ? '3% 2%' : '3% 0' }}>

                        <Grid item md={3} onClick={() => handleProductClick(item)} style={{ cursor: 'pointer' }}>
                            <center><img src={`${serverURL}/images/${mainImage}`} style={{ width: matches_md ? '60%' : '80%', height: matches_md ? '60%' : '80%' }} /></center>
                        </Grid>

                        <Grid item md={9} style={{ width: '100%' }}>
                            <Grid container spacing={1}>
                                <Grid item md={8} style={{ width: '100%' }}>
                                    <h3 onClick={() => handleProductClick(item)} style={{ fontWeight: 500, fontSize: matches_md ? 20 : 25, margin: '1% 0', cursor: 'pointer' }}>{`${item.brandname} ${item.modelno} ${item.productname.substring(0, 50)}...`}</h3>
                                    <p style={{ display: 'inline-block', marginBottom: '0 0 1%', border: '1px solid #FF02B9', borderRadius: 5, padding: '1% 2%', fontSize: 16, fontWeight: 600, color: '#FF02B9' }}>
                                        {item.status}
                                    </p>
                                    <p style={{ display: 'inline-block', border: '1px solid gainsboro', borderRadius: 5, padding: '1% 2%', fontWeight: 500, fontSize: 16, margin: 0, marginLeft: '2%' }}>Qty: {item.qty}</p>


                                    <p style={{ display: 'block', margin: '1% 0 0.5%', fontSize: 16, fontWeight: 400, opacity: '100%', color: '#12DAA4' }}>
                                        4.8 (193 Ratings & 185 Reviews) {rating()}
                                    </p>

                                    {matches_md ? <></> : <div style={{ width: 'fit-content', display: 'flex', justifyContent: 'left', margin: '2% 0 4%', fontSize: 14, fontWeight: 400, opacity: '70%', background: '#353535', borderRadius: 10, padding: '2%' }}>
                                        <LocationOnIcon /> Delivery within 7 days<br />
                                        Will be delivered by 17 November 2023
                                    </div>}

                                </Grid>
                                <Grid item md={4} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <h3 style={{ fontWeight: 500, fontSize: 30, margin: '2% 0 0' }}>
                                        {formattedOfferPrice}
                                    </h3>

                                    <span style={{ fontSize: matches_md ? 13 : 16 }}>(Incl. all Taxes)</span>
                                    <hr style={{ width: '100%', opacity: '20%' }} />

                                    <div style={{ fontSize: 18, opacity: '100%', fontWeight: 400, margin: 0 }}>
                                        <font style={{ opacity: '70%' }}>MRP:</font> &nbsp;
                                        <s style={{ fontSize: 18, opacity: '70%', fontWeight: 400 }}>
                                            {formattedPrice}
                                        </s>

                                        <p style={{ display: 'inline-block', fontSize: 18, fontWeight: 400, margin: '0 2%', opacity: '70% ' }}>
                                            {`(Save ₹${discount})`}
                                        </p>

                                        <p style={{ display: 'inline-block', border: '1px solid #FF02B9', borderRadius: 5, padding: '1% 2%', fontSize: 18, fontWeight: 600, margin: '2% 0', color: '#FF02B9' }}>
                                            {percentageDiscount}% Off
                                        </p>
                                    </div>
                                    <hr style={{ width: '100%', opacity: '20%', display: matches_md ? 'none' : '' }} />
                                </Grid>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '3%', width: '100%' }}>
                                    <div style={{ width: '50%' }}>
                                        <Button variant='outlined' fullWidth
                                            onClick={() => handleWishlist(item, item.productdetailsid)}
                                            style={{ padding: '2% 6%', borderRadius: 8, color: 'white', border: '1px solid white', fontWeight: 500, fontSize: matches_md ? 11 : 16, width: matches_md ? '50%' : '' }} >
                                            Move to Wishlist
                                        </Button>
                                    </div>
                                    <div style={{ width: '50%' }}>
                                        <BuyButtons product={item} onChange={(value) => handleQtyChange(item, value)} setRefresh={setRefresh} refresh={refresh} screen='cart' buttonBg='#00E9BF' border='none' color='black' />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                    </Grid><br />
                    <hr style={{ width: '100%', opacity: '20%' }} />
                </div >
            );
        });
    };

    return (
        <div style={{ padding: matches_md ? '2%' : '1% 5%' }}>
            {addedToWishlistDialog()}
            <Grid container spacing={1} style={{ padding: '2%' }}>
                <Grid item md={8} style={{ padding: matches_sm ? 0 : '0 2% 0 0' }}>
                    {cartProductComponent()}
                </Grid>
                <Grid item md={4} style={{ paddingLeft: '1%', width: '100%' }}>
                    <div style={{ position: matches_md ? 'relative' : 'sticky', top: matches_md ? 0 : '24%', width: '100%' }}>
                        <CartSummary products={products} screen='cart' />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}