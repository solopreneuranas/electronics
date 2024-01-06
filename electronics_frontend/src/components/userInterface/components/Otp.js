import React, { useState } from 'react';
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
import { useLocation } from 'react-router-dom';
import { serverURL, getData, postData } from '../../../services/FetchNodeServices';

export default function Otp({ otpStatus, setOtpStatus, number, otp }) {

    var location = useLocation()
    var otpReceived = otp
    var navigate = useNavigate()
    const theme = useTheme()
    const [status, setStatus] = useState('')
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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



    var otpArray = []
    otpArray.fill('')

    const handleOtp0 = () => {
        if (document.getElementById('zero').value.length == 1) {
            otpArray[0] = document.getElementById('zero').value
            document.getElementById('one').focus()
        }
    }
    const handleOtp1 = () => {
        if (document.getElementById('one').value.length == 1) {
            otpArray[1] = document.getElementById('one').value
            document.getElementById('two').focus()
        }
    }
    const handleOtp2 = () => {
        if (document.getElementById('two').value.length == 1) {
            otpArray[2] = document.getElementById('two').value
            document.getElementById('three').focus()
        }
    }
    const handleOtp3 = () => {
        if (document.getElementById('three').value.length == 1) {
            otpArray[3] = document.getElementById('three').value
        }
    }

    const handleSubmit = async () => {
        var otpEntered = otpArray.join('')
        if (otpEntered == otpReceived) {
            alert('OTP Matched!')
        }
        else {
            var body = { 'mobileno': number }
            var response = await postData('ui-Home/check_user', body)
            if (response.status == true) {
                localStorage.setItem("User", JSON.stringify(response.data))
                navigate('/checkout', { state: { mobileno: number, status: response.status } })
            }
            else {
                navigate('/checkout', { state: { mobileno: number, status: response.status } })
            }
        }
    }

    const handleClose = () => {
        setOtpStatus(false);
    };

    return (
        <div style={{ position: 'relative' }}>
            <Modal
                style={{ background: '#9b9b9ba1' }}
                open={otpStatus}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={otpStatus}>
                    <Box sx={style}>
                        <CloseIcon onClick={handleClose} fontSize='large' style={{ position: 'absolute', top: '6%', right: '4%', cursor: 'pointer' }} />
                        <Grid container spacing={1} style={{ marginTop: '1%' }}>
                            <Grid item sm={12}>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                                    <p style={{ fontSize: 18, margin: 0, fontWeight: 500 }}>VERIFY WITH OTP</p><br />
                                    <p style={{ fontSize: 15, margin: 0 }}>Sent to {number}</p>
                                    <p>{otpReceived}</p>
                                </div>


                                <div style={{ margin: '8% 0', display: 'flex', flexDirection: 'row', gap: '3%', flexWrap: 'wrap', alignContent: 'flex-start', width: '100%', justifyContent: 'center' }}>
                                    <div style={{ width: 50, height: 60, background: 'transparent', padding: '2.5% 4%', borderRadius: 6, border: '1px solid white', display: 'flex', alignItems: 'center' }}>
                                        <TextField onKeyUp={handleOtp0} id="zero"
                                            sx={{ input: { color: 'white', fontSize: 30, textAlign: 'center' } }}
                                            variant="standard"
                                            hiddenLabel
                                            placeholder=" "
                                            InputProps={{
                                                disableUnderline: true,
                                                inputProps: { maxLength: 1 }
                                            }} />
                                    </div>
                                    <div style={{ width: 50, height: 60, background: 'transparent', padding: '2.5% 4%', borderRadius: 6, border: '1px solid white', display: 'flex', alignItems: 'center' }}>
                                        <TextField onKeyUp={handleOtp1} id="one"
                                            sx={{ input: { color: 'white', fontSize: 30, textAlign: 'center' } }}
                                            variant="standard"
                                            hiddenLabel
                                            placeholder=" "
                                            InputProps={{
                                                disableUnderline: true,
                                                inputProps: { maxLength: 1 }
                                            }} />
                                    </div>
                                    <div style={{ width: 50, height: 60, background: 'transparent', padding: '2.5% 4%', borderRadius: 6, border: '1px solid white', display: 'flex', alignItems: 'center' }}>
                                        <TextField onKeyUp={handleOtp2} id="two"
                                            sx={{ input: { color: 'white', fontSize: 30, textAlign: 'center' } }}
                                            variant="standard"
                                            hiddenLabel
                                            placeholder=" "
                                            InputProps={{
                                                disableUnderline: true,
                                                inputProps: { maxLength: 1 }
                                            }} />
                                    </div>
                                    <div style={{ width: 50, height: 60, background: 'transparent', padding: '2.5% 4%', borderRadius: 6, border: '1px solid white', display: 'flex', alignItems: 'center' }}>
                                        <TextField onKeyUp={handleOtp3} id="three"
                                            sx={{ input: { color: 'white', fontSize: 30, textAlign: 'center' } }}
                                            variant="standard"
                                            hiddenLabel
                                            placeholder=" "
                                            InputProps={{
                                                disableUnderline: true,
                                                inputProps: { maxLength: 1 }
                                            }} />
                                    </div>
                                </div>


                            </Grid>
                            <Grid item sm={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: '5%' }}>
                                <p style={{ fontSize: 18, margin: 0, fontWeight: 500 }}>Didn't Receive OTP? <font style={{ fontSize: 18, fontWeight: 600, color: '#12daa8' }}>Resend OTP</font></p><br />
                            </Grid>
                            <Grid item sm={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                                <Button variant='contained' fullWidth onClick={handleSubmit}
                                    style={{ padding: '2% 0', borderRadius: 8, color: 'black', background: '#00E9BF', fontWeight: 500, fontSize: 18 }}
                                >Submit</Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}