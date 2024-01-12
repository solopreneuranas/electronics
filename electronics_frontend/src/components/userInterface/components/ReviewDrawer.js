import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Button, Grid } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { postData, serverURL } from '../../../services/FetchNodeServices';
import { useState } from 'react';
import Rating from '@mui/material/Rating';
import { TextField, InputAdornment } from "@mui/material";
import Swal from 'sweetalert2'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ReviewDrawer(props) {

    const [state, setState] = React.useState({ right: false })
    var user = JSON.parse(localStorage.getItem("User"))
    const theme = useTheme();
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    var product = props.product
    const [value, setValue] = useState(5)
    const [number, setNumber] = useState(user[0]?.mobileno)
    const [firstName, setFirstName] = useState(user[0]?.firstname)
    const [lastName, setLastName] = useState(user[0]?.lastname)
    const [description, setDescription] = useState('')

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    }

    const handleDrawer = (event) => {
        if (user) {
            toggleDrawer('right', true)(event);
        }
        else {
            alert('Not log in')
        }
    };


    const rating = () => {
        return (
            <Box style={{ margin: '1% 0' }}>
                <Rating
                    name="simple-controlled"
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    style={{ color: '#12DAA8', fontSize: 35 }} />
            </Box>
        )
    }

    const handleSubmitReview = async () => {
        var body = { 'mobileno': number, 'firstname': firstName, 'lastname': lastName, 'description': description, 'productdetailsid': product.productdetailsid, ratings: value }
        var response = await postData('ui-Home/submit_review', body)
        if (response.status === true) {
            Swal.fire({
                icon: 'success',
                toast: true,
                title: 'Review submitted sucessfully!',
                showConfirmButton: false,
                timer: 1500
            })
        } else {
            alert('added but failed')
        }
    }

    const reviewComponent = () => {
        return (
            <div>
                <Grid container spacing={1} style={{ padding: '5%' }}>
                    <Grid item md={12}>
                        <h3 style={{ margin: 0, fontWeight: 600, fontSize: 25 }}>Write a Review</h3><br />
                        <hr style={{ opacity: '40%' }} /><br />
                        <Grid container spacing={1} style={{}}>
                            <Grid item md={2}>
                                <img src={`${serverURL}/images/${product.picture.split(',')[0]}`} style={{ width: 100, height: 100 }} />
                            </Grid>
                            <Grid item md={5}>
                                <h3 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>{product.brandname} {product.productname} {product.modelno} {product.color}</h3>
                            </Grid>
                        </Grid><br />
                        <hr style={{ opacity: '40%' }} /><br />
                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>Product Rating</h3>
                        {rating()}
                        <hr style={{ opacity: '40%' }} /><br />
                        <h3 style={{ margin: 0, fontWeight: 500, fontSize: 22 }}>Write your Review</h3><br />
                        <Grid item md={12} style={{ margin: '1% 0', width: '100%' }}>
                            <div style={{ width: 'auto', height: 170, display: 'flex', background: 'transparent', padding: '2% 4%', borderRadius: 10, border: '1px solid #525252' }}>
                                <TextField fullWidth
                                    onChange={(event) => setDescription(event.target.value)}
                                    sx={{ input: { color: 'white', fontSize: 18 } }}
                                    variant="standard"
                                    hiddenLabel
                                    placeholder="Write your Review"
                                    InputProps={{
                                        disableUnderline: true
                                    }} />
                            </div>
                        </Grid><br />
                        <Grid item md={4}>
                            <Button onClick={handleSubmitReview} variant='contained' style={{ borderRadius: 10, background: '#12DAA8', color: 'black', fontWeight: 600, padding: '4% 15%' }}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const list = (anchor) => (
        <Box
            style={{ width: matches_md ? '100%' : 900, position: 'relative' }}
            role="presentation"
            onKeyDown={(event) => {
                if (event.key === 'Escape') {
                    toggleDrawer(anchor, false)(event);
                }
            }}
        >
            <CloseIcon onClick={toggleDrawer('right', false)} style={{ position: 'absolute', right: '3%', top: '4%', cursor: 'pointer', opacity: '70%' }} />
            {reviewComponent()}
        </Box>
    );


    return (
        <div>
            <React.Fragment key={'right'}>
                <Button onClick={handleDrawer} variant='outlined' style={{ margin: 0, fontWeight: 500, fontSize: 15, border: '1px solid white', color: 'white', padding: '1% 5%', borderRadius: 10 }}>Write a Review</Button>
                <Drawer
                    anchor={'right'}
                    open={state['right']}
                    onClose={toggleDrawer('right', false)}
                >
                    {list('right')}
                </Drawer>
            </React.Fragment>
        </div>
    );
}