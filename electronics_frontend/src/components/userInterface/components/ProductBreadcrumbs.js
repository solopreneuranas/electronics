import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
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


export default function ProductBreadcrumbs(props) {

    const navigate = useNavigate()

    const classes = useStyles();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));


    const handleCategoryClick = (categoryid, categoryname) => {
        var staticURL = categoryname
        var staticURLArray = staticURL.split(' ')
        var dynamicURL = staticURLArray.join('-').toLowerCase()

        navigate(`/category/?${dynamicURL}`, { state: { categoryid: categoryid, categoryname: categoryname } });
    }

    const handleBrandClick = (brandid, brandname) => {
        var staticURL = brandname
        var staticURLArray = staticURL.split(' ')
        var dynamicURL = staticURLArray.join('-').toLowerCase()

        navigate(`/brand/?${dynamicURL}`, { state: { brandid: brandid, brandname: brandname } });
    }


    const productBreadcrumbsComponent = () => {


        return (
            <div style={{ display: 'flex', flexDirection: 'row' }}>

                <h3 onClick={() => handleBrandClick(props.brandid, props.brandname)} style={{ fontWeight: 500, fontSize: 18, margin: 0, cursor: 'pointer' }}>{props.brandname}</h3>
                <ArrowForwardIosIcon style={{ margin: '0 1%', opacity: '60%' }} />

                <h3 onClick={() => handleCategoryClick(props.categoryid, props.categoryname)} style={{ fontWeight: 500, fontSize: 18, margin: 0, cursor: 'pointer' }}>{props.categoryname}</h3>
                <ArrowForwardIosIcon style={{ margin: '0 1%', opacity: '60%' }} />

                <h3 style={{ fontWeight: 500, fontSize: 18, margin: 0 }}>{props.productname}</h3>

            </div >
        );

    };


    return (
        <div style={{ width: '100%' }}>
            {productBreadcrumbsComponent()}
        </div>
    );
}