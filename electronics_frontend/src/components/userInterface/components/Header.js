import React, { useState } from 'react';
import { AppBar, Box, Grid, Toolbar, Button } from "@mui/material";
import Croma from "../../../assets/croma-logo.svg"
import { makeStyles } from "@mui/styles";
import SearchComponent from "../components/SearchComponents";
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import AccountCircle from '@mui/icons-material/AccountCircle'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { TextField, InputAdornment } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import HamburgerMenu from './HamburgerMenu';
import MenuComponent from './MenuComponent';
import { useSelector } from 'react-redux';
import Login from './Login';

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

export default function Header(props) {

    var navigate = useNavigate()
    const useStyle = useStyles()
    const theme = useTheme()
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [status, setStatus] = useState(false)
    var myCart = useSelector(state => state.cart)
    var cartProduct = Object.values(myCart)

    const handleClickOpen = () => {
        setStatus(true);
    };
    
    const handleCartIcon = () => {
        navigate('/cart')
        window.scrollTo(0, 0)
    }

    return (
        <div style={{ position: "sticky", top: 0, zIndex: 999 }} >
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <AppBar position="static"
                        style={{ background: 'black', boxShadow: 'none' }} >
                        <Toolbar style={{ height: matches_md ? 70 : 100, boxShadow: 'none' }}>
                            <div style={{ width: '17%', display: 'flex', justifyContent: matches_md ? 'left' : 'right' }}>
                                <img src={Croma} width="170" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
                            </div>

                            {matches_md ? <></> :
                                <div style={{ width: '35%', marginLeft: '15%' }}>
                                    <SearchComponent />
                                </div>
                            }

                            <div style={{ display: "flex", width: 250, justifyContent: matches_md ? 'end' : 'start', marginLeft: 'auto' }}>
                                <AccountCircle onClick={handleClickOpen} style={{ fontSize: 30, margin: '0 5%', cursor: 'pointer' }} />
                                <Badge badgeContent={cartProduct?.length} color='primary'>
                                    <ShoppingCart onClick={handleCartIcon} style={{ fontSize: 30, margin: '0 5%', cursor: 'pointer' }} />
                                </Badge>
                                {matches_md ? <HamburgerMenu /> : <></>}
                            </div>
                        </Toolbar>
                    </AppBar>
                </Grid>
                {matches_md ?
                    <Grid item xs={12} style={{ padding: '1% 3% 3%', background: 'black' }}>
                        <SearchComponent />
                    </Grid>
                    : <></>}
            </Grid>
            <Login status={status} setStatus={setStatus} />
            <MenuComponent />
        </div >
    )

}