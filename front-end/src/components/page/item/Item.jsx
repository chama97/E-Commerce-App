import React, { Fragment, useState, useEffect } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ItemService from '../../../service/ItemService';
// import Alert from '@mui/material/Alert';
import ResponsiveAppBar from '../../nav/Navbar'
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Cancel } from '@mui/icons-material';
import Alert from '../../alert/Alert';
import "./style.scss";


const BASE_IMAGE_URL = 'http://localhost:3001/uploads/';

const Item = () => {

    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [qty, setQty] = useState('');
    const [photo, setPhoto] = useState('');
    const [price, setPrice] = useState('');
    const [btnLabel, setButtonLabel] = useState('SAVE');
    const [btnColor, setButtoColor] = useState('success');
    const [dataArray, setDataArray] = useState([]);
    const [alert, setAlert] = useState(null);

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };
    const handleQtyChange = (event) => {
        setQty(event.target.value);
    };
    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };
    const handlePhotoChange = (event) => {
        const file = event.target.files[0];
        setPhoto(file);

        const reader = new FileReader();
        reader.onloadend = () => {
            const photoViewer = document.getElementById('photoViewer');
            if (photoViewer) {
                photoViewer.src = reader.result;
            }
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };


    const handlePhotoClick = () => {
        const input = document.getElementById('photo-input');
        input.value = '';
        input.click();
    };

    const clearFormData = () => {
        setDescription('');
        setName('');
        setPrice('');
        setQty('');
        setPhoto('');
        setButtonLabel('SAVE');
        setButtoColor('success');
    }

    const handleCancelImage = (event) => {
        event.stopPropagation();
        setPhoto('');
    }


    const updateItem = (data) => {
        setId(data.id);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setQty(data.qty);
        setPhoto(data.photo);
        setButtonLabel('Update');
        setButtoColor('primary');
    };


    const deleteItem = async (id) => {
        console.log(id);
        let res = await ItemService.deleteItem(id);
        if (res.status === 200) {
            console.log("ok");
            showAlert('success', 'Item Deleted Successfully')
            loadData();
        } else {
            showAlert('error', 'Item Deleted Unsuccessfully')
            console.log("error");
        }
    }

    const loadData = async () => {
        let res = await ItemService.fetchItems();
        if (res.status === 200) {
            setDataArray(res.data.data);
        } else {
            console.log("fetching error: " + res)
        }
    };

    useEffect(() => {
        loadData();
    }, []);


    const handleSubmit = async () => {
        if (btnLabel.match("SAVE")) {
            const image = photo;
            const data = { name: name, description: description, qty: qty, price: price }

            const formData = new FormData();
            formData.append('photo', image);
            formData.append('data', JSON.stringify(data));

            console.log([...formData]);

            const res = await ItemService.postItem(formData);
            if (res.status === 201) {
                console.log("ok");
                showAlert('success', 'Item Saved Successfully')
                loadData();
                clearFormData();
            } else {
                showAlert('error', 'Item Saved Unsuccessfully')
                console.log("error")
            }
        } else {
            const itemId = id;
            const image = photo;
            const data = { name: name, description: description, qty: qty, price: price };

            const formData = new FormData();
            formData.append('photo', image);
            formData.append('data', JSON.stringify(data));

            console.log([...formData]);

            const res = await ItemService.updateItem(itemId, formData);
            if (res.status === 201) {
                showAlert('success', 'Item Updated Successfully')
                console.log("ok");
                loadData();
                clearFormData();
            } else {
                showAlert('error', 'Item Updated Unsuccessfully')
                console.log("error")
            }
        }
    };


    return (
        <Fragment>
            <div className='container'>
                <div className='nav-bar'>
                    <ResponsiveAppBar />
                </div>
                <div className='content-bar'>
                    <div className='form-box'>
                        <div style={{ position: 'absolute', zIndex: '10' }}>
                            {alert && (
                                <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
                            )}
                            { }
                        </div>
                        <div className='form-box-body'>
                            <div className='body-left'>
                                <div id='item-photo' onClick={handlePhotoClick}>
                                    <input
                                        type="file"
                                        id="photo-input"
                                        onChange={handlePhotoChange}
                                        accept="image/*"
                                        style={{ display: 'none' }}
                                    />
                                    {photo && (<div className="image-container" style={{ position: "relative" }}>
                                        <img id='photoViewer' style={{ width: "100%", height: "220px" }} src={BASE_IMAGE_URL + photo} alt="Selected" />
                                        <Cancel className="cancel-icon" onClick={handleCancelImage} />
                                    </div>
                                    )}
                                </div>
                            </div>
                            <div className='body-right'>
                                <ValidatorForm className="form" onSubmit={handleSubmit}>
                                    <Grid style={{ padding: "30px", paddingTop: "40px", paddingBottom: "40px" }} container direction="row" spacing={{ xs: 2, md: 4 }} columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
                                        <Grid item lg={6} md={6} sm={12} xm={12}>
                                            <TextValidator
                                                label="Item Name"
                                                type="text"
                                                value={name}
                                                onChange={handleNameChange}
                                                validators={['required', 'isString']}
                                                errorMessages={['Name is required', 'Invalid name']}
                                                className='input'
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xm={12}>
                                            <TextValidator
                                                label="Description"
                                                type="text"
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                validators={['required']}
                                                errorMessages={['Description is required']}
                                                className='input'
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xm={12}>
                                            <TextValidator
                                                label="Quantity"
                                                type="text"
                                                value={qty}
                                                onChange={handleQtyChange}
                                                validators={['required']}
                                                errorMessages={['Quantity is required']}
                                                className='input'
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xm={12}>
                                            <TextValidator
                                                label="Price"
                                                type="text"
                                                value={price}
                                                onChange={handlePriceChange}
                                                validators={['required']}
                                                errorMessages={['Price is required']}
                                                className='input'
                                                variant="outlined"
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xm={12}>
                                        </Grid>
                                        <Grid item lg={6} md={6} sm={12} xm={12}>
                                            <Stack style={{ marginTop: "5px" }} direction="row" spacing={2} >
                                                <Button
                                                    onClick={() => { clearFormData() }}
                                                    variant="contained"
                                                    color="error"
                                                    className='button'
                                                    fullWidth
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    variant="contained"
                                                    color={btnColor}
                                                    className='button'
                                                    fullWidth
                                                >
                                                    {btnLabel}
                                                </Button>
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </ValidatorForm>
                            </div>
                        </div>
                    </div>

                    <div className='table-box'>
                        <Grid container style={{ height: '100%', width: '100%', padding: '15px' }}>
                            <TableContainer component={Paper} sx={{ maxHeight: '100%' }}>
                                <Table sx={{ minWidth: 650 }} aria-label="item table">
                                    <TableHead>
                                        <TableRow style={{ backgroundImage: 'linear-gradient(to right top, #777277, #766e7a, #736a7e, #6c6783, #626589)' }}>
                                            <TableCell align="left" style={{ color: 'white', borderRight: '1px solid rgb(229, 229, 229)' }}> Name</TableCell>
                                            <TableCell align="left" style={{ color: 'white', borderRight: '1px solid rgb(229, 229, 229)' }}> Description</TableCell>
                                            <TableCell align="left" style={{ color: 'white', borderRight: '1px solid rgb(229, 229, 229)' }}> Image</TableCell>
                                            <TableCell align="left" style={{ color: 'white', borderRight: '1px solid rgb(229, 229, 229)' }}> Quantity</TableCell>
                                            <TableCell align="left" style={{ color: 'white', borderRight: '1px solid rgb(229, 229, 229)' }}> Price</TableCell>
                                            <TableCell align="left" style={{ color: 'white' }}>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            dataArray.map((row, index) => (
                                                <TableRow key={row.name} style={{ backgroundColor: index % 2 === 0 ? '#f2f2f2' : 'white' }}>
                                                    <TableCell align="left" style={{ borderRight: '1px solid #ddd' }}>{row.name}</TableCell>
                                                    <TableCell align="left" style={{ borderRight: '1px solid #ddd' }}>{row.description}</TableCell>
                                                    <TableCell align="left" style={{ borderRight: '1px solid #ddd' }}>
                                                        <div>
                                                            <img
                                                                style={{ width: "50px", height: "50px" }}
                                                                src={BASE_IMAGE_URL + row.photo}
                                                                alt={row.photo}
                                                                onError={(e) => {
                                                                    console.log("Image failed to load:", e.target.src);
                                                                }}
                                                            />
                                                        </div>
                                                    </TableCell>
                                                    <TableCell align="left" style={{ borderRight: '1px solid #ddd' }}>{row.qty}</TableCell>
                                                    <TableCell align="left" style={{ borderRight: '1px solid #ddd' }}>{row.price}</TableCell>
                                                    <TableCell align="left">
                                                        <Tooltip title="Edit">
                                                            <IconButton
                                                                onClick={() => {
                                                                    updateItem(row);
                                                                }}
                                                            >
                                                                <EditIcon color="primary" />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton
                                                                onClick={() => {
                                                                    deleteItem(row.id)
                                                                }}
                                                            >
                                                                <DeleteIcon color="error" />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </div>

                </div>
            </div>
        </Fragment>
    )
}

export default Item