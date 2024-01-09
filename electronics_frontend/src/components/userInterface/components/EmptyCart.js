import { useNavigate } from "react-router-dom"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function EmptyCart(props) {

    var navigate = useNavigate()
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: matches_md ? "80%" : "100%", height: "70vh", margin: 'auto'}}>
            <img src="https://cdn-icons-png.flaticon.com/512/3081/3081840.png" style={{ width: matches_md ? '30%' : '15%' }} />
            <h3 style={{ fontWeight: 500, fontSize: matches_md ? 23 : 27, margin: 0, textAlign: 'center' }}>
                {props.title}...
                <font style={{ color: '#00E9BF', cursor: "pointer" }} onClick={() => navigate('/')}>
                    Continue Shopping
                </font>
            </h3>
        </div>
    )
}