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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

export default function DisplayAllProducts() {
    const useStyle = useStyles()
    var navigate = useNavigate()

    const [productName, setProductName] = useState('')
    const [getProductsList, setProductsList] = useState([])
    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [brandName, setBrandName] = useState('')
    const [picture, setPicture] = useState({ bytes: '', filename: '' })
    const [getErrors, setErrors] = useState({})
    const [getBtnStatus, setBtnStatus] = useState(false)
    const [getOldPicture, setOldPicture] = useState('')
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [brandsList, setBrandsList] = useState([])


    const fetchAllProducts = async () => {
        var result = await getData('products/fetch_products')
        setProductsList(result.data)
    }

    const fetchAllCategory = async () => {
        var response = await getData('category/display_all_category')
        setCategoryList(response.categoryData)
    }

    const fillAllCategory = () => {
        return (
            categoryList.map((item, i) => {
                return (
                    <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
                )
            })
        )
    }

    const fetchBrandByCategory = async (cid) => {
        var body = { 'categoryid': cid }
        var result = await postData('brands/fetch_brands_by_category', body)
        setBrandsList(result.data)
    }

    const handleCategoryChange = (event) => {
        setCategoryId(event.target.value)
        fetchBrandByCategory(event.target.value)
    }

    const fillBrands = () => {
        return brandsList.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })

    }

    useEffect(function () {
        fetchAllCategory()
        fetchAllProducts()
    }, [])


    const handleReset = () => {
        setBrandId('')
        setProductName('')
        setCategoryId('')
        setPicture({ bytes: '', filename: '' })
    }


    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        if (brandId.length === 0) {
            error = true
            handleError('Please enter brand name', 'brandName')
        }
        if (categoryId.length === 0) {
            error = true
            handleError('Please choose category', 'categoryName')
        }
        if (productName.length === 0) {
            error = true
            handleError('Please choose category', 'categoryName')
        }
        if (picture.filename.length === 0) {
            error = true
            handleError('Please select logo', 'logo')
        }
        return error
    }

    const handlePicture = (event) => {
        setPicture({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
        setBtnStatus(true)
    }


    const handleDataUpdate = async () => {
        var error = validation()
        if (error === false) {
            var body = { 'productid': productId, 'productname': productName, 'brandid': brandId, 'categoryid': categoryId }
            var response = await postData('products/update_product_data', body)
            if (response.status === true) {
                fetchAllProducts()
                Swal.fire({
                    icon: 'success',
                    toast: true,
                    title: 'Product updated sucessfully!',
                    showConfirmButton: true
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Product not updated!',
                    showConfirmButton: true
                })
            }
        }
    }

    const handlePictureUpdate = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('productid', productId)
            formData.append('picture', picture.bytes)
            var response = await postData('products/update_product_picture', formData)
            if (response.status === true) {
                setBtnStatus(false)
                fetchAllProducts()
                Swal.fire({
                    icon: 'success',
                    title: 'Picture updated sucessfully!',
                    showConfirmButton: true
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Picture not updated!',
                    showConfirmButton: true
                })
            }
        }
    }

    const handlePictureCancel = () => {
        setPicture({ filename: getOldPicture, bytes: '' })
        setBtnStatus(false)
    }

    const handleOpen = (rowData) => {
        // alert(JSON.stringify(rowData))
        setProductId(rowData.productid)
        setBrandId(rowData.brandid)
        fetchBrandByCategory(rowData.categoryid)
        setProductName(rowData.productname)
        setCategoryId(rowData.categoryid)
        setPicture({ filename: `${serverURL}/images/${rowData.picture}`, bytes: '' })
        setOpen(true)
        setOldPicture(`${serverURL}/images/${rowData.picture}`)
    }

    const editProduct = () => {

        return (
            <div className={useStyle.root}>
                <div className={useStyle.box}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} >
                            <h2 style={{ color: "black", margin: 0 }}>Product: <font style={{ color: '#004cef' }}>{productName}</font></h2>
                        </Grid>

                        <Grid item xs={12} className={useStyle.center}>
                            <Button
                                component="label"
                                onFocus={() => handleError('', 'picture')}
                                error={getErrors.picture}
                                onChange={handlePicture}
                                style={{ position: 'relative' }}>

                                <div className={useStyle.center}
                                    style={{
                                        width: 40,
                                        height: 40,
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
                                <Avatar src={picture.filename} style={{ width: 100, height: 100 }} />
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.picture}</p>
                        </Grid>

                        {getBtnStatus ? <Grid container spacing={3} style={{ marginTop: '0' }}>
                            <Grid item xs={6} className={useStyle.right}>
                                <Button startIcon={<SaveIcon />} onClick={handlePictureUpdate} variant='outlined'>Update</Button>
                            </Grid>
                            <Grid item xs={6} className={useStyle.left}>
                                <Button startIcon={<SaveIcon />} onClick={handlePictureCancel} variant='outlined'>Cancel</Button>
                            </Grid>
                        </Grid>
                            : <></>}

                        <Grid item xs={12}>
                            <TextField
                                value={productName}
                                error={getErrors.productName}
                                helperText={getErrors.productName}
                                onChange={(event) => setProductName(event.target.value)}
                                onFocus={() => handleError('', 'productName')}
                                label="Product Name"
                                fullWidth />
                        </Grid>


                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                <Select
                                    value={categoryId}
                                    label="Category"
                                    error={getErrors.categoryId}
                                    onChange={handleCategoryChange}>
                                    {fillAllCategory()}
                                </Select>
                                <p style={{ color: '#d32f2f', fontSize: '12.3px', marginLeft: '15px', marginTop: '1%' }}>{getErrors.categoryId}</p>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Brands</InputLabel>
                                <Select
                                    value={brandId}
                                    label="Brands"
                                    error={getErrors.brandId}
                                    onChange={(event) => setBrandId(event.target.value)}>
                                    {fillBrands()}
                                </Select>
                                <p style={{ color: '#d32f2f', fontSize: '12.3px', marginLeft: '15px', marginTop: '1%' }}>{getErrors.brandId}</p>
                            </FormControl>
                        </Grid>

                    </Grid>
                </div>
            </div>
        )
    }

    const handleDelete = (rowData) => {
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
                var body = { 'productid': rowData.productid }
                var response = await postData('products/delete_product', body)
                fetchAllProducts()
                Swal.fire(
                    'Deleted!',
                    'Product has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
    };

    const editProductDialog = () => {
        return (
            <div>
                <Dialog open={open}
                    onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText>
                            {editProduct()}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' onClick={handleDataUpdate} startIcon={<SaveIcon />}>Update</Button>
                        <Button variant='outlined' onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }

    const displayProducts = () => {
        return (
            <MaterialTable style={{
                marginTop: '3%'
            }}
                title="Products List"
                columns={[
                    { title: 'Product Name', render: (rowData) => <div style={{ width: 400 }}>{rowData.productname}</div> },
                    { title: 'Category', render: (rowData) => <div>{rowData.categoryname}</div> },
                    { title: 'Brand', render: (rowData) => <div>{rowData.brandname}</div> },
                    { title: 'Picture', field: 'picture', render: (rowData) => <img src={`${serverURL}/images/${rowData.picture}`} style={{ width: '80px', height: '80px', borderRadius: '50%' }} /> }
                ]}
                data={getProductsList}

                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit Product',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'delete',
                        tooltip: 'Delete Product',
                        onClick: (event, rowData) => handleDelete(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Product',
                        isFreeAction: true,
                        onClick: (event) => navigate('/dashboard/products')
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
                        {displayProducts()}
                        {editProductDialog()}
                    </Grid>
                </Grid>
                <div>
                </div>
            </div>
        </div>
    )
}