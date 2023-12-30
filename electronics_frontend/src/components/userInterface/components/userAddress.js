import { useState, useEffect } from "react"
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useNavigate } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';

export default function UserAddress(props) {

    var navigate = useNavigate()
    const theme = useTheme();
    var userData = props.userData
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var user = userData[0]

    return (
        <div style={{ width: '100%' }}>
            <Grid container spacing={3} style={{ width: '100%', padding: '3% 0', height: '100%' }}>
                <Grid container spacing={0} style={{ width: '100%', paddingLeft: '2%' }}>
                    <Grid item md={12}>
                        <h3 style={{ fontWeight: 500, margin: 0, fontSize: 25 }}>My Address</h3>
                    </Grid>
                </Grid>
                <Grid item md={12}>
                    <div style={{ position: "relative", border: '1px solid #525252', borderRadius: 10, padding: '4% 0', display: "flex", flexDirection: "row", alignItems: "center", gap: '8%' }}>
                        <div><EditIcon fontSize="large" style={{ cursor: "pointer", position: "absolute", right: '2%', top: '7%' }} /></div>
                        <div>
                        <LocationOnIcon style={{ width: 50, height: 50 }} />
                        </div>
                        <div>
                            <h3 style={{ fontWeight: 500, margin: 0, fontSize: 23 }}>{user.firstname} {user.lastname}</h3>
                            <p style={{ margin: 0, opacity: '70%' }}>{user.address1}</p>
                            <p style={{ margin: 0, opacity: '70%' }}>{user.address2}</p>
                            <p style={{ margin: 0, opacity: '70%' }}>Email: {user.email}</p>
                            <p style={{ margin: 0, opacity: '70%' }}>Mob no.: {user.mobileno}</p>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
