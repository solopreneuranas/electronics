import useStyles from "./ProjectCSS";
import Header from "../Header";
import Footer from "../Footer";
import { useState, useEffect } from "react";
import { Button, Grid } from "@mui/material";
import { TextField, InputAdornment } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { getData, postData } from "../../../../services/FetchNodeServices";
import Swal from 'sweetalert2'

export default function UserProfile(props) {

    const classes = useStyles()
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const [refresh, setRefresh] = useState(false)
    const [userId, setUserId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')

    const fetchProfileDetails = async () => {
        var response = await getData('ui-Home/fetch_profile_details')
        var profileDetails = response.data[0]
        setUserId(profileDetails.userid)
        setFirstName(profileDetails.firstname)
        setLastName(profileDetails.lastname)
        setEmail(profileDetails.email)
        setNumber(profileDetails.mobileno)
        setAddress1(profileDetails.address1)
        setAddress2(profileDetails.address2)
    }

    const handleUpdate = async () => {
        var body = { 'userid': userId, 'firstname': firstName, 'lastname': lastName, 'email': email, 'mobileno': number, 'address1': address1, 'address2': address2 }
        var response = await postData('ui-Home/update_profile_details', body)
        if (response.status === true) {
            Swal.fire({
                icon: 'success',
                title: 'Profile details updated sucessfully!',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            alert('Something is missing!')
        }
    }

    useEffect(function () {
        fetchProfileDetails()
    }, [])


    return (
        <div className={classes.home_root}>
            <Header />
            <Grid container spacing={3} style={{ width: '70%', margin: 'auto', padding: '3% 5% 10%', height: '100%', display: "flex", justifyContent: "center" }}>
                <Grid item md={12} style={{ display: "flex", width: '100%', alignItems: "center" }}>
                    <h3 style={{ fontWeight: 500, margin: 0, fontSize: 30 }}>My Profile</h3>
                </Grid>

                <Grid item md={6} style={{ margin: '1% 0' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'white', padding: '4%', borderRadius: 10 }}>
                        <TextField fullWidth
                            value={firstName}
                            onChange={(event) => setFirstName(event.target.value)}
                            sx={{ input: { color: 'black', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="First Name"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'white', padding: '4%', borderRadius: 10 }}>
                        <TextField fullWidth
                            value={lastName}
                            onChange={(event) => setLastName(event.target.value)}
                            sx={{ input: { color: 'black', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Last Name"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'white', padding: '4%', borderRadius: 10 }}>
                        <TextField fullWidth
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            sx={{ input: { color: 'black', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Email"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'white', padding: '4%', borderRadius: 10 }}>
                        <TextField fullWidth
                            value={number}
                            onChange={(event) => setNumber(event.target.value)}
                            sx={{ input: { color: 'black', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Mobile Number"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'white', padding: '8% 4%', borderRadius: 10 }}>
                        <TextField fullWidth
                            value={address1}
                            onChange={(event) => setAddress1(event.target.value)}
                            sx={{ input: { color: 'black', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Address 1"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>
                <Grid item md={6} style={{ margin: '1% 0' }}>
                    <div style={{ width: 'auto', display: 'flex', background: 'white', padding: '8% 4%', borderRadius: 10 }}>
                        <TextField fullWidth
                            value={address2}
                            onChange={(event) => setAddress2(event.target.value)}
                            sx={{ input: { color: 'black', fontSize: 18 } }}
                            variant="standard"
                            hiddenLabel
                            placeholder="Address 2"
                            InputProps={{
                                disableUnderline: true
                            }} />
                    </div>
                </Grid>

                <Grid item md={12} style={{ display: "flex", width: '100%', alignItems: "center", justifyContent: "center" }}>
                    <Button onClick={fetchProfileDetails} variant="outlined" style={{ margin: '0 1%', fontSize: 18, background: 'transparent', color: 'white', padding: '1% 4%', border: '2px solid white', fontWeight: 600, borderRadius: 10 }}>Discard Changes</Button>
                    <Button onClick={handleUpdate} variant="contained" style={{ margin: '0 1%', fontSize: 18, background: '#12DAA8', color: 'black', padding: '1% 4%', border: '2px solid #12DAA8', fontWeight: 600, borderRadius: 10 }}>Save Changes</Button>
                </Grid>

            </Grid>
            <Footer />
        </div>
    )
}
