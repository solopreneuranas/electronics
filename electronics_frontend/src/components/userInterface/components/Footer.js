import React, { useRef, useEffect, useState } from 'react';
import { Grid, Button } from "@mui/material";
import Croma from "../../../assets/croma-logo.svg"
import { makeStyles } from "@mui/styles";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField, InputAdornment } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { getData } from '../../../services/FetchNodeServices';
import EastIcon from '@mui/icons-material/East';

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

export default function Footer() {

    const useStyle = useStyles()
    const theme = useTheme()
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const [categories, setCategories] = useState([])
    const [brands, setBrands] = useState([])

    const fetchCategories = async () => {
        const response = await getData('ui-Home/display_all_category')
        setCategories(response.data)
    }

    const fetchBrands = async () => {
        const response = await getData('ui-Home/fetch_brands')
        setBrands(response.data)
    }

    useEffect(() => {
        fetchCategories()
        fetchBrands()
    }, []);

    const CategoriesList = (props) => {
        return (
            categories.slice(props.sliceStart, props.sliceEnd).map((item, i) => {
                return (
                    <ListItem disablePadding>
                        <ListItemButton style={{ paddingLeft: 0 }}>
                            <ListItemText primary={item.categoryname} style={{ margin: 0 }} />
                        </ListItemButton>
                    </ListItem>
                )
            })
        )
    }

    const BrandsList = (props) => {
        return (
            brands.slice(props.sliceStart, props.sliceEnd).map((item, i) => {
                return (
                    <ListItem disablePadding>
                        <ListItemButton style={{ paddingLeft: 0 }}>
                            <ListItemText primary={item.brandname} style={{ margin: 0 }} />
                        </ListItemButton>
                    </ListItem>
                )
            })
        )
    }

    return (
        <div style={{ position: "sticky", top: 0, zIndex: 99, padding: '2% 7%' }} >
            <Grid container spacing={1}>

                <Grid item md={4} style={{ padding: matches_md ? '3% 1%' : '0 4%', borderRight: matches_md ? 'none' : '1px solid gray', width: '100%' }}>
                    <img src={Croma} width="170" />
                    <h3 style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: 18 }}>Connect with us</h3>
                    <div style={{ display: 'flex', background: '#fff', height: 55, padding: '0 25px', borderRadius: 6, alignItems: 'center', margin: 'auto' }}>
                        <TextField
                            hiddenLabel
                            placeholder="Enter Email ID"
                            variant="standard"
                            size="small"
                            fullWidth

                            InputProps={{
                                disableUnderline: true,
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <EastIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </div>
                    <p>© Copyright 2023 Croma. All rights reserved</p>
                </Grid>
                <Grid item md={4} style={{ padding: matches_md ? '3% 1%' : '0 4%', borderRight: matches_md ? 'none' : '1px solid gray', width: '100%' }}>

                    <h3 style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: 18 }}>Shop by Categories</h3>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <List style={{ padding: 0 }}>
                                <CategoriesList sliceStart={0} sliceEnd={5} />
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <List style={{ padding: 0 }}>
                                <CategoriesList sliceStart={6} />
                            </List>
                        </Grid>
                    </Grid>

                </Grid>
                <Grid item md={4} style={{padding: matches_md ? '3% 1%' : '0 4%', width: '100%' }}>

                    <h3 style={{ fontWeight: 600, textTransform: 'uppercase', fontSize: 18 }}>Shop by Brands</h3>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <List style={{ padding: 0 }}>
                                <BrandsList sliceStart={0} sliceEnd={5} />
                            </List>
                        </Grid>
                        <Grid item xs={6}>
                            <List style={{ padding: 0 }}>
                                <BrandsList sliceStart={6} sliceEnd={11} />
                            </List>
                        </Grid>
                    </Grid>

                </Grid>

            </Grid>

        </div >
    )

}