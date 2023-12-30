import { Grid, TextField, Button, Avatar } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { postData } from "../services/FetchNodeServices";
import Swal from 'sweetalert2'
import Heading from './projectComponent/Heading';

import categoryicon from '../../src/assets/category.png'

var useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        width: '500px',
        height: 'auto',
        padding: '1.5%',
        borderRadius: '10px'
    },
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default function Category() {
    const useStyle = useStyles()
    const [categoryName, setCategoryName] = useState('')
    const [getStatus, setStatus] = useState('')
    const [image, setImage] = useState({ bytes: '', filename: '' })
    const [getAlert, setAlert] = useState('')
    const [getErrors, setErrors] = useState({})

    const handleReset = () => {
        setCategoryName('')
        setImage({ bytes: '', filename: '' })
    }

    const handleError = (error, label) => {
        setAlert('')
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        if (categoryName.length === 0) {
            error = true
            handleError('Please enter category', 'categoryName')
        }
        if (getStatus.length === 0) {
            error = true
            handleError('Please enter status', 'status')
        }
        if (image.filename.length === 0) {
            error = true
            handleError('Please select image', 'image')
        }
        return error
    }

    function handleImage(event) {
        setImage({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }

    const handleSumit = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('categoryname', categoryName)
            formData.append('image', image.bytes)
            var response = await postData('category/submit_category', formData)
            if (response.status === true) {
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Category added sucessfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                alert('added but failed')
            }
        }
        else {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Category not added sucessfully!',
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    return (
        <div className={useStyle.root}>
            <div className={useStyle.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Heading image={categoryicon} caption="New Category" link='/dashboard/displayallcategory' />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            value={categoryName}
                            error={getErrors.categoryName}
                            helperText={getErrors.categoryName}
                            onChange={(event) => setCategoryName(event.target.value)}
                            onFocus={() => handleError('', 'categoryName')}
                            label="Category Name"
                            fullWidth />
                    </Grid>
                    <Grid item xs={6} className={useStyle.center}>
                        <Button
                            onFocus={() => handleError('', 'image')}
                            error={getErrors.image}
                            onChange={handleImage} component="label" variant="outlined" startIcon={<CloudUploadIcon />}
                            style={{ border: '1px solid gray', padding: '5% 0', fontWeight: '500', color: 'gray' }} fullWidth>Upload Icon
                            <input hidden type="file" accept="images/*" />
                        </Button>
                    </Grid>
                    <Grid item xs={6} className={useStyle.center}>
                        <Avatar src={image.filename} style={{ width: 56, height: 56 }}>
                            <FolderIcon />
                        </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.image}</p>
                    </Grid>
                    <Grid item xs={6} className={useStyle.center}>
                        <Button onClick={handleSumit} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Add</Button>
                    </Grid>
                    <Grid item xs={6} className={useStyle.center}>
                        <Button onClick={handleReset} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Reset</Button>
                    </Grid>
                </Grid>
                <div>
                    {getAlert}
                </div>
            </div>
        </div>
    )
}