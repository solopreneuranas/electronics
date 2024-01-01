import React, { useEffect, useState } from 'react';
import { Grid, Button, Box } from "@mui/material"
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL } from '../../../services/FetchNodeServices';
import CheckIcon from '@mui/icons-material/Check';
import { useDispatch } from 'react-redux';

export default function BuyButtons(props) {

    var dispatch = useDispatch()
    var navigate = useNavigate()
    const [count, setCount] = useState(props.product.qty)
    const [open, setOpen] = React.useState(false);
    const theme = useTheme()
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const product = props.product

    useEffect(function () {
        setCount(props.product.qty)
        props.setRefresh(!props.refresh)
    }, [props])

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: matches_md ? '80%' : '35%',
        bgcolor: '#191919',
        color: 'white',
        p: matches_md ? '8% 6%' : '4%',
        borderRadius: 1
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = () => {
        var c = count + 1
        if (count < 10) {
            setCount(c)
            props.onChange(c)
        }
        setOpen(true);
    }
    const handleRemove = () => {
        var c = count - 1
        if (count > 0) {
            setCount(c)
            props.onChange(c)
        }
        else if (count < 0 || count == 0 ) {
            dispatch({ type: 'DELETE_PRODUCT', payload: [product.productdetailsid, product] })
            setOpen(false)
        }
        props.setRefresh(!props.refresh)
    }
    const handleBuyButton = () => {
        navigate('/cart')
        window.scrollTo(0, 0)
    }

    const cartDialog = () => {
        const formattedOfferPrice = product.offerprice.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        });

        const formattedPrice = product.price.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        });
        return (
            <div style={{ position: 'relative', width: '100%' }}>
                <Modal
                    style={{ background: '#9b9b9ba1' }}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}>
                    <Fade in={open}>
                        <Box sx={style}>
                            <CloseIcon onClick={handleClose} fontSize='large' style={{ position: 'absolute', top: '6%', right: '4%', cursor: 'pointer' }} />
                            <Grid container spacing={1} style={{ display: 'flex', alignItems: 'start' }}>
                                <Grid item sm={12}>
                                    {count > 0 ?
                                        < h3 style={{ fontWeight: 500, fontSize: 25, margin: 0, display: 'flex', alignItems: 'center' }}>
                                            {props.screen == 'product' ?
                                                <>
                                                    <CheckIcon style={{ color: '#00E9BF', marginRight: '2%' }} fontSize='large' />
                                                    1 item added to cart!
                                                </> :
                                                <>
                                                    Edit Cart Quantity!
                                                </>
                                            }
                                        </h3> :
                                        <></>
                                    }
                                </Grid>
                                <Grid item sm={3} style={{ display: 'flex', alignItems: 'start', padding: '2%' }}>
                                    <center><img src={`${serverURL}/images/${product.picture.split(',')[0]}`} style={{ width: matches_sm ? '80%' : '100%', height: matches_sm ? '80%' : '100%' }} /></center>
                                </Grid>
                                <Grid item sm={7} style={{ display: 'flex', alignItems: 'start', padding: '2%' }}>
                                    <h3 style={{ fontWeight: 400, fontSize: 18, margin: 0 }}>{`${product.brandname} ${product.productname} ${product.modelno} ${product.color}`}</h3>
                                </Grid>
                                <Grid item sm={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', padding: '2%' }}>
                                    <h3 style={{ fontWeight: 500, fontSize: 22, margin: 0 }}>{formattedOfferPrice}</h3>
                                    <s style={{ fontSize: 18, opacity: '70%', fontWeight: 400 }}>
                                        {formattedPrice}
                                    </s>
                                </Grid>
                            </Grid>
                            <hr style={{ opacity: '40%' }} />
                            <Grid container spacing={1} style={{ marginTop: '3%', display: 'flex', justifyContent: 'center' }}>
                                <Grid item sm={12} style={{ width: '100%', display: "flex", justifyContent: 'center', alignItems: "center", flexDirection: "row", gap: '3%' }}>
                                    <Fab onClick={handleRemove} size="medium" aria-label="add" style={{ background: 'transparent', border: '1px solid white', color: 'white', marginRight: '1%' }}>
                                        <RemoveIcon />
                                    </Fab>
                                    <p style={{ fontSize: 20 }}>{count}</p>
                                    <Fab onClick={handleAdd} size="medium" aria-label="add" style={{ background: 'transparent', border: '1px solid white', color: 'white', marginLeft: '1%' }}>
                                        <AddIcon />
                                    </Fab>
                                    {props.screen == 'product' ?
                                        <>
                                            <Button onClick={handleBuyButton} variant='contained'
                                                style={{ width: 250, opacity: product.stock ? '100%' : '30%', padding: '2% 0', borderRadius: 10, color: 'black', background: '#00E9BF', border: '1px solid #00E9BF', fontWeight: 600, fontSize: 18, boxShadow: 'none' }}
                                            >
                                                Proceed to cart
                                            </Button>
                                        </>
                                        :
                                        <></>
                                    }

                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </div >
        )
    }

    return (
        <div style={{ width: '100%' }}>
            {cartDialog()}
            <Grid container spacing={3}>
                <Grid item sm={12} style={{ width: '100%', display: "flex", alignItems: "center", flexDirection: "row", gap: '3%' }}>
                    {count > 0 ?
                        <Button onClick={handleOpen} variant='contained'
                            style={{ width: 250, height: '100%', opacity: product.stock ? '100%' : '30%', padding: '2% 0', borderRadius: 10, color: props.color, background: props.buttonBg, border: props.border, fontWeight: 600, fontSize: 18, boxShadow: 'none' }}
                        >
                            {props.screen == 'cart' ? <>Qty: {product.qty}</> : <>Checkout</>}
                        </Button>
                        :
                        <>
                            {props.screen == 'product' ?
                                <>
                                    <Button onClick={handleOpen} variant='contained'
                                        style={{ width: 250, opacity: product.stock ? '100%' : '30%', padding: '2% 0', borderRadius: 10, color: 'white', background: 'transparent', border: '1px solid white', fontWeight: 600, fontSize: 18, boxShadow: 'none' }}
                                    >
                                        Add to Cart
                                    </Button>
                                    <Button onClick={handleBuyButton} variant='contained'
                                        style={{ width: 250, opacity: product.stock ? '100%' : '30%', padding: '2% 0', borderRadius: 10, color: 'black', background: '#00E9BF', border: '1px solid #00E9BF', fontWeight: 600, fontSize: 18, boxShadow: 'none' }}
                                    >
                                        {product.stock ? 'Buy Now' : 'Out of Stock'}
                                    </Button>
                                </>
                                : <></>
                            }
                        </>
                    }
                </Grid>
            </Grid>
        </div>
    )
}
