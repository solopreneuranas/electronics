import React, { useState } from 'react';
import { AppBar, Box, Grid, Toolbar, Button } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Croma from "../../../assets/croma-logo.svg"
import { TextField, InputAdornment } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { serverURL, getData, postData } from '../../../services/FetchNodeServices';

export default function OtpComponent(props) {

    var number = props.number
    var otp = props.otp
    alert(otp)
    var navigate = useNavigate()
    const theme = useTheme()
    const [status, setStatus] = useState(props.status)
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));


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
            handleSubmit()
        }
    }

    const handleSubmit = async () => {
        var otpEntered = otpArray.join('')
        if (otpEntered == otp) {
            var body = { 'mobileno': number }
            var response = await postData('ui-Home/check_user', body)
            if (response.status == true) {
                localStorage.setItem("User", JSON.stringify(response.data))
                navigate('/checkout', { state: { 'mobileno': number, status: response.status, data: response.data } })
            }
            else {
                navigate('/checkout', { state: { 'mobileno': number, status: response.status, data: response.data } })
            }
        }
        else {
            alert('OTP Not Matched!')
        }
    }

    const otpForm = () => {
        return (
            <div style={{ width: matches_md ? '100%' : '70%' }}>
                <Grid container spacing={1} style={{ marginTop: '1%' }}>
                    <Grid item sm={12} style={{ width: '100%' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <p style={{ fontSize: 18, margin: 0, fontWeight: 500 }}>VERIFY WITH OTP</p><br />
                            <p style={{ fontSize: 15, margin: 0 }}>Sent to {number}</p>
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
                </Grid>
            </div>
        )
    }

    return (
        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center' }}>
            <Grid container spacing={1}>
                {
                    matches_md ? <></> :
                        <Grid item md={7}
                            style={{
                                position: 'relative',
                                height: '100vh',
                                width: '100%',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundImage:
                                    "url(https://img.freepik.com/free-vector/household-appliances-realistic-composition_1284-65307.jpg?w=1060&t=st=1704594687~exp=1704595287~hmac=1af5d443b8c91b55bcec401b1aab9fb07498fad5372626e551e39e2c09d4c50b)",
                            }}
                        > </Grid>
                }
                <Grid item md={5} style={{ display: 'flex', alignItems: 'center', width: '100%', height: '100vh', justifyContent: 'center', flexDirection: 'column' }}>
                    <div style={{ marginBottom: '5%' }}>
                        <img src={Croma} width="170" onClick={() => navigate('/')} style={{ cursor: 'pointer' }} />
                    </div>
                    {otpForm()}
                </Grid>
            </Grid>
        </div>
    )
}