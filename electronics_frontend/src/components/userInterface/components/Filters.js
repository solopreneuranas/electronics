import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData } from '../../../services/FetchNodeServices';
import useStyles from '../components/screens/ProjectCSS';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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



export default function Filters() {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [value, setValue] = useState(5);

    const classes = useStyles();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const [expanded, setExpanded] = useState('panel1');

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])
    const [featured, setFeatured] = useState([])
    const [colors, setColors] = useState([])

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const fetchCategories = async () => {
        const response = await getData('ui-Home/display_all_category')
        setCategories(response.data)
    }

    const fetchBrands = async () => {
        const response = await getData('ui-Home/fetch_brands')
        setBrands(response.data)
    }

    const fetchFeatured = async () => {
        const response = await getData('ui-Home/fetch_product_details_for_status')
        setFeatured(response.data)
    }

    const fetchColors = async () => {
        const response = await getData('ui-Home/fetch_product_details_for_colors')
        setColors(response.data)
    }


    useEffect(() => {
        fetchCategories()
        fetchBrands()
        fetchFeatured()
        fetchColors()
    }, []);


    const showCategories = () => {
        return (
            categories.map((item, index) => (
                <FormControlLabel style={{ margin: '1% 0' }}
                    key={index}
                    control={<Checkbox style={{ color: '#12DAA8', transform: 'scale(1.2)', opacity: '100%'}} />}
                    label={
                        <Typography
                            style={{ fontSize: '19px', fontWeight: 400, color: 'white' }}
                        >
                            {item.categoryname}
                        </Typography>
                    }
                />
            ))
        );
    };

    const showBrands = () => {
        return (
            brands.slice(0, 8).map((item, index) => (
                <FormControlLabel style={{ margin: '1% 0' }}
                    key={index}
                    control={<Checkbox style={{ color: '#12DAA8', transform: 'scale(1.2)', opacity: '100%' }} />}
                    label={
                        <Typography
                            style={{ fontSize: '19px', fontWeight: 400, color: 'white' }}
                        >
                            {item.brandname}
                        </Typography>
                    }
                />
            ))
        );
    };


    const showRange = () => {
        return (
            <FormControlLabel style={{ margin: '1% 0' }}
                control={<Checkbox style={{color: '#12DAA8', transform: 'scale(1.2)', opacity: '100%' }} />}
                label={
                    <Typography
                        style={{ fontSize: '19px', fontWeight: 400, color: 'white' }}
                    >
                        1,000-2,000
                    </Typography>
                }
            />

        );
    };

    const showStatus = () => {
        return (
            featured.map((item, i) => (
                <FormControlLabel style={{ margin: '1% 0' }}
                    control={<Checkbox style={{ color: '#12DAA8', transform: 'scale(1.2)', opacity: '100%' }} />}
                    label={
                        <Typography
                            style={{ fontSize: '19px', fontWeight: 400, color: 'white' }}
                        >
                            {item.status}
                        </Typography>
                    }
                />
            ))
        );
    };

    const showColor = () => {
        return (
            colors.map((item, i) => (
                <FormControlLabel style={{ margin: '1% 0' }}
                    control={<Checkbox style={{ color: '#12DAA8', transform: 'scale(1.2)', opacity: '100%' }} />}
                    label={
                        <Typography
                            style={{ fontSize: '19px', fontWeight: 400, color: 'white' }}
                        >
                            {item.color}
                        </Typography>
                    }
                />
            ))
        );
    };

    const accordianItems = [
        {
            title: 'FEATURED',
            content: showStatus()
        },
        {
            title: 'CATEGORIES',
            content: showCategories()
        },
        {
            title: 'BRANDS',
            content: showBrands()
        },
        {
            title: 'Colors',
            content: showColor()
        },
        {
            title: 'RANGE',
            content: showRange()
        }
    ]

    const accordian = () => {
        return (
            accordianItems.map((item, i) => {
                const panel = `panel${i + 1}`;
                return (
                    <Accordion key={i} defaultExpanded={true} onChange={handleChange(panel)} style={{ background: '#191919', color: 'white', border: 'none' }}>
                        <AccordionSummary aria-controls={`${panel}-content`} id={`${panel}-header`}>
                            <Typography style={{ fontSize: '22px', fontWeight: 500, color: 'white' }}>{item.title}</Typography>
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
        </div>
    );
}