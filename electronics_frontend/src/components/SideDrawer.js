import * as React from 'react';
import { Grid, Button, TextField, Box, List } from "@mui/material";
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { getData, postData, serverURL } from '.././services/FetchNodeServices';
import { makeStyles } from '@material-ui/core/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Swal from 'sweetalert2'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    roundedTextField: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 12
        },
    },
}))

export default function SideDrawer(props) {

    var admin = JSON.parse(localStorage.getItem('Admin'))
    var navigate = useNavigate()
    const classes = useStyles();
    const [state, setState] = useState({ right: false })
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    //const [adminId, setAdminId] = useState(admin.adminid)
    const [name, setName] = useState(admin.name)
    const [email, setEmail] = useState(admin.emailid)
    const [number, setNumber] = useState(admin.mobileno)
    const [password, setPassword] = useState(admin.password)
    const [getErrors, setErrors] = useState('')
    const [userName, setUserName] = useState(admin.username)    
    const [showPassword, setShowPassword] = useState(false)
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

    const handleClickShowPassword = () => setShowPassword((show) => !show)
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleLogout = () => {
        localStorage.clear()
        navigate('/adminlogin')
    }

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        if (name.length === 0) {
            error = true
            handleError('Please enter name', 'name')
        }
        if (email.length === 0) {
            error = true
            handleError('Please enter email', 'email')
        }
        if (number.length === 0) {
            error = true
            handleError('Please enter number', 'number')
        }
        if (password.length === 0) {
            error = true
            handleError('Please enter password', 'password')
        }
        return error
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open })
    }

    const handleUpdateAccount = async () => {
        var error = validation()
        if (error === false) {
            var body = { 'username': userName, 'name': name, 'emailid': email, 'password': password, 'mobileno': number, 'picture': admin.picture }
            var response = await postData('admins/update_account', body)
            if (response.status === true) {
                localStorage.setItem('Admin', JSON.stringify(body))
                Swal.fire({
                    icon: 'success',
                    toast: true,
                    toast: true,
                    title: 'Profile update!'
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    toast: true,
                    title: 'Profile not created!'
                })
            }
        }
    }

    const list = (anchor) => (
        <Box
            role="presentation" >
            <div style={{ width: matches_md ? 350 : 450, height: '100%' }}>
                <Grid container spacing={1} style={{ padding: '10%', display: 'flex', justifyContent: 'center' }}>
                    <h2 style={{ margin: 0, fontWeight: 600, fontSize: 25, color: 'black' }}>My Profile</h2>
                    <Grid item xs={12} style={{ marginTop: '8%' }}>
                        <center>
                            <img src={`${serverURL}/images/${admin.picture}`} style={{ width: 130, height: 130, borderRadius: '50%', cursor: 'pointer' }} />
                            <h2 style={{ margin: 0, fontWeight: 600, fontSize: 20, color: 'black' }}>{name}</h2>
                            <p style={{ padding: 0, fontWeight: 600, color: 'gray', fontSize: 14, margin: 0 }}>{userName}</p>
                            <div style={{ marginTop: '10%', width: '100%' }}>
                                {editUser()}
                            </div>
                            <div onClick={handleLogout} style={{ cursor: 'pointer', marginTop: '10%', width: '100%', display: 'flex', justifyContent: 'left', alignItems: 'center', color: '#ff6666' }}>
                                <Logout style={{ marginRight: '3%' }} />
                                <h3 style={{ fontWeight: 500, fontSize: 20 }}>Logout</h3>
                            </div>
                        </center>
                    </Grid>
                </Grid>
            </div>
        </Box>
    )

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ]

    const editUser = () => {
        return (
            <div>
                <Grid container spacing={1}>
                    <Grid item xs={12} style={{ padding: 0 }}>
                        <TextField
                            value={name}
                            error={getErrors.name}
                            helperText={getErrors.name}
                            onFocus={() => handleError('', 'name')}
                            label='Name' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(event) => setName(event.target.value)} />
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0, marginTop: '5%' }}>
                        <TextField
                            value={email}
                            error={getErrors.email}
                            helperText={getErrors.email}
                            onFocus={() => handleError('', 'email')}
                            label='Email' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(event) => setEmail(event.target.value)} />
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0, marginTop: '5%' }}>
                        <TextField
                            value={number}
                            error={getErrors.number}
                            helperText={getErrors.number}
                            onFocus={() => handleError('', 'number')}
                            label='Number' variant='outlined' fullWidth className={classes.roundedTextField} onChange={(event) => setNumber(event.target.value)} />
                    </Grid>
                    <Grid item xs={12} style={{ padding: 0, marginTop: '5%' }}>
                        <FormControl fullWidth variant="outlined" className={classes.roundedTextField}>
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                error={getErrors.password}
                                onFocus={() => handleError('', 'password')}
                                onChange={(event) => setPassword(event.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.password}</p>
                    </Grid>
                    <Grid item xs={12} variant='contained' style={{ padding: 0, marginTop: '4%' }}>
                        <Button
                            onClick={handleUpdateAccount}
                            fullWidth style={{
                                background: '#191919',
                                color: 'white',
                                borderRadius: '15px',
                                padding: '2% 0',
                                fontSize: '18px',
                                fontWeight: '600'
                            }}>Update Profile</Button>
                    </Grid>
                </Grid>

            </div>
        )
    }

    return (
        <div>
            <img className='profileImg' src={`${serverURL}/images/${admin.picture}`} style={{ width: 50, height: 50, borderRadius: '50%', cursor: 'pointer' }} onClick={toggleDrawer('right', true)} />
            <React.Fragment key='right' >
                <Drawer
                    anchor='right'
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    <div style={{ backgroundColor: 'white' }}>
                        <CloseIcon onClick={toggleDrawer('right', false)} fontSize='medium' style={{ position: 'absolute', top: '2.5%', right: '4%', cursor: 'pointer', color: 'black' }} />
                        {list('right')}
                    </div>
                </Drawer>
            </React.Fragment>
        </div>

    )
}