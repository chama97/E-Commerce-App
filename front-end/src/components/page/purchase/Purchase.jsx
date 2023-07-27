import React, { Fragment, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import ResponsiveAppBar from '../../nav/Navbar';
import { useParams } from 'react-router-dom';
import PurchaseService from '../../../service/PurchaseService';
import TextField from '@mui/material/TextField';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import jwt_decode from "jwt-decode";
import Alert from '../../alert/Alert';
import "./style.scss";

const BASE_IMAGE_URL = 'http://localhost:3001/uploads/';

const Purchase = () => {

    const [item, setItem] = useState({});
    const [itemId, setItemId] = useState('');
    const [userId, setUserId] = useState('');
    const [qty, setQty] = useState(0);
    const [total, setTotal] = useState(item.price);
    const [method, setMethod] = useState('');
    const [methodLabel, setMethodLabel] = useState('Enter your Address');
    const [paymentMethod, setPaymentMethod] = useState('Cash on delivery');
    const [alert, setAlert] = useState(null);

    const { id } = useParams();

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => {
            setAlert(null);
        }, 3000);
    };

    const handleCloseAlert = () => {
        setAlert(null);
    };

    const handleQtyChange = (event) => {
        setQty(event.target.value);
    };
    const handlePaymentMethodChange = (event) => {
        setPaymentMethod(event.target.value);
        if (event.target.value === "Cash on delivery") {
            setMethodLabel('Enter your Address');
        } else {
            setMethodLabel('Enter your Card Number');
        }
    };

    const handleMethodChange = (event) => {
        setMethod(event.target.value);
    };

    const loadItemsData = async () => {
        let res = await PurchaseService.fetchItems(id);
        if (res.status === 200) {
            setItem(res.data.data);
            setItemId(res.data.data.id);
        } else {
            console.log("fetching error: " + res)
        }
    };

    const decodeToken = () => {
        const token = localStorage.getItem('token');
        console.log(token);
        if (token) {
            try {
                const decodedToken = jwt_decode(token);
                console.log(decodedToken)

                if (decodedToken) {
                    setUserId(decodedToken.id);
                    console.log("Decoded userId: " + decodedToken.id);
                } else {
                    console.log("Invalid token");
                }
            } catch (error) {
                console.log("Error decoding token:", error);
            }
        } else {
            console.log("No token found in localStorage");
        }
    }


    const handleSubmit = async () => {
        const data = {
            customerId: userId,
            itemId: itemId,
            qty: qty,
            price: total,
            method: method
        }
        console.table(data);
        
        const res = await PurchaseService.postOrder(data);
        if (res.status === 201) {
            showAlert('success', 'Order Placed Successfully')
            console.log("ok");
        } else {
            showAlert('error', 'Order Placed Unsuccessfull')
            console.log("error")
        }
    };

    useEffect(() => {
        loadItemsData();
        decodeToken();
    }, []);


    useEffect(() => {
        setQty(1);
        setTotal(item.price * qty);
    }, [item, qty]);


    return (
        <Fragment>
            <div className='purch-container'>
                <div className='nav-bar'>
                    <ResponsiveAppBar />
                </div>
                <div className='purch-content'>
                    <div className='content-div'>
                        <div className='left-side'>
                            <div style={{ marginLeft: '40px', marginTop: '30px' }}>
                                <img style={{ width: '100%', height: '500px' }} src={BASE_IMAGE_URL + item.photo} alt="" />
                            </div>
                        </div>
                        <div className='right-side'>
                            <div style={{ position: 'absolute', zIndex: '10' }}>
                                {alert && (
                                    <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />
                                )}
                                { }
                            </div>
                            <div style={{ display: 'flex', gap: '25px', flexDirection: 'column', marginRight: '60px' }}>
                                <div>
                                    <span style={{ fontSize: '26px', fontWeight: 'bold' }}>{item.name}</span>
                                </div>

                                <div>
                                    <span style={{ color: 'gray' }}>{item.description}</span>
                                </div>

                                <div>
                                    <span style={{ fontSize: '27px', fontWeight: 'bold' }}>RS : {item.price}</span>
                                </div>

                                <div>
                                    <TextField
                                        id="outlined-basic"
                                        label="Qty" autoFocus
                                        value={qty}
                                        onChange={handleQtyChange}
                                        fullWidth
                                        variant="outlined" />
                                </div>

                                <div>
                                    <TextField
                                        id="outlined-basic"
                                        disabled
                                        label="Toptal Price"
                                        value={total}
                                        fullWidth variant="outlined"
                                        InputProps={{
                                            style: {
                                                fontSize: 20,
                                                color: 'blue',
                                            },
                                        }}
                                    />
                                </div>

                                <div className='payment-box'>
                                    <div>
                                        <span style={{ fontSize: '20px', fontWeight: 'bold' }}>Payment Method:</span>
                                    </div>
                                    <div>
                                        <RadioGroup
                                            style={{ display: 'flex', flexDirection: 'row' }}
                                            aria-label="payment-method"
                                            name="payment-method"
                                            value={paymentMethod}
                                            onChange={handlePaymentMethodChange}
                                        >
                                            <FormControlLabel
                                                value="Cash on delivery"
                                                control={<Radio />}
                                                label="Cash on delivery"
                                            />
                                            <FormControlLabel
                                                value="ATM Card"
                                                control={<Radio />}
                                                label="Credit/Debit Card"
                                            />
                                        </RadioGroup>
                                    </div>
                                    <div>
                                        <TextField
                                            id="outlined-basic"
                                            label={methodLabel}
                                            value={method}
                                            onChange={handleMethodChange}
                                            fullWidth variant="outlined"
                                        />
                                    </div>

                                    <div style={{ marginTop: '10px' }}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            aria-label="Purchase"
                                            sx={{
                                                border: '1px solid rgb(90, 161, 248)',
                                            }}
                                            onClick={() => {
                                                handleSubmit();
                                            }}
                                        >
                                            Purchase
                                        </Button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Purchase