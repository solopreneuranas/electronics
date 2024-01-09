import React, { useEffect, useState } from 'react';
import { AppBar, Box, Grid, Toolbar, Button } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { TextField, InputAdornment } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import Otp from './OtpComponent';

export default function Login({ status, setStatus }) {

    var navigate = useNavigate()
    const theme = useTheme()
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [otpStatus, setOtpStatus] = useState(false)
    const [number, setNumber] = useState('')

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: matches_md ? '80%' : '25%',
        bgcolor: '#191919',
        color: 'white',
        p: matches_md ? '8% 6%' : '2% 3.5%',
        borderRadius: 1
    };

    const handleClose = () => {
        setStatus(false);
    };

    const generateOtp = () => {
        var otpValue = parseInt((Math.random() * 8999) + 1000)
        return otpValue
    }

    const handleLogin = async () => {
        var otp = generateOtp()
        navigate('/otp', { state: { otp: otp, mobileno: number } })
        setStatus(false)
    }

    const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin()
        }
    }


    return (
        <div style={{ position: 'relative' }}>
            <Modal
                style={{ background: '#9b9b9ba1' }}
                open={status}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={status}>
                    <Box sx={style}>
                        <CloseIcon onClick={handleClose} fontSize='large' style={{ position: 'absolute', top: '6%', right: '4%', cursor: 'pointer' }} />
                        <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <Grid item sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid gray', borderRadius: '5px 0 0 5px', padding: '2%' }}>
                                <h3 style={{ fontWeight: 400, fontSize: 15, margin: 0 }}>Login</h3>
                            </Grid>
                            <Grid item sm={6} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid gray', borderRadius: '0 5px 5px 0', padding: '2%' }}>
                                <h3 style={{ fontWeight: 400, fontSize: 15, margin: 0 }}>Create Account</h3>
                            </Grid>
                        </Grid>
                        <Grid container spacing={1} style={{ marginTop: '3%' }}>
                            <Grid item sm={12}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <p style={{ fontSize: 15, margin: 0 }}>Please enter your Email ID or Phone number</p><br />
                                </div>

                                <div style={{ width: 'auto', display: 'flex', background: 'transparent', padding: '2.5% 4%', borderRadius: 6, border: '1px solid white' }}>
                                    <TextField fullWidth
                                        onKeyUpCapture={handleEnterPress}
                                        onChange={(event) => setNumber(event.target.value)}
                                        sx={{ input: { color: 'white', fontSize: 22 } }}
                                        variant="standard"
                                        hiddenLabel
                                        placeholder="Enter email or phone number"
                                        InputProps={{
                                            disableUnderline: true
                                        }} />
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', margin: '7% 0' }}>
                                    <h3 style={{ fontWeight: 500, fontSize: 20, margin: '0 0 3%' }}>
                                        <Checkbox {...label} defaultChecked style={{ color: "#00E9BF", transform: 'scale(1.3)' }} />
                                        Keep me signed in</h3>
                                    <p style={{ fontSize: 13, margin: 0 }}>By continuing you agree to our
                                        <font style={{ color: '#00E9BF' }}> Terms of Use</font> &
                                        <font style={{ color: '#00E9BF' }}> Privacy Policy</font>
                                    </p>
                                </div>

                            </Grid>
                            <Grid item sm={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <Button variant='contained' fullWidth onClick={handleLogin}
                                    style={{ padding: '2% 0', borderRadius: 8, color: 'black', background: '#00E9BF', fontWeight: 500, fontSize: 18 }}
                                >Continue</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
            {/* <Otp otpStatus={otpStatus} setOtpStatus={setOtpStatus} number={number} /> */}
        </div>
    )
}