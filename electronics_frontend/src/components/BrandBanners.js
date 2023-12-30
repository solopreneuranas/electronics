import { FormControl, InputLabel, Select, MenuItem, Grid, TextField, Button, Avatar } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useState, useEffect } from "react";
import { getData, postData } from "../services/FetchNodeServices";
import Swal from 'sweetalert2'
import { DropzoneArea } from 'material-ui-dropzone'

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
        width: '700px',
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

export default function BrandBanners() {
    const useStyle = useStyles()

    const [brandId, setBrandId] = useState('')
    const [picture, setPicture] = useState({ bytes: '', filename: '' })
    const [getErrors, setErrors] = useState({})
    const [brandsList, setBrandsList] = useState([])
    const [files, setFiles] = useState([])

    const fetchBrands = async () => {
        var result = await getData('brands/fetch_brands_group')
        setBrandsList(result.brandsData)
    }

    useEffect(function () {
        fetchBrands()
    }, [])

    const fillBrands = () => {
        return brandsList.map((item) => {
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handleReset = () => {
        setBrandId('')
        setPicture({ bytes: '', filename: '' })
    }

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
        if (brandId.length === 0) {
            error = true
            handleError('Please choose brand', 'brandId')
        }
        if (files.length === 0) {
            error = true
            handleError('Please upload banners', 'pictures')
        }
        return error
    }

    const handleSumit = async () => {
        var error = validation()
        if (error === false) {
            var formData = new FormData()
            formData.append('brandid', brandId)
            files.map((file, i) => {
                formData.append('picture' + i, file)
            })
            var response = await postData('brandbanners/submit_brand_banners', formData)
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Brand Banners submitted sucessfully!',
                    showConfirmButton: true
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Brand Banners not submitted!',
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
                        <Heading image={categoryicon} caption="Brand Banners" link='/displayallproductdetails' />
                    </Grid>
                    <Grid item xs={12} className={useStyle.center}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop images here or click"}
                            onChange={(files) => setFiles(files)} filesLimit={50} maxFileSize={999999999} />
                    </Grid>

                    <Grid item xs={12}>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.pictures}</p>
                    </Grid>

                    <Grid item xs={12}>
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

                    <Grid item xs={6} className={useStyle.center}>
                        <Button onClick={handleSumit} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Submit</Button>
                    </Grid>
                    <Grid item xs={6} className={useStyle.center}>
                        <Button onClick={handleReset} variant="contained" fullWidth style={{ background: '#004cef', padding: '5% 0', fontWeight: '500' }}>Reset</Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}