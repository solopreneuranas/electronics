import React, { useRef, useEffect, useState } from 'react';
import { AppBar, Box, Grid, Toolbar, Button } from "@mui/material";
import Croma from "../../../assets/croma-logo.svg"
import { makeStyles } from "@mui/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { getData, postData } from '../../../services/FetchNodeServices';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { serverURL } from '../../../services/FetchNodeServices';

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


const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `0 solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function HamburgerMenu(props) {

    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


    const useStyle = useStyles()
    const theme = useTheme()
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [categories, setCategories] = useState([])
    const [products, setProducts] = useState([])

    const [hoveredIndex, setHoveredIndex] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const handleAccordianClick = (categoryid, event) => {
        //setAnchorEl(event.currentTarget);
        fetchProducts(categoryid)
    };
    // const handleClose = () => {
    //     setAnchorEl(null);
    // };


    const fetchCategories = async () => {
        const response = await getData('ui-Home/display_all_category')
        setCategories(response.data)
    }

    const fetchProducts = async (categoryid) => {
        const response = await postData('ui-Home/fetch_products_by_category', { 'categoryid': categoryid })
        setProducts(response.data)
    }

    useEffect(() => {
        fetchCategories()
        fetchProducts()
    }, [])


    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };


    const showProducts = () => {
        return (
            products.map((item) => {
                return (
                    <div>
                        <p>
                           - {item.productname.substring(0, 50)}...
                        </p>
                    </div>
                )
            })
        )
    }

    const showCategories = () => {
        return (
            categories.map((item, i) => {

                const AccordionSummary = styled((props) => (
                    <MuiAccordionSummary
                        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '1.2rem', color: isHovered ? 'black' : 'white' }} />}
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

                const isHovered = i === hoveredIndex;
                return (
                    <div>

                        <Accordion
                            onMouseEnter={() => handleMouseEnter(i)}
                            onMouseLeave={handleMouseLeave}
                            onClick={(event) => handleAccordianClick(item.categoryid, event)}
                            expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)} style={{ backgroundColor: isHovered ? '#00E9BF' : 'transparent', color: isHovered ? 'black' : 'white', border: 'none' }}>
                            <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                    <img src={`${serverURL}/images/${item.image}`} style={{ width: 60, height: 50, marginRight: '5%'}} />
                                    <h3 style={{ margin: 0, fontWeight: 500 }}>{item.categoryname}</h3>
                                </div>
                            </AccordionSummary>
                            <AccordionDetails>

                                {showProducts()}

                            </AccordionDetails>
                        </Accordion>

                    </div>

                )
            })
        )
    }


    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 350 }}
            role="presentation"
        >
            <h3 style={{ marginLeft: '5%', fontWeight: 500 }}>Shop by Category</h3>
            <Divider style={{ background: 'gray' }} />

            <List>
                {showCategories()}
            </List>
        </Box>
    );


    return (
        <div>
            <div style={{ position: 'relative' }}>

                <React.Fragment key='right' >
                    <MenuIcon onClick={toggleDrawer('right', true)} style={{ fontSize: 30, margin: '0 5%', cursor: 'pointer' }} />
                    <Drawer
                        style={{ background: '#9b9b9ba1' }}
                        anchor='right'
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                    >
                        <CloseIcon onClick={toggleDrawer('right', false)} fontSize='medium' style={{ position: 'absolute', top: '2.5%', right: '4%', cursor: 'pointer' }} />
                        {list('right')}
                    </Drawer>
                </React.Fragment>

            </div>
        </div >
    )

}