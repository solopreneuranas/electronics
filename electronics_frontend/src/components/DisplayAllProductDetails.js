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
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMemo } from "react";
import { DropzoneArea } from 'material-ui-dropzone'
import SaveIcon from '@mui/icons-material/Save';
import categoryicon from '../../src/assets/category.png'

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
        width: '700px',
        height: 'auto',
        padding: '1.5%',
        borderRadius: '10px'
    }
})

export default function DisplayAllProductDetails() {
    const useStyle = useStyles()
    var navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const [productId, setProductId] = useState('')
    const [productDetailsId, setProductDetailsId] = useState('')
    const [brandId, setBrandId] = useState('')
    const [picture, setPicture] = useState({ bytes: '', filename: '' })
    const [getErrors, setErrors] = useState({})
    const [categoryList, setCategoryList] = useState([])
    const [categoryId, setCategoryId] = useState('')
    const [brandsList, setBrandsList] = useState([])
    const [modelno, setModelno] = useState('')
    const [color, setColor] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [offerPrice, setOfferPrice] = useState('')
    const [stock, setStock] = useState('')
    const [status, setStatus] = useState('')
    const [hsnCode, setHsnCode] = useState('')
    const [productsList, setProductsList] = useState([])
    const [productDetailsList, setProductDetailsList] = useState([])
    const [files, setFiles] = useState([])
    const [picturesDialog, setPicturesDialog] = useState(false)


    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', "strike"],
                [{ 'list': 'ordered' }, { 'list': 'bullet' },
                { 'indent': '-1' }, { 'indent': '+1' }],
                ['image', "link"],
                [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
            ]
        },
    }), [])

    const handleQuill = (newValue) => {
        setDescription(newValue)
        if (description.trim() !== '') {
            handleError('', 'description');
        }
    }

    const [value, setValue] = useState('');

    const fetchAllProductDetails = async () => {
        var result = await getData('productdetails/fetch_product_details')
        setProductDetailsList(result.data)
    }

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

    const fetchProductsByBrands = async (bid) => {
        var body = { 'brandid': bid }
        var result = await postData('products/fetch_products_by_brands', body)
        setProductsList(result.data)
    }

    const handleBrandChange = (event) => {
        setBrandId(event.target.value)
        fetchProductsByBrands(event.target.value)
    }

    const fillProducts = () => {
        return productsList.map((item) => {
            return <MenuItem value={item.productid}>{item.productname}</MenuItem>
        })
    }

    useEffect(function () {
        fetchAllCategory()
        fetchAllProducts()
        fetchAllProductDetails()
    }, [])


    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        if (brandId.length === 0) {
            error = true
            handleError('Please choose brand', 'brandId')
        }
        if (productId.length === 0) {
            error = true
            handleError('Please choose product', 'productId')
        }
        if (categoryId.length === 0) {
            error = true
            handleError('Please choose category', 'categoryId')
        }
        if (modelno.length === 0) {
            error = true
            handleError('Please enter Model no', 'modelno')
        }
        if (stock.length === 0) {
            error = true
            handleError('Please enter stock', 'stock')
        }
        if (color.length === 0) {
            error = true
            handleError('Please enter color', 'color')
        }
        if (status.length === 0) {
            error = true
            handleError('Please choose status', 'status')
        }
        if (price.length === 0) {
            error = true
            handleError('Please enter price', 'price')
        }
        if (hsnCode.length === 0) {
            error = true
            handleError('Please enter hsn code', 'hsnCode')
        }
        if (offerPrice.length === 0) {
            error = true
            handleError('Please enter offer price', 'offerPrice')
        }
        if (description.length === 0) {
            error = true
            handleError('Please enter description', 'description')
        }
        return error
    }

    const handleDataUpdate = async () => {
        var error = validation()
        if (error === false) {
            var body = { 'productdetailsid': productDetailsId, 'brandid': brandId, 'categoryid': categoryId, 'productid': productId, 'description': description, 'modelno': modelno, 'color': color, 'stock': stock, 'price': price, 'offerprice': offerPrice, 'status': status, 'hsncode': hsnCode }
            var response = await postData('productdetails/update_productdetails_data', body)
            if (response.status === true) {
                fetchAllProductDetails()
                Swal.fire({
                    icon: 'success',
                    title: 'Product Details updated sucessfully!',
                    showConfirmButton: true
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Product Details not updated!',
                    showConfirmButton: true
                })
            }
        }
    }

    const handlePicturesUpdate = async () => {

        var formData = new FormData()
        formData.append('productdetailsid', productDetailsId)
        files.map((file, i) => {
            formData.append('picture' + i, file)
        })
        var response = await postData('productdetails/update_product_details_pictures', formData)
        if (response.status === true) {
            fetchAllProductDetails()
            Swal.fire({
                icon: 'success',
                title: 'Pictures updated sucessfully!',
                showConfirmButton: true
            })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Pictures not updated!',
                showConfirmButton: true
            })
        }

    }

    const handleOpen = (rowData) => {
        setModelno(rowData.modelno)
        setColor(rowData.color)
        setDescription(rowData.description)
        setPrice(rowData.price)
        setOfferPrice(rowData.offerprice)
        setStock(rowData.stock)
        setStatus(rowData.status)
        setHsnCode(rowData.hsncode)
        setProductDetailsId(rowData.productdetailsid)
        setProductId(rowData.productid)
        setBrandId(rowData.brandid)
        setCategoryId(rowData.categoryid)
        fetchBrandByCategory(rowData.categoryid)
        fetchProductsByBrands(rowData.brandid)
        setOpen(true)
    }

    const handlePicturesDialogOpen = (rowData) => {
        setProductDetailsId(rowData.productdetailsid);
        var pictures = rowData.picture.split(',').map((item) => {
            return `${serverURL}/images/${item}`;
        });
        setFiles(pictures); // Set the files state with the images for the current record
        setPicturesDialog(true);
    };


    const editProduct = () => {

        return (
            <div className={useStyle.root}>
                <div className={useStyle.box}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={categoryId}
                                    onFocus={() => handleError('', 'categoryId')}
                                    error={getErrors.categoryId}
                                    label="Category"
                                    onChange={handleCategoryChange}
                                >
                                    {fillAllCategory()}
                                </Select>
                            </FormControl>
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.categoryId}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Brands</InputLabel>
                                <Select
                                    value={brandId}
                                    onFocus={() => handleError('', 'brandId')}
                                    error={getErrors.brandId}
                                    label="Category"
                                    onChange={handleBrandChange}
                                >
                                    {fillBrands()}
                                </Select>
                            </FormControl>
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.brandId}</p>
                        </Grid>
                        <Grid item xs={4}>
                            <FormControl fullWidth>
                                <InputLabel>Product</InputLabel>
                                <Select
                                    value={productId}
                                    onFocus={() => handleError('', 'productId')}
                                    error={getErrors.productId}
                                    label="Product"
                                    onChange={(event) => setProductId(event.target.value)}
                                >
                                    {fillProducts()}
                                </Select>
                            </FormControl>
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.brandId}</p>
                        </Grid>


                        <Grid item xs={4}>
                            <TextField
                                value={modelno}
                                error={getErrors.modelno}
                                helperText={getErrors.modelno}
                                onChange={(event) => setModelno(event.target.value)}
                                onFocus={() => handleError('', 'modelno')}
                                label="Model No."
                                fullWidth />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                value={color}
                                error={getErrors.color}
                                helperText={getErrors.color}
                                onChange={(event) => setColor(event.target.value)}
                                onFocus={() => handleError('', 'color')}
                                label="Color"
                                fullWidth />
                        </Grid>

                        <Grid item xs={4}>
                            <TextField
                                value={stock}
                                error={getErrors.stock}
                                helperText={getErrors.stock}
                                onChange={(event) => setStock(event.target.value)}
                                onFocus={() => handleError('', 'stock')}
                                label="Stock"
                                fullWidth />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={price}
                                error={getErrors.price}
                                helperText={getErrors.price}
                                onChange={(event) => setPrice(event.target.value)}
                                onFocus={() => handleError('', 'price')}
                                label="Price"
                                fullWidth />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={offerPrice}
                                error={getErrors.offerPrice}
                                helperText={getErrors.offerPrice}
                                onChange={(event) => setOfferPrice(event.target.value)}
                                onFocus={() => handleError('', 'offerPrice')}
                                label="Offer Price"
                                fullWidth />
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Status</InputLabel>
                                <Select
                                    value={status}
                                    label="Status"
                                    onChange={(event) => setStatus(event.target.value)}>

                                    <MenuItem value='Discontinue'>Discontinue</MenuItem>
                                    <MenuItem value='Deal of the Day'>Deal of the Day</MenuItem>
                                    <MenuItem value='Trending'>Trending</MenuItem>
                                    <MenuItem value='Sale'>Sale</MenuItem>
                                    <MenuItem value='New Arrival'>New Arrival</MenuItem>
                                    <MenuItem value='Discount'>Discount</MenuItem>

                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                value={hsnCode}
                                error={getErrors.hsnCode}
                                helperText={getErrors.hsnCode}
                                onChange={(event) => setHsnCode(event.target.value)}
                                onFocus={() => handleError('', 'hsnCode')}
                                label="HSN Code"
                                fullWidth />
                        </Grid>

                        <Grid item xs={12}>
                            <ReactQuill theme="snow" value={description} onChange={handleQuill} modules={modules} />
                            <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.description}</p>
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
                var body = { 'productdetailsid': rowData.productdetailsid }
                var response = await postData('productdetails/delete_product_details', body)
                fetchAllProductDetails()
                Swal.fire(
                    'Deleted!',
                    'Product Details has been deleted.',
                    'success'
                )
            }
        })
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handlePicturesDialogClose = () => {
        setPicturesDialog(false);
    }

    const editProductDialog = () => {
        return (
            <div>
                <Dialog maxWidth={'lg'} open={open}
                    onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText>
                            {editProduct()}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant= 'outlined' startIcon={<SaveIcon />}  onClick={handleDataUpdate}>Update</Button>
                        <Button variant= 'outlined' onClick={handleClose} autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }


    const editPicturesDialog = () => {
        return (
            <div>
                <Dialog maxWidth={'lg'} open={picturesDialog}
                    onClose={handlePicturesDialogClose}>
                    <DialogContent>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop images here or click"}
                            onChange={(files) => setFiles(files)} filesLimit={50}
                            initialFiles={files}
                            maxFileSize={999999999} />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='outlined' onClick={handlePicturesUpdate}>Update</Button>
                        <Button variant='outlined' onClick={handlePicturesDialogClose} autoFocus>
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
                title="Products Details List"
                columns={[
                    { title: 'Product Name', render: (rowData) => <div style={{ width: 400 }}>{rowData.productname}</div> },
                    { title: 'Category', render: (rowData) => <div>{rowData.categoryname}</div> },
                    { title: 'Brand', render: (rowData) => <div>{rowData.brandname}</div> },
                    { title: 'Product Details', render: (rowData) => <div>{rowData.modelno}</div> },
                    { title: 'Picture', field: 'picture', render: (rowData) => <img src={`${serverURL}/images/${rowData.picture.split(',')[0]}`} style={{ width: '80px', height: '80px', borderRadius: '50%' }} /> }
                ]}
                data={productDetailsList}

                actions={[
                    {
                        icon: 'photo',
                        tooltip: 'Edit Pictures',
                        onClick: (event, rowData) => handlePicturesDialogOpen(rowData)
                    },
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
                        onClick: (event) => navigate('/dashboard/productdetails')
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
                        {editPicturesDialog()}
                    </Grid>
                </Grid>
                <div>
                </div>
            </div>
        </div>
    )
}