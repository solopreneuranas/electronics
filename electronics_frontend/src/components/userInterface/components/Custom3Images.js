import React, { useRef } from 'react';
import { Grid } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { serverURL } from '../../../services/FetchNodeServices';
import useStyles from './screens/ProjectCSS';

export default function Custom3Images(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));


    return (
        <div style={{ padding: matches ? '2%' : '0 7% 2%', position: 'relative' }}>
            <h3 style={{ fontWeight: 500, fontSize: 30, margin: 0, marginBottom: '1%' }}>{props.title}</h3>
            <Grid container spacing={2} style={{ marginBottom: 0, paddingBottom: 0 }}>
                <Grid item md={4}>
                    <img src={`${serverURL}/images/${props.image1}`} style={{ width: '100%', borderRadius: 15 }} />
                </Grid>
                <Grid item md={4}>
                    <img src={`${serverURL}/images/${props.image2}`} style={{ width: '100%', borderRadius: 15 }} />
                </Grid>
                <Grid item md={4}>
                    <img src={`${serverURL}/images/${props.image3}`} style={{ width: '100%', borderRadius: 15 }} />
                </Grid>
            </Grid>
        </div>
    );
}
