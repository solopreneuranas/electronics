import useStyles from "./ProjectCSS";
import Header from "../Header";
import Footer from "../Footer";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import OtpComponent from "../OtpComponent";

export default function Otp(props) {

    var navigate = useNavigate()
    var location = useLocation()
    var otp = location.state.otp
    var number = location.state.mobileno
    const classes = useStyles()
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div className={classes.home_root}>
            <OtpComponent otp={otp} status={true} number={number} />
        </div>
    )
}
