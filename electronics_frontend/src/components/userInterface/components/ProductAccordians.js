import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData, postData } from '../../../services/FetchNodeServices';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import FormGroup from '@mui/material/FormGroup';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReviewDrawer from './ReviewDrawer';
import Login from './Login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
    },
    specsHeading: {
        fontWeight: 500,
        fontSize: '20px',
        textTransform: 'capitalize',
        margin: 0
    },
    specsContent: {
        fontWeight: 600,
        fontSize: '22px',
        textTransform: 'capitalize',
        margin: 0
    }
})


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '2rem', color: 'white' }} />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, .05)'
            : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function ProductAccordians(props) {

    var dispatch = useDispatch()
    var navigate = useNavigate()
    const classes = useStyles();
    const theme = useTheme();
    var user = JSON.parse(localStorage.getItem("User"))
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var number = user ? user[0]?.mobileno : ''
    const [status, setStatus] = useState(false)
    const sliderRef = useRef(null);
    const product = props.product
    const [expanded, setExpanded] = useState('panel1');
    const [reviews, setReviews] = useState([])
    const [isPurchased, setIsPurchased] = useState(false)
    const [isReview, setIsReview] = useState(false)

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const fetchAllReviews = async () => {
        var body = { 'productdetailsid': product.productdetailsid }
        var response = await postData('ui-Home/fetch_all_reviews_by_product', body)
        setReviews(response.data)
    }

    const checkUserOrder = async () => {
        var body = { 'mobileno': number, 'productdetailsid': product.productdetailsid }
        var response = await postData('ui-Home/check_user_order', body)
        if (response.status === true) {
            setIsPurchased(true)
        }
        else {
            setIsPurchased(false)
        }
    }

    const checkUserReview = async () => {
        var body = { 'mobileno': number, 'productdetailsid': product.productdetailsid }
        var response = await postData('ui-Home/check_user_review', body)
        if (response.status === true) {
            setIsReview(true)
        }
        else {
            setIsReview(false)
        }
    }

    useEffect(function () {
        fetchAllReviews()
        checkUserOrder()
        checkUserReview()
    }, [])

    const rating = (value) => {
        return (
            <Box>
                <Rating name="read-only" value={value} readOnly
                    style={{ color: '#12DAA8' }} />
            </Box>
        )
    }

    const months = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ]

    const handleLoginOpen = () => {
        if (user) {
            product['qty'] = 1
            dispatch({ type: 'ADD_PRODUCT', payload: [product.productdetailsid, product] })
            navigate('/cart')
            window.scrollTo(0, 0)
        }
        else {
            setStatus(true);
            product['qty'] = 1
            dispatch({ type: 'ADD_PRODUCT', payload: [product.productdetailsid, product] })
        }
    };

    const productDetailsAccordians = () => {

        const showDescription = () => {
            return (
                <div style={{ width: '100%' }}>
                    <Grid container spacing={1} style={{ width: '100%' }}>
                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>Name</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{`${product.brandname} ${product.productname} ${product.modelno}`}</h3>
                        </Grid>

                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>Category</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{product.categoryname}</h3>
                        </Grid>

                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>Brand</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{product.brandname}</h3>
                        </Grid>
                    </Grid>

                </div>
            )
        }

        const showSpecifications = () => {
            return (
                <div style={{ width: '100%' }}>
                    <Grid container spacing={1} style={{ width: '100%' }}>
                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>Model</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{product.modelno}</h3>
                        </Grid>

                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>Color</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{product.color}</h3>
                        </Grid>

                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>HSN Code</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{product.hsncode}</h3>
                        </Grid>
                    </Grid>

                </div>
            )
        };

        const showGallery = () => {
            return (
                <div style={{ width: '100%' }}>
                    <Grid container spacing={1} style={{ width: '100%' }}>
                        <Grid item md={12} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <center>
                                <img src='https://m.media-amazon.com/images/S/aplus-media-library-service-media/1ee58811-6153-4cb1-ba20-3b8785dab2d0.__CR0,0,1464,600_PT0_SX1464_V1___.jpg' style={{ width: '100%', height: '100%', marginTop: '-1%' }} />

                                <img src='https://m.media-amazon.com/images/S/aplus-media-library-service-media/bbca37ae-c1c8-41e5-8240-1c5341504c87.__CR0,0,1464,600_PT0_SX1464_V1___.jpg' style={{ width: '100%', height: '100%', marginTop: '-1%' }} />

                                <img src='https://m.media-amazon.com/images/S/aplus-media-library-service-media/006d774d-6b56-4f99-8651-9ddadbd99b95.__CR0,0,1464,600_PT0_SX1464_V1___.jpg' style={{ width: '100%', height: '100%', marginTop: '-1%' }} />

                                <img src='https://m.media-amazon.com/images/S/aplus-media-library-service-media/95d110b7-b648-4573-a264-dd143ac89ff2.__CR0,0,1464,600_PT0_SX1464_V1___.jpg' style={{ width: '100%', height: '100%', marginTop: '-1%' }} />

                                <img src='https://m.media-amazon.com/images/S/aplus-media-library-service-media/fe399738-1e0a-4b66-99c0-907fb1be34c1.__CR0,0,1464,600_PT0_SX1464_V1___.jpg' style={{ width: '100%', height: '100%', marginTop: '-1%' }} />

                            </center>
                        </Grid>
                    </Grid>

                </div>
            )
        };

        const showReviews = () => {
            return (
                <div>
                    <Grid container spacing={1} style={{ width: '100%' }}>
                        <Grid item md={12} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 style={{ margin: 0, fontWeight: 500, fontSize: 16 }}>Review this Product</h3>
                            <p style={{ fontSize: 14, opacity: '70%', margin: 0 }}>Help other customers make their decision</p><br />
                            {
                                isReview ?
                                    <>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5%' }}>
                                            <CheckCircleIcon style={{ color: '#00E9BF', width: 30 }} />
                                            <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>You have reviewed this Product!</h3>
                                        </div>
                                    </>
                                    :
                                    isPurchased ?
                                        <>
                                            <ReviewDrawer product={product} />
                                        </>
                                        :
                                        <>
                                            <Button onClick={handleLoginOpen} variant='outlined' style={{ margin: 0, fontWeight: 500, fontSize: 15, border: '1px solid white', color: 'white', padding: '1% 3%', borderRadius: 10 }}>
                                                Purchase to write a Review
                                            </Button>
                                        </>
                            }
                        </Grid>
                    </Grid><br />
                    <hr style={{ opacity: '50%' }} /><br />
                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 20 }}>Customer Reviews</h3>
                    {
                        reviews.length == 0 ?
                            <>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 18, opacity: '50%' }}>This product has no Review yet!</h3>
                            </>
                            :
                            <>
                                {
                                    reviews.map((item, i) => {

                                        var date = new Date(item.date);
                                        var year = date.getFullYear();
                                        var month = date.getMonth()
                                        var day = date.getDate().toString().padStart(2, '0')
                                        var formattedDate = `${day} ${months[month]} ${year}`

                                        return (
                                            <div style={{ width: '100%' }}>
                                                <Grid container spacing={1} style={{ width: '30%', marginTop: '2%' }}>
                                                    <Grid item md={6} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                                                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: 19 }}>{item.firstname}</h3>
                                                    </Grid>
                                                    <Grid item md={6} style={{ width: '100%', marginTop: matches_md ? '3%' : 0, display: 'flex', alignItems: 'center', gap: '3%' }}>
                                                        <CheckCircleIcon style={{ color: '#00E9BF', width: 18 }} />
                                                        <p style={{ margin: 0, fontWeight: 400, fontSize: 14 }}> Verified Purchased</p>
                                                    </Grid>
                                                    <Grid item md={6} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                                                        <h3 style={{ margin: 0, fontWeight: 400, fontSize: 14 }}>{rating(item.ratings)}</h3>
                                                    </Grid>
                                                    <Grid item md={6} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                                                        <p style={{ margin: 0, fontWeight: 400, fontSize: 14 }}>{formattedDate}</p>
                                                    </Grid>
                                                </Grid>
                                                <Grid container spacing={1}>
                                                    <Grid item md={12} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                                                        <p style={{ margin: 0, fontWeight: 400, fontSize: 16 }}>{item.description}</p>
                                                    </Grid>
                                                </Grid><br />
                                                <hr style={{ opacity: '50%' }} />
                                            </div>
                                        )
                                    })
                                }
                            </>
                    }
                </div>
            )
        };

        const accordianItems = [
            {
                title: 'DESCRIPTION',
                content: showDescription()
            },
            {
                title: 'SPECIFICATIONS',
                content: showSpecifications()
            },
            {
                title: 'Product Gallery',
                content: showGallery()
            },
            {
                title: 'Product Reviews',
                content: showReviews()
            }
        ]

        const accordian = () => {
            return (
                accordianItems.map((item, i) => {
                    const panel = `panel${i + 1}`;
                    return (
                        <Accordion key={i} defaultExpanded={true} onChange={handleChange(panel)} style={{ padding: '1%', background: '#191919', color: 'white', border: '1px solid #404040', margin: '2% 0', borderRadius: 8 }}>
                            <AccordionSummary aria-controls={`${panel}d-content`} id={`${panel}d-header`}>
                                <Typography style={{ fontSize: matches_sm ? 25 : 27, fontWeight: 600, color: 'white' }}>{item.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <FormGroup>
                                    {item.content}
                                </FormGroup>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
            );
        };

        return (
            <div>
                {accordian()}
            </div >
        );

    };



    return (
        <div>
            {productDetailsAccordians()}
            <Login status={status} setStatus={setStatus} />
        </div>
    );
}