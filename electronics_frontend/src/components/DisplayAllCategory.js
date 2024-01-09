import * as React from 'react';

import { Grid, TextField, Button, Avatar } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Alert from '@mui/material/Alert';
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import MaterialTable from "@material-table/core";
import { getData, serverURL, postData } from "../services/FetchNodeServices";
import Swal from 'sweetalert2'
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';
import { useNavigate } from 'react-router-dom';


import '../App.css';

var useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    displaybox: {
        width: '1200px',
        height: 'auto',
        padding: '1.5%',
        borderRadius: '10px'
    },
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
    },
    box: {
        width: '500px',
        height: 'auto',
        padding: '1.5%',
        borderRadius: '10px'
    }
})

export default function DisplayAllCategory() {
    const useStyle = useStyles()
    var navigate = useNavigate()
    const [category, setCategory] = useState([])
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState('')
    const [categoryID, setCategoryID] = useState('')
    const [image, setImage] = useState({ bytes: '', filename: '' })
    const [status, setStatus] = useState('')
    const [getAlert, setAlert] = useState('')
    const [getErrors, setErrors] = useState({})
    const [getBtnStatus, setBtnStatus] = useState(false)
    const [getOldImage, setOldImage] = useState('')

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
        if (image.filename.length === 0) {
            error = true
            handleError('Please select image', 'image')
        }
        return error
    }

    const handleImage = (event) => {
        setImage({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
        setBtnStatus(true)
    }


    const handleDataUpdate = async () => {
        var error = validation()
        if (error === false) {
            var body = { categoryname: categoryName, status: status, categoryid: categoryID }
            var response = await postData('category/update_category', body)
            if (response.status === true) {
                fetchAllCategory()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Category updated sucessfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                alert('added but failed')
            }
        }
        else {
            setAlert(<Alert style={{ marginTop: '5%' }} severity="error">Error! Category not updated</Alert>)
        }
    }

    const handleImageUpdate = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('categoryid', categoryID)
            formData.append('image', image.bytes)
            var response = await postData('category/update_category_image', formData)
            if (response.status === true) {
                setBtnStatus(false)
                fetchAllCategory()
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Image updated sucessfully!',
                    showConfirmButton: false,
                    timer: 1500
                })
            } else {
                alert('added but failed')
            }
        }
        else {
            setAlert(<Alert style={{ marginTop: '5%' }} severity="error">Error! Category not updated</Alert>)
        }
    }

    const handleImageCancel = () => {
        setImage({ filename: getOldImage, bytes: '' })
        setBtnStatus(false)
    }

    const handleSumit = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('categoryname', categoryName)
            formData.append('image', image.bytes)
            var response = await postData('category/delete_category', formData)
            if (response.status === true) {
                fetchAllCategory()
                setAlert(<Alert style={{ marginTop: '5%' }} severity="success">Category deleted sucessfully!</Alert>)
            } else {
                alert('added but failed')
            }
        }
        else {
            setAlert(<Alert style={{ marginTop: '5%' }} severity="error">Empty field! Category not deleted</Alert>)
        }
    }


    const Category = () => {

        return (
            <div className={useStyle.root}>
                <div>
                    <Grid container spacing={1}>
                        <Grid item xs={12} >
                            <h2 style={{ color: "black", margin: 0 }}>Category: <font style={{ color: '#004cef' }}>{categoryName}</font></h2>
                        </Grid>

                        <Grid item xs={12} className={useStyle.center}>
                            <Button
                                component="label"
                                onFocus={() => handleError('', 'image')}
                                error={getErrors.image}
                                onChange={handleImage}
                                style={{ position: 'relative' }}
                            >
                                <div className={useStyle.center}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: '50%',
                                        background: 'white',
                                        position: 'absolute',
                                        zIndex: '2',
                                        right: '0',
                                        bottom: '0'
                                    }}>
                                    <CameraAltIcon style={{ color: 'black' }} />
                                </div>
                                <input hidden type="file" accept="images/*" />
                                <Avatar src={image.filename} style={{ width: 150, height: 150 }} />
                            </Button>
                        </Grid>

                        {getBtnStatus ? <Grid container spacing={3} style={{ marginTop: '1%' }}>
                            <Grid item xs={6} className={useStyle.right}>
                                <Button startIcon={<SaveIcon />} onClick={handleImageUpdate} variant='outlined'>Update</Button>
                            </Grid>
                            <Grid item xs={6} className={useStyle.left}>
                                <Button startIcon={<SaveIcon />} onClick={handleImageCancel} variant='outlined'>Cancel</Button>
                            </Grid>
                        </Grid>
                            : <></>}

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
                        <Grid item xs={12}>
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.image}</p>
                        </Grid>
                    </Grid>
                    <div>
                        {getAlert}
                    </div>
                </div>
            </div>
        )
    }



    const fetchAllCategory = async () => {
        var response = await getData('category/display_all_category')
        setCategory(response.categoryData)
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const handleOpen = (rowData) => {
        setCategoryID(rowData.categoryid)
        setCategoryName(rowData.categoryname)
        setStatus(rowData.status)
        setImage({ filename: `${serverURL}/images/${rowData.image}`, bytes: '' })
        setOpen(true)
        setOldImage(`${serverURL}/images/${rowData.image}`)
    }

    const handleDelete = (rowData) => {
        setCategoryID(rowData.categoryid)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#004cef',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                var body = { categoryid: rowData.categoryid }
                var response = await postData('category/delete_category', body)
                fetchAllCategory()
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const EditCategoryDialog = () => {
        return (
            <div>
                <Dialog open={open}
                    onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText>
                            {Category()}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' startIcon={<SaveIcon />}  onClick={handleDataUpdate}>Update</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    function DisplayCategory() {
        return (
            <MaterialTable 
                title="CATEGORY LIST"
                columns={[
                    { title: 'Category Name', render: (rowData) => <div style={{ width: 900 }}>{rowData.categoryname}</div> },
                    { title: 'Image', field: 'image', render: (rowData) => <img src={`${serverURL}/images/${rowData.image}`} style={{ width: '80px', height: '80px', borderRadius: '50%' }} /> }
                ]}
                data={category}

                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Category',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Category',
                        onClick: (event, rowData) => handleDelete(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add category',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/category')
                    }

                ]}
            />
        )
    }


    return (
        <div className={useStyle.root}>
            <div className={useStyle.displaybox}>
                <Grid container spacing={3}>
                    <Grid item xs={12}
                        style={{
                            borderRadius: '20px',
                            width: '100%'
                        }}
                    >
                        {DisplayCategory()}
                        {EditCategoryDialog()}
                    </Grid>
                </Grid>
                <div>
                </div>
            </div>
        </div>
    )
}