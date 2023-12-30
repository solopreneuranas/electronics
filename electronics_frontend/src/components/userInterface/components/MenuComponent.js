import React, { useRef, useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData, postData } from '../../../services/FetchNodeServices';
import { makeStyles } from "@mui/styles";
import { AppBar, Box, Grid, Toolbar } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';

import ProductsSlider from './ProductsSlider';

var useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: '700px',
        height: 'auto',
        padding: '1.5%',
        borderRadius: '10px'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default function MenuComponent() {

    var navigate = useNavigate()

    const theme = useTheme()
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'))
    const matches_md = useMediaQuery(theme.breakpoints.down('md'))
    const useStyle = useStyles()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [categoryId, setCategoryId] = useState('')
    const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])
    const [brands, setBrands] = useState([])

    const fetchCategories = async () => {
        const response = await getData('ui-Home/display_all_category')
        setCategories(response.data)
    }

    const fetchProducts = async (categoryid) => {
        const response = await getData(`ui-Home/fetch_product_details_by_category/?categoryid=${categoryid}`)
        setProducts(response.data)
    }

    const fetchBrands = async (categoryid) => {
        const response = await postData('ui-Home/fetch_brands_by_category', { 'categoryid': categoryid })
        setBrands(response.data)
    }

    useEffect(() => {
        fetchCategories()
        fetchProducts()
        fetchBrands()
    }, [])


    const handleProductClick = (item) => {
        var staticURL = `${item.brandname} ${item.productname} ${item.modelno} ${item.color}`
        var staticURLArray = staticURL.split(' ')
        var dynamicURL = staticURLArray.join('-').toLowerCase()
        window.scrollTo(0, 0);
        navigate(`/product/?${dynamicURL}`, { state: { product: item } });
        setAnchorEl(null);
    }

    const showCategories = () => {
        return (
            categories.map((item) => {
                return (
                    <Button style={{ color: 'white', fontWeight: 400, fontFamily: 'Poppins', fontSize: 16, textTransform: 'capitalize', paddingTop: '1%', paddingBottom: '1%' }}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => handleClick(item.categoryid, item.categoryname, event)}
                    >
                        <div>
                            {/* <center>
                                <img
                                    src={`${serverURL}/images/${item.image}`}
                                    style={{ width: 70, height: 60 }}
                                />
                            </center> */}

                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <p style={{ fontSize: 17, margin: 0 }}>{item.categoryname}</p>
                                <KeyboardArrowDownIcon />
                            </div>
                        </div>
                    </Button>
                )
            })
        )
    }

    const showProducts = () => {
        return (
            products.slice(0, 5).map((item) => {
                var imageArray = item.picture.split(',')
                var mainImage = imageArray[0]

                const formattedOfferPrice = item.offerprice.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2,
                });

                const formattedPrice = item.price.toLocaleString('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 2,
                });

                var formattedProductName = item.productname.substring(0, 27)

                return (
                    <div>
                        <MenuItem onClick={() => handleProductClick(item)}
                            style={{ background: '#121212', color: 'white', padding: '1% 2%', fontFamily: 'Poppins', borderRadius: 8, marginBottom: '3%', overflowX: 'hidden' }}>
                            <Grid container spacing={2}>
                                <Grid item md={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <img
                                        src={`${serverURL}/images/${mainImage}`}
                                        style={{ width: 100, height: 90, marginRight: '3%' }}
                                    />
                                    <div>
                                        <h3 style={{ fontWeight: 400, fontSize: 18, margin: 0, width: '30%' }}>{`${item.brandname} ${item.modelno} ${formattedProductName}...`}</h3>
                                        <p style={{ margin: 0 }}>{formattedOfferPrice}
                                            <s style={{ opacity: '70%', marginLeft: '3%', fontWeight: 400 }}>
                                                {formattedPrice}
                                            </s>
                                        </p>
                                    </div>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    </div>
                )
            })
        )
    }

    const showBrands = () => {
        return (
            brands.slice(0, 7).map((item) => {
                return (
                    <div>
                        <MenuItem
                            style={{ background: 'black', color: 'white', padding: '1% 4%', fontFamily: 'Poppins' }} onClick={handleClose}>
                            <Grid container spacing={2}>
                                <Grid item md={12} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <img
                                        src={`${serverURL}/images/${item.logo}`}
                                        style={{ width: 80, height: 80, marginRight: '4%' }}
                                    />
                                    <h3 style={{ fontWeight: 400, fontSize: 20, margin: 0, width: '30%' }}>{item.brandname}</h3>
                                </Grid>
                            </Grid>
                        </MenuItem>
                    </div>
                )
            })
        )
    }


    const handleClick = (categoryid, categoryname, event) => {
        setAnchorEl(event.currentTarget);
        fetchBrands(categoryid);
        fetchProducts(categoryid);
        setCategoryId(categoryid);
        setCategoryName(categoryname);
    };


    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div style={{ position: "sticky", top: '11%', zIndex: 999 }} >

            <Grid container spacing={0}>
                <Grid item xs={12}>

                    {matches_md ? <></> : <AppBar position="static"
                        style={{ background: 'black', boxShadow: 'none' }} >
                        <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
                            {showCategories()}
                            <Menu
                                PaperProps={{
                                    style: {
                                        width: '100%',
                                        boxShadow: 'none',
                                        background: 'black',
                                        color: 'white',
                                        position: 'relative'
                                    },
                                }}

                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                }}
                            >

                                <Grid container spacing={1}>
                                    <CloseIcon onClick={handleClose} fontSize='large' style={{ position: 'absolute', top: '6%', right: '4%', cursor: 'pointer', color: 'gray', zIndex: 2 }} />
                                    <Grid item md={2} style={{ borderRight: '1px solid gray', padding: '2%' }}>
                                        <h3 style={{ fontWeight: 500, fontSize: 30, margin: 0, marginBottom: '1%' }}>Brands</h3>
                                        {showBrands()}
                                    </Grid>
                                    <Grid item md={4} style={{ borderRight: '1px solid gray', padding: '2%' }}>
                                        <h3 style={{ fontWeight: 500, fontSize: 30, margin: 0, marginBottom: '1%' }}>{categoryName}</h3>
                                        {showProducts()}
                                    </Grid>
                                    <Grid item md={6}>
                                        <ProductsSlider api='fetch_product_details_by_category' title={`Featured ${categoryName}`} categoryid={categoryId} slides={2} />
                                    </Grid>
                                </Grid>
                            </Menu>
                        </Toolbar>
                    </AppBar>}

                </Grid>
            </Grid>

        </div>
    );
}