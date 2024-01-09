import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";
import { serverURL } from "../../../services/FetchNodeServices";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import BuyButtons from "./BuyButtons";
import { useDispatch } from "react-redux";

export default function CheckoutProducts(props) {

    var dispatch = useDispatch()
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var products = props.products
    const [refresh, setRefresh] = useState(false)

    const handleQtyChange = (product, value) => {
        if (value <= 0) {
            dispatch({ type: 'DELETE_PRODUCT', payload: [product.productdetailsid, product] })
        }
        else {
            product['qty'] = value
            dispatch({ type: 'EDIT_PRODUCT', payload: [product.productdetailsid, product] })
        }
        props.setRefresh(!props.refresh)
    }

    return (
        <div style={{ marginTop: '5%' }}>
            <h3 style={{ fontWeight: 500, fontSize: 25, margin: 0 }}>Items in Cart: </h3>
            {
                products.map((item, i) => {
                    const formattedOfferPrice = (item.offerprice * item.qty).toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        minimumFractionDigits: 2,
                    });
                    const formattedPrice = (item.price * item.qty).toLocaleString('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        minimumFractionDigits: 2,
                    });
                    return (
                        <div style={{ background: '#121212', borderRadius: 10, padding: matches_md ? '6%' : '1.5%', margin: '2% 0' }}>
                            <Grid container spacing={1}>
                                <Grid item md={2} style={{ display: "flex", alignItems: "center" }}>
                                    <center><img src={`${serverURL}/images/${item.picture.split(',')[0]}`} style={{ width: matches_md ? '60%' : '60%', height: matches_md ? '60%' : '80%' }} /></center>
                                </Grid>
                                <Grid item md={10} style={{ display: "flex", alignItems: "center" }}>
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <div><h3 style={{ fontWeight: 500, fontSize: 18, margin: 0 }}>{item.brandname} {item.productname} {item.modelno} {item.color}</h3></div>
                                        <div style={{ display: "flex", flexDirection: "row", gap: '5%', marginBottom: '3%' }}>
                                            <h3 style={{ fontWeight: 400, fontSize: 18, margin: 0 }}>{formattedOfferPrice}</h3>
                                            <s style={{ fontWeight: 400, fontSize: 18, margin: 0, opacity: '70%' }}>{formattedPrice}</s>
                                        </div>
                                        <BuyButtons product={item} onChange={(value) => handleQtyChange(item, value)} setRefresh={setRefresh} refresh={refresh} screen='cart' buttonBg='transparent' border='2px solid gray' color='white' />
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    )
                })
            }
        </div>
    )
}
