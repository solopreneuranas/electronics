import React, { useEffect, useState } from 'react';
import { AppBar, Box, Grid, Toolbar, Button } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField, InputAdornment } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import OtpComponent from './OtpComponent';

export default function CheckoutForm(props) {

    var navigate = useNavigate()
    const theme = useTheme()
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    return (
        <div>
            <Grid container spacing={2} style={{ width: '100%' }}>
                <Grid item md={12} style={{ marginBottom: '2%', width: '100%' }}>
                    <h3 style={{ margin: 0, fontWeight: 500, fontSize: 25 }}>Enter Shipping Information</h3>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0', width: '100%' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'transparent', padding: '4%', borderRadius: 10, border: '1px solid #525252' }}>
                        <TextField fullWidth
                            onChange={(event) => props.setFirstName(event.target.value)}
                            sx={{ input: { color: 'white', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="First Name"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0', width: '100%' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'transparent', padding: '4%', borderRadius: 10, border: '1px solid #525252' }}>
                        <TextField fullWidth
                            onChange={(event) => props.setLastName(event.target.value)}
                            sx={{ input: { color: 'white', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Last Name"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0', width: '100%' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'transparent', padding: '4%', borderRadius: 10, border: '1px solid #525252' }}>
                        <TextField fullWidth
                            onChange={(event) => props.setEmail(event.target.value)}
                            sx={{ input: { color: 'white', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Email"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0', width: '100%' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'transparent', padding: '4%', borderRadius: 10, border: '1px solid #525252' }}>
                        <TextField fullWidth
                            value={props.number}
                            onChange={(event) => props.setNumber(event.target.value)}
                            sx={{ input: { color: 'white', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Mobile Number"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0', width: '100%' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'transparent', padding: '8% 4%', borderRadius: 10, border: '1px solid #525252' }}>
                        <TextField fullWidth
                            onChange={(event) => props.setAddress1(event.target.value)}
                            sx={{ input: { color: 'white', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Address 1"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0', width: '100%' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'transparent', padding: '8% 4%', borderRadius: 10, border: '1px solid #525252' }}>
                        <TextField fullWidth
                            onChange={(event) => props.setAddress2(event.target.value)}
                            sx={{ input: { color: 'white', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Address 2"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={4} style={{ margin: '1% 0', width: '100%' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'transparent', padding: '4%', borderRadius: 10, border: '1px solid #525252' }}>
                        <TextField fullWidth
                            onChange={(event) => props.setPincode(event.target.value)}
                            sx={{ input: { color: 'white', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Pincode"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={4} style={{ margin: '1% 0', width: '100%' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'transparent', padding: '4%', borderRadius: 10, border: '1px solid #525252' }}>
                        <TextField fullWidth
                            onChange={(event) => props.setCity(event.target.value)}
                            sx={{ input: { color: 'white', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="City"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={4} style={{ margin: '1% 0', width: '100%' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'transparent', padding: '4%', borderRadius: 10, border: '1px solid #525252' }}>
                        <TextField fullWidth
                            onChange={(event) => props.setState(event.target.value)}
                            sx={{ input: { color: 'white', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="State"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}