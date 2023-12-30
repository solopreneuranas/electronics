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

export default function Banners() {
    const useStyle = useStyles()

    const [bannerId, setBannerId] = useState('')
    const [picture, setPicture] = useState({ bytes: '', filename: '' })
    const [getErrors, setErrors] = useState({})
    const [files, setFiles] = useState([])


    const handleReset = () => {
        setPicture([{ bytes: '', filename: '' }])
    }

    const handleError = (error, label) => {
        setErrors((prev) => ({ ...prev, [label]: error }))
    }

    const validation = () => {
        var error = false
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
            files.map((file, i) => {
                formData.append('picture' + i, file)
            })
            var response = await postData('banners/submit_banners', formData)
            if (response.status === true) {
                Swal.fire({
                    icon: 'success',
                    title: 'Banners uploaded sucessfully!',
                    showConfirmButton: true
                })
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Banners not uploaded!',
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
                        <Heading image={categoryicon} caption="Banners" link='/displayallbanners' />
                    </Grid>
                    <Grid item xs={12} className={useStyle.center}>
                        <DropzoneArea
                            acceptedFiles={['image/*']}
                            dropzoneText={"Drag and drop an image here or click"}
                            onChange={(files) => setFiles(files)} filesLimit={50} maxFileSize={999999999} />
                    </Grid>

                    <Grid item xs={12}>
                        <p style={{ color: '#FF0000', fontSize: '12.3px', marginLeft: '15px', marginTop: '0' }}>{getErrors.pictures}</p>
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