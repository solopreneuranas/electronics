import React, { useState } from 'react';
import { Grid, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';

export default function ReduxProductsComponent() {

    var navigate = useNavigate ()
    var dispatch = useDispatch()
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [salary, setSalary] = useState('')
    const [number, setNumber] = useState('')

    const handleSave = () => {
        var body = { 'id': id, 'name': name, 'salary': salary, 'number': number }
        dispatch({ type: 'Add_Employee', payload: [id, body] })
    }

    const handleDisplay = () => {
        navigate ('/displayemployees')
    }

    return (
        <div>
            <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '30%', margin: 'auto' }} >
                <Grid item md={12}>
                    <h3 style={{ fontWeight: 500, fontSize: 23 }}>Add Employee:</h3>
                    <TextField onChange={(event) => setId(event.target.value)} label="Employee Id" fullWidth style={{ margin: '0 0 1%' }} />
                    <TextField onChange={(event) => setName(event.target.value)} label="Employee Name" fullWidth style={{ margin: '1% 0' }} />
                    <TextField onChange={(event) => setSalary(event.target.value)} label="Employee Salary" fullWidth style={{ margin: '1% 0' }} />
                    <TextField onChange={(event) => setNumber(event.target.value)} label="Employee Number" fullWidth style={{ margin: '1% 0 3%' }} />
                    <Button onClick={handleSave} variant='outlined' style={{ marginRight: '3%' }}>Save</Button>
                    <Button onClick={handleDisplay} variant='contained' style={{ boxShadow: 'none' }}>Display</Button>
                </Grid>
            </Grid>
        </div>
    )
}