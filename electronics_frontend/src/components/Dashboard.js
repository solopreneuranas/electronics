import * as React from 'react';
import { Grid, Button, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PanoramaIcon from '@mui/icons-material/Panorama';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from "react";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DisplayAllCategory from "../components/DisplayAllCategory";
import Category from '../components/Category';
import Brands from '../components/Brands';
import DisplayAllBrands from '../components/DisplayAllBrands';
import Products from '../components/Products';
import DisplayAllProducts from '../components/DisplayAllProducts';
import ProductDetails from '../components/ProductDetails';
import DisplayAllProductDetails from '../components/DisplayAllProductDetails';
import Banners from '../components/Banners';
import CategoryBanners from '../components/CategoryBanners';
import BrandBanners from '../components/BrandBanners';
import { serverURL } from '../services/FetchNodeServices';


var useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        padding: 0,
        margin: 0,
        justifyContent: 'left',
        alignItems: 'center'
    },
    box: {
        width: '100%',
        height: '100vh',
        margin: 0,
        padding: 0,
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'start'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})


const useStylesTextField = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 15
        },
    },
}))


export default function Dashboard() {

    var admin = JSON.parse(localStorage.getItem("Admin"))

    var navigate = useNavigate()

    const classes = useStylesTextField();

    const useStyle = useStyles()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    }


    const listItems = [
        {
            icon: <DashboardIcon />,
            title: 'Dashboard',
            link: ''
        },
        {
            icon: <CategoryIcon />,
            title: 'Categories',
            link: '/dashboard/displayallcategory'
        },
        {
            icon: <StoreIcon />,
            title: 'Brands',
            link: '/dashboard/displayallbrands'
        },
        {
            icon: <ShoppingCartIcon />,
            title: 'Products',
            link: '/dashboard/displayallproducts'
        },
        {
            icon: <ShoppingCartIcon />,
            title: 'Specifications',
            link: '/dashboard/displayallproductdetails'
        },
        {
            icon: <PanoramaIcon />,
            title: 'Banners',
            link: '/dashboard/banners'
        },
        {
            icon: <PermMediaIcon />,
            title: 'Category Banners',
            link: '/dashboard/categorybanners'
        },
        {
            icon: <PermMediaIcon />,
            title: 'Brand Banners',
            link: '/dashboard/brandbanners'
        }

    ]

    return (
        <div className={useStyle.root}>
            <div className={useStyle.box}>
                <Grid container spacing={3} style={{ width: '100%', margin: 0 }}>
                    <Grid item xs={2} style={{ background: '#F9FAFB', padding: '3% 2%', borderRight: '1px solid gainsboro', height: '100vh', position: 'sticky', top: 0 }}>

                        <Grid style={{ background: '#EDEFF1', borderRadius: '15px', display: "flex", justifyContent: "left", alignItems: 'center', padding: '5% 8%' }}>
                            <img src={`${serverURL}/images/${admin.picture}`} style={{ width: 50, height: 50, borderRadius: '50%', marginRight: '6%' }} />
                            <div>
                                <div style={{ fontSize: '16px', fontWeight: '500', padding: 0, margin: 0 }}>{admin.name}</div>
                                <div style={{ fontSize: '14px', fontWeight: '500', opacity: '70%', padding: 0, margin: 0 }}>{admin.emailid}</div>
                            </div>
                        </Grid>

                        <Grid style={{ marginTop: '10%' }}>
                            <List sx={{ width: '100%', maxWidth: 360 }}
                                component="nav">
                                {listItems.map((item, i) => {
                                    return (
                                        <ListItemButton onClick={() => navigate(item.link)}>
                                            <ListItemIcon>
                                                {item.icon}
                                            </ListItemIcon>
                                            <ListItemText style={{ opacity: '80%' }}>{item.title}</ListItemText>
                                        </ListItemButton>
                                    )
                                })}
                            </List>
                        </Grid>

                    </Grid>

                    <Grid item xs={10} style={{ background: 'white', padding: '3% 1%', height: '100%' }}>
                        <Grid container spacing={2}>
                            <Grid item md={10}>
                                <TextField variant="outlined" fullWidth className={classes.roundedTextField} label="Search" />
                            </Grid>
                            <Grid item md={2} style={{ display: "flex", justifyContent: "center", alignItems: 'center' }}>
                                <Badge badgeContent={9} color="success" style={{ marginRight: '8%' }}>
                                    <EmailIcon color="action" style={{ width: 25, height: 25 }} />
                                </Badge>
                                <Badge badgeContent={4} color="error" style={{ marginRight: '8%' }}>
                                    <NotificationsIcon color="action" style={{ width: 25, height: 25 }} />
                                </Badge>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 7px rgba(0,0,0,0.25))',
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'background.paper',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <PersonIcon />
                                        </ListItemIcon>
                                        My account
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <PersonAdd fontSize="small" />
                                        </ListItemIcon>
                                        Add another Admin
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <ListItemIcon>
                                            <Settings fontSize="small" />
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={handleClose} style={{ color: '#ff5028' }}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" style={{ color: '#ff5028' }} />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                                <img className='profileImg' src={`${serverURL}/images/${admin.picture}`} style={{ width: 35, height: 35, borderRadius: '50%' }} onClick={handleClick} />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2} style={{ padding: 0, margin: 0, height: '100%', width: '100%' }}>
                            <Grid item xs={12} style={{ padding: 0, height: '100%', width: '100%' }}>
                                <Routes>
                                    <Route element={<DisplayAllCategory />} path="/displayallcategory" />
                                    <Route element={<Category />} path="/category" />
                                    <Route element={<Category />} path="/category" />
                                    <Route element={<Brands />} path="/brands" />
                                    <Route element={<DisplayAllBrands />} path="/displayallbrands" />
                                    <Route element={<Products />} path="/products" />
                                    <Route element={<ProductDetails />} path="/productdetails" />
                                    <Route element={<DisplayAllProductDetails />} path="/displayallproductdetails" />
                                    <Route element={<DisplayAllProducts />} path="/displayallproducts" />
                                    <Route element={<Banners />} path="/banners" />
                                    <Route element={<CategoryBanners />} path="/categorybanners" />
                                    <Route element={<BrandBanners />} path="/brandbanners" />
                                </Routes>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </div>
        </div>
    )
}