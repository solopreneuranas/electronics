import { FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button, Avatar } from "@mui/material";
import FolderIcon from '@mui/icons-material/Folder';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { getData, postData } from "../services/FetchNodeServices";
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

export default function Products() {
    const useStyle = useStyles()

    const [productName, setProductName] = useState('')
    const [brandId, setBrandId] = useState('')
    const [categoryId, setCategoryId] = useState('')
    const [picture, setPicture] = useState({ bytes: '', filename: '' })
    const [getErrors, setErrors] = useState({})
    const [categoryList, setCategoryList] = useState([])
    const [brandsList, setBrandsList] = useState([])

    const fetchAllCategory = async () => {
        var result = await getData('category/display_all_category')
        setCategoryList(result.categoryData)
    }

    useEffect(function () {
        fetchAllCategory()
    }, [])

    const fillAllCategory = () => {
        return categoryList.map((item) => {
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })

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

    const handleReset = () => {
        setProductName('')
        setCategoryId('')
        setBrandsList([])
        setPicture({ bytes: '', filename: '' })
    }

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        if (productName.length === 0) {
            error = true
            handleError('Please enter product name', 'productName')
        }
        if (brandId.length === 0) {
            error = true
            handleError('Please choose brand', 'brandId')
        }
        if (categoryId.length === 0) {
            error = true
            handleError('Please choose category', 'categoryId')
        }
        if (picture.filename.length === 0) {
            error = true
            handleError('Please select picture', 'picture')
        }
        return error
    }

    const handlePicture = (event) => {
        setPicture({ bytes: event.target.files[0], filename: URL.createObjectURL(event.target.files[0]) })
    }


    const handleSumit = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('productname', productName)
            formData.append('categoryid', categoryId)
            formData.append('brandid', brandId)
            formData.append('picture', picture.bytes)
            var response = await postData('products/submit_product', formData)
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Product added sucessfully!',
                    showConfirmButton: true
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Product not added!',
                    showConfirmButton: true
                })
            }
        }
    }


    return (
        <div className={useStyle.root}>
            <div className={useStyle.box}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Heading image={categoryicon} caption="New Product" link='/dashboard/displayallproducts' />
                    </Grid>
                    <Grid item xs={12} className={useStyle.center}>
                        <Button
                            style={{ display: 'flex', flexDirection: 'column' }}
                            onFocus={() => handleError('', 'picture')}
                            error={getErrors.picture}
                            onChange={handlePicture} component="label" fullWidth>
                            <input hidden type="file" accept="images/*" />
                            <Avatar src={picture.filename} style={{ width: 80, height: 80 }}>
                                <FolderIcon style={{ width: 40, height: 40 }} />
                            </Avatar>
                            Choose Product picture
                        </Button>

                    </Grid>
                    <Grid item xs={12}>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.picture}</p>
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Brands</InputLabel>
                            <Select
                                value={brandId}
                                onFocus={() => handleError('', 'brandId')}
                                error={getErrors.brandId}
                                label="Category"
                                onChange={(event) => setBrandId(event.target.value)}
                            >
                                {fillBrands()}
                            </Select>
                        </FormControl>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.brandId}</p>
                    </Grid>


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


                    <Grid item xs={6} className={useStyle.center}>
                        <Button onClick={handleSumit} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Add</Button>
                    </Grid>
                    <Grid item xs={6} className={useStyle.center}>
                        <Button onClick={handleReset} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}