import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData } from '../../../services/FetchNodeServices';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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

export default function WishlistProducts(props) {

    const classes = useStyles();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var dispatch = useDispatch()
    var navigate = useNavigate()
    var product = props.wishlistProducts
    const [refresh, setRefresh] = useState(false)
    const [removeDialog, setRemoveDialog] = useState(false);
    const [currentProductId, setCurrentProductId] = useState('')
    const [currentProduct, setCurrentProduct] = useState([])
    const [cartDialog, setCartDialog] = useState(false)

    const handleRemoveDialogOpen = (item) => {
        setRemoveDialog(true);
        setCurrentProductId(item.productdetailsid)
        setCurrentProduct(item)
    }

    const handleCartDialogOpen = () => {
        setCartDialog(true)
    };

    const handleRemoveDialogClose = () => {
        setRemoveDialog(false);
    }

    const handleCloseCartDialog = () => {
        setCartDialog(false)
    }

    const removeWishlistProduct = () => {
        dispatch({ type: 'DELETE_PRODUCT_WISHLIST', payload: [currentProductId, currentProduct] })
        props.setRefresh(!props.refresh)
        setRemoveDialog(false)
    }

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [value, setValue] = useState(5);

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

    const rating = () => {
        return (
            <Box>
                <Rating name="read-only" value={value} readOnly style={{ color: '#12DAA8' }} />
            </Box>
        )
    }

    const removeWishlistProductDialog = () => {
        return (
            <Modal
                style={{ background: '#9b9b9ba1' }}
                open={removeDialog}
                onClose={handleRemoveDialogClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={removeDialog}>
                    <Box sx={removeProductStyle}>
                        <CloseIcon onClick={handleRemoveDialogClose} fontSize='large' style={{ position: 'absolute', top: '6%', right: '4%', cursor: 'pointer' }} />
                        <center><h3 style={{ fontWeight: 500, fontSize: 25, margin: 0 }}>Are you sure you wany to remove this Product?</h3></center>
                        <Grid container spacing={2} style={{ marginTop: '3%' }}>
                            <Grid item sm={6} style={{ width: '50%' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '3%', justifyContent: 'center', width: '100%' }}>
                                    <Button variant='contained' onClick={handleRemoveDialogClose} fullWidth
                                        style={{ height: '100%', padding: '4% 0', borderRadius: 5, color: 'white', border: '1px solid white', background: 'transparent', fontWeight: 500, fontSize: 16, boxShadow: 'none' }}
                                    >No</Button>
                                </div>
                            </Grid>
                            <Grid item sm={6} style={{ width: '50%' }}>
                                <div style={{ display: 'flex', flexDirection: 'row', gap: '3%', justifyContent: 'center', width: '100%' }}>
                                    <Button variant='contained' fullWidth onClick={removeWishlistProduct}
                                        style={{ height: '100%', padding: '4% 0', borderRadius: 5, color: 'black', border: 'none', background: '#00E9BF', fontWeight: 500, fontSize: 16, boxShadow: 'none' }}
                                    >Yes</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>

        )
    }

    const handleProductClick = (item) => {
        var staticURL = `${item.brandname} ${item.productname} ${item.modelno} ${item.color}`
        var staticURLArray = staticURL.split(' ')
        var dynamicURL = staticURLArray.join('-').toLowerCase()
        window.scrollTo(0, 0);
        navigate(`/product/?${dynamicURL}`, { state: { product: item } });
    }

    const handleAddToCart = (id, product) => {
        var count = product.qty + 1;
        var body = { ...product, qty: count }
        dispatch({ type: 'ADD_PRODUCT', payload: [id, body] })
        dispatch({ type: 'DELETE_PRODUCT_WISHLIST', payload: [id, body] })
        props.setRefresh(!props.refresh)
        handleCartDialogOpen()
    }

    const addedToCartDialog = () => {
        return (
            <div style={{ position: 'relative', width: '100%' }}>
                <Modal
                    style={{ background: '#9b9b9ba1' }}
                    open={cartDialog}
                    onClose={handleCloseCartDialog}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}>
                    <Fade in={cartDialog}>
                        <Box sx={style}>
                            <CloseIcon onClick={handleCloseCartDialog} fontSize='large' style={{ position: 'absolute', top: '6%', right: '4%', cursor: 'pointer' }} />
                            <h3 style={{ fontWeight: 500, fontSize: 25, margin: 0, display: 'flex', alignItems: 'center' }}>
                                <CheckIcon style={{ color: '#00E9BF', marginRight: '2%' }} fontSize='large' />
                                Item moved to Cart
                            </h3>
                        </Box>
                    </Fade>
                </Modal>
            </div >
        )
    }

    const wishlistProductComponent = () => {

        return product.map((item, i) => {

            var imageArray = item.picture.split(',')
            var mainImage = imageArray[0]
            const formattedOfferPrice = item.offerprice.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
            })
            const formattedPrice = item.price.toLocaleString('en-IN', {
                style: 'currency',
                currency: 'INR',
                minimumFractionDigits: 2,
            })

            return (
                <div key={i}>
                    <Grid container spacing={1} style={{ width: '90%', margin: 'auto', display: 'flex', alignItems: 'start', padding: matches_md ? '3% 2%' : '3%', border: '1px solid #2D2D2D', borderRadius: 10, marginTop: '2%' }}>

                        <Grid item md={3} onClick={() => handleProductClick(item)} style={{ cursor: 'pointer' }}>
                            <center><img src={`${serverURL}/images/${mainImage}`} style={{ width: matches_md ? '60%' : '100%', height: matches_md ? '60%' : '80%' }} /></center>
                        </Grid>

                        <Grid item md={6} style={{ width: '100%' }}>
                            <Grid container spacing={1}>
                                <Grid item md={8} style={{ width: '100%' }}>
                                    <h3 onClick={() => handleProductClick(item)} style={{ fontWeight: 500, fontSize: matches_md ? 20 : 25, margin: '1% 0', cursor: 'pointer' }}>{`${item.brandname} ${item.modelno} ${item.productname.substring(0, 20)}..`}</h3>
                                    <p style={{ display: 'inline-block', marginBottom: '0 0 1%', border: '1px solid #FF02B9', borderRadius: 5, padding: '1% 2%', fontSize: 16, fontWeight: 600, color: '#FF02B9' }}>
                                        {item.status}
                                    </p>
                                    <p style={{ display: 'inline-block', border: '1px solid gainsboro', borderRadius: 5, padding: '1% 2%', fontWeight: 500, fontSize: 16, margin: 0, marginLeft: '2%' }}>Qty: {item.qty}</p>


                                    <p style={{ display: 'block', margin: '1% 0 0.5%', fontSize: 16, fontWeight: 400, opacity: '100%', color: '#12DAA4' }}>
                                        4.8 (193 Ratings & 185 Reviews) {rating()}
                                    </p>
                                    <hr style={{ width: '100%', opacity: '20%', display: matches_md ? 'none' : '' }} />
                                    <h3 style={{ fontWeight: 500, fontSize: 23, margin: '2% 0 0' }}>
                                        {formattedOfferPrice}
                                        <s style={{ fontSize: 16, opacity: '70%', fontWeight: 400, margin: '0 3%' }}>
                                            {formattedPrice}
                                        </s>
                                        <span style={{ fontSize: 13 }}>(Incl. all Taxes)</span>
                                    </h3>
                                    <hr style={{ width: '100%', opacity: '20%' }} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item md={3} style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            <Button variant='contained' fullWidth onClick={() => handleAddToCart(item.productdetailsid, item)}
                                style={{ padding: '2% 6%', borderRadius: 8, color: 'black', background: '#00E9BF', fontWeight: 600, fontSize: matches_md ? 11 : 16, width: matches_md ? '100%' : '' }} >
                                Move to Cart
                            </Button>
                            <Button onClick={() => handleRemoveDialogOpen(item)} variant='outlined' fullWidth
                                style={{ padding: '2% 6%', borderRadius: 8, color: 'white', border: '1px solid white', fontWeight: 500, fontSize: matches_md ? 11 : 16, width: matches_md ? '100%' : '', marginTop: matches_md ? '5%' : '8%' }} >
                                Remove from Wishlist
                            </Button>
                        </Grid>
                    </Grid>
                </div >
            );
        });
    };

    return (
        <div style={{ padding: matches_md ? '2%' : '1% 5%' }}>
            {removeWishlistProductDialog()}
            {addedToCartDialog()}
            <Grid container spacing={1} style={{ padding: '2%' }}>
                <Grid item md={12} style={{ padding: matches_sm ? 0 : '0 2% 0 0' }}>
                    {wishlistProductComponent()}
                </Grid>
            </Grid>
        </div>
    );
}