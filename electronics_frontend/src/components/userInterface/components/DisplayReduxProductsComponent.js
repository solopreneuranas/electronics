import React, { useState } from 'react';
import { useDispatch } from "react-redux"
import { useSelector } from 'react-redux';
import MaterialTable from "@material-table/core";
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Grid, TextField, Button } from "@mui/material";
import Swal from 'sweetalert2'

export default function DisplayReduxProductsComponent() {

    var employees = useSelector(state => state.employees)
    var employeesData = Object.values(employees)

    var navigate = useNavigate()
    var dispatch = useDispatch()
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const [salary, setSalary] = useState('')
    const [number, setNumber] = useState('')
    const [open, setOpen] = useState(false);

    const handleUpdate = () => {
        var body = { 'id': id, 'name': name, 'salary': salary, 'number': number }
        dispatch({ type: 'Add_Employee', payload: [id, body] })
        Swal.fire({
            icon: 'success',
            title: 'Employee updated sucessfully!',
            showConfirmButton: true
        })
    }

    const handleOpen = (rowData) => {
        setId(rowData.id)
        setName(rowData.name)
        setSalary(rowData.salary)
        setNumber(rowData.number)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false);
    };

    const editEmployeeDialog = () => {
        return (
            <div>
                <Dialog open={open}
                    onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText>
                            {editEmployee()}
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }

    const editEmployee = () => {
        return (
            <div>
                <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '90%', margin: 'auto' }} >
                    <Grid item md={12}>
                        <h3 style={{ fontWeight: 500, fontSize: 20, margin: 0 }}>Edit Employee:</h3>
                        {/* <TextField value={id} onChange={(event) => setId(event.target.value)} label="Employee Id" fullWidth style={{ margin: '3% 0 1%' }} /> */}
                        <TextField value={name} onChange={(event) => setName(event.target.value)} label="Employee Name" fullWidth style={{ margin: '3% 0 1%' }} />
                        <TextField value={salary} onChange={(event) => setSalary(event.target.value)} label="Employee Salary" fullWidth style={{ margin: '1% 0' }} />
                        <TextField value={number} onChange={(event) => setNumber(event.target.value)} label="Employee Number" fullWidth style={{ margin: '1% 0 3%' }} />
                        <Button onClick={handleUpdate} variant='outlined' style={{ marginRight: '3%' }}>Update</Button>
                        <Button variant='contained' style={{ boxShadow: 'none' }}>Delete</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }

    const displayEmployees = () => {
        return (
            <MaterialTable
                title="Employees List:"
                columns={[
                    { title: 'Id', field: 'id' },
                    { title: 'Name', field: 'name' },
                    { title: 'Salary', field: 'salary' },
                    { title: 'Number', field: 'number' }
                ]}
                data={employeesData}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'Edit employee',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                        icon: 'add',
                        tooltip: 'Add Employee',
                        isFreeAction: true,
                        onClick: (event) => navigate('/employee')
                    }
                ]}
            />
        )
    }

    return (
        <div>
            <Grid container spacing={1} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '50%', margin: 'auto' }} >
                <Grid item md={12}>
                    {editEmployeeDialog()}
                    {displayEmployees()}
                </Grid>
            </Grid>
        </div>
    )
}