import React, { useRef, useEffect, useState } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL, getData } from '../../../services/FetchNodeServices';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Checkbox from '@mui/material/Checkbox';
import ShareIcon from '@mui/icons-material/Share';
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

export default function ProductMainImage(props) {

    const navigate = useNavigate()
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [value, setValue] = useState(5);
    const classes = useStyles();
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const mainImageComponent = () => {
        return (
            <div>
                <div style={{ top: 0, right: '6%', position: 'absolute' }}>
                    <Checkbox {...label} icon={<FavoriteBorder style={{ color: 'white', width: 30, height: 30 }} />}
                        checkedIcon={<Favorite style={{ color: '#12DAA9', width: 30, height: 30 }} />}
                    />
                </div>
                <div style={{ top: matches_md ? '1.5%' : '2%', right: 0, position: 'absolute' }}>
                    <ShareIcon style={{ color: 'white', width: 30, height: 30 }} />
                </div>
                <center><img src={`${serverURL}/images/${props.mainImage}`} style={{ width: matches_sm ? '80%' : '80%', height: matches_sm ? '80%' : '80%' }} /></center>
            </div >
        );
    };

    return (
        <div style={{ width: '100%' }}>
            {mainImageComponent()}
        </div>
    );
}