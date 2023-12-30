import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData } from '../../../services/FetchNodeServices';
// import useStyles from './screens/ProjectCSS';
import Typography from '@mui/material/Typography';
import { Button, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import FormGroup from '@mui/material/FormGroup';


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

    const classes = useStyles();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const sliderRef = useRef(null);

    const [product, setProduct] = useState(props.product)

    const [expanded, setExpanded] = useState('panel1');


    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };



    const productDetailsAccordians = () => {

        const showDescription = () => {
            return (
                <div style={{ width: '100%' }}>
                    <Grid container spacing={1} style={{ width: '100%' }}>
                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>Name</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{`${props.brandname} ${props.productname} ${props.modelno}`}</h3>
                        </Grid>

                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>Category</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{props.categoryname}</h3>
                        </Grid>

                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>Brand</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{props.brandname}</h3>
                        </Grid>
                    </Grid>

                </div>
            )
        };



        const showSpecifications = () => {
            return (
                <div style={{ width: '100%' }}>
                    <Grid container spacing={1} style={{ width: '100%' }}>
                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>Model</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{props.modelno}</h3>
                        </Grid>

                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>Color</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{props.color}</h3>
                        </Grid>

                        <Grid item md={4} style={{ width: '100%', marginTop: matches_md ? '3%' : 0 }}>
                            <h3 className={classes.specsHeading} style={{ fontWeight: 600 }}>HSN Code</h3>
                            <h3 className={classes.specsContent} style={{ fontWeight: 500, fontSize: 20 }}>{props.hsncode}</h3>
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
        </div>
    );
}