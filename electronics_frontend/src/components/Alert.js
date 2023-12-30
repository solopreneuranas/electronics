import * as React from 'react';
import { makeStyles } from "@mui/styles";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
} from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';

import Category from './Category';

var useStyles = makeStyles({
    root: {
        width: '100%',
        margin: 'auto',
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: 'auto'
    }
})

export default function CategoryDialog() {
    const useStyle = useStyles()
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className={useStyle.root}>            
                <Fab color="primary" aria-label="add" onClick={handleClickOpen} style={{background: '#004cef', margin: 0}}>
                    <AddIcon />
                </Fab>      
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">

                <DialogTitle id="alert-dialog-title">
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Category />
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}