import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControlLabel, Checkbox, Paper, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditOrder = () => {

    toast.configure()

    const [products, setProducts] = useState([])
    const [currentOrder, setCurrentOrder] = useState({})
    const [redirect, setRedirect] = useState(false)

    const param = useParams()
    const orderId = param.orderId
    console.log(orderId)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        // const updatedOrder = currentOrder
        // delete updatedOrder.productName
        await putRequest(currentOrder)
    }

    const getCurrentOrder = async () => {
        const order = await getRequest(`order/`, orderId)
        const products = await getRequest(`product`, "")
        setProducts(products)
        products.map((product) => {
            if (product.id == order.productId) { setCurrentOrder({ ...order, productName: product.name }) }
        })
    }


    const getRequest = async (apiRoute, id) => {
        const baseUrl = 'https://localhost:44399/api/'
        const URL = baseUrl + apiRoute + id
        const result = await fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

        return result
    }

    const putRequest = async (updatedOrder) => {
        //console.log(updatedOrder)
        const URL = 'https://localhost:44399/api/order'
        await fetch(URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(updatedOrder)
        }).then(res => res.json())
        .then(setRedirect(true))
        .then(toast.success("The Order Updated Successfully !",{position: toast.POSITION.TOP_RIGHT}))
    }

    useEffect(async () => {
        await getCurrentOrder()
    }, [])
    

    if (redirect) {return <Redirect to={`/PlantDetail/${currentOrder.plantId}`}/>}
    return (
        <Grid item xs={9} style={{ marginLeft: '170px' }}>
            <h1>STOCK TRACK</h1>
            <Paper elevation={10} style={{ padding: 20, height: 'auto', width: 'auto' }} >
                <div style={{ height: 600, width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        Edit Order Informations
                    </Typography>
                    <br></br>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div style={{ marginLeft: '350px' }}>
                            <Grid container spacing={3}>
                                <Grid id item xs={7}>
                                    <Autocomplete
                                        required
                                        id="combo-box-demo"
                                        options={products}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(e, value) => setCurrentOrder({ ...currentOrder, productId: value.id })}
                                        defaultValue={{ id: currentOrder.productId, name: currentOrder.productName }}     //current product Name
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label={`${currentOrder.productName}`} variant="outlined" />}
                                    />
                                </Grid>
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <TextField
                                        required
                                        value={currentOrder.unitPrice}
                                        inputProps={
                                            { contentEditable: 'true' }
                                        }
                                        onChange={e => setCurrentOrder({ ...currentOrder, unitPrice: e.target.value })}
                                        id="unitPrice"
                                        name="Unit Price"
                                        label="Unit Price"
                                        fullWidth
                                        autoComplete=""
                                        variant='filled'
                                    />
                                </Grid>
                            </Grid>

                            <br></br>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <TextField
                                        required
                                        value={currentOrder.deliveryCompany}
                                        onChange={e => setCurrentOrder({ ...currentOrder, deliveryCompany: e.target.value })}
                                        id="deliveryCompany"
                                        name="Delivery Company"
                                        label="Delivery Company"
                                        fullWidth
                                        autoComplete=""
                                        variant='filled'
                                    />
                                </Grid>
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <TextField
                                        required
                                        value={currentOrder.deliveryState}
                                        onChange={e => setCurrentOrder({ ...currentOrder, deliveryState: e.target.value })}
                                        id="deliveryState"
                                        name="Delivery State"
                                        label="Delivery State"
                                        fullWidth
                                        autoComplete=""
                                        variant='filled'
                                    />
                                </Grid>
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <TextField
                                        value={currentOrder.deliveryDate}
                                        onChange={e => setCurrentOrder({ ...currentOrder, deliveryDate: e.target.value })}
                                        id="deliverydate"
                                        name="deliverydate"
                                        label="Delivery Date"
                                        fullWidth
                                        type="date"
                                        variant='filled' />
                                </Grid>
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid xs={5} style={{ marginLeft: '50px' }}>
                                    <Button type='submit' style={{ backgroundColor: '#C1F10B', height: '65px' }} >SAVE CHANGES</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </div>
            </Paper>
        </Grid >


    );
}

export default EditOrder