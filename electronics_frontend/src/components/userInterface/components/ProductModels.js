import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData, postData } from '../../../services/FetchNodeServices';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

var useStyles = makeStyles({
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center'
    },
    right: {
        display: 'flex',
        justifyContent: 'right',
        alignItems: 'center'
    }
})

export default function ProductModels(props) {

    const navigate = useNavigate()
    const classes = useStyles();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    //var product = props.product
    const [product, setProduct] = useState(props.product)
    const [productModels, setProductModels] = useState([]);
    const [selectedId, setSelectedId] = useState(product.productdetailsid)

    const fetchProductModels = async () => {
        var result = await postData('ui-Home/fetch_product_details_by_product_id', { productid: product.productid });
        setProductModels(result.data);
    };

    useEffect(() => {
        fetchProductModels();
    }, []);

    const fetchModelDetails = async (id) => {
        var result = await postData('ui-Home/fetch_product_details_by_id', { productdetailsid: id });
        props.setProduct(result.data[0])
        setSelectedId(result.data[0].productdetailsid)
        props.setMainImage(result.data[0].picture.split(',')[0])
    };

    const handleModelClick = (id) => {
        fetchModelDetails(id)
    }

    const showProductModels = () => {
        return (
            productModels.map((item, i) => {
                return (
                    <div>
                        <div onClick={() => handleModelClick(item?.productdetailsid)} style={{ margin: '10px 0', background: selectedId == item.productdetailsid ? 'black' : 'transparent', cursor: 'pointer', border: selectedId == item.productdetailsid ? '1px solid #00E9BF' : '1px solid gray', padding: '0 20px', height: 50, borderRadius: 8, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <p style={{ margin: 0, padding: 0, textTransform: 'capitalize' }}>{`${item.color} (${item.modelno})`}</p>
                        </div>
                    </div>
                )
            })
        )
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '3%' }}>
            {showProductModels()}
        </div>
    );
}