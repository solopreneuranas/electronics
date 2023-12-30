import * as React from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    home_root: {
        background: '#191919',
        color: 'white',
        margin: 0,
        height: '100%',
    },
    banner_hover: {
        cursor: 'pointer'
    },
    like_button_div: {
        right: '4%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'absolute',
    }
});

export default useStyles;
