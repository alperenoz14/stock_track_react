import React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControlLabel, Checkbox, Paper, Button } from '@material-ui/core'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';

const AddOrder = () => {

    var productId, unitPrice, deliveryCompany, deliveryState, deliveryDate, newOrder = {}

    const param = useParams()
    const plantId = param.plantId
    const [products, setProducts] = useState([])
    const [redirect, setRedirect] = useState(false)

    toast.configure()

    const handleInputs = async (type, value) => {       //bu metodu kaldırıp direkt onchange olduğunda değişkene atasam?
        switch (type) {
            case 'product': productId = value
                break;
            case 'unitPrice': unitPrice = value
                break;
            case 'deliveryCompany': deliveryCompany = value
                break;
            case 'deliveryState': deliveryState = value
                break;
            case 'deliveryDate': deliveryDate = value
                break;
            default:
                break;
        }
        newOrder = { plantId, productId, unitPrice, deliveryCompany, deliveryState, deliveryDate }
        console.log(newOrder)
    }

    const handleSubmit =async (event) => {
        event.preventDefault()
        await postRequest(newOrder)
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

    const postRequest = async (Order) => {
        // console.log(Order)
        const URL = 'https://localhost:44399/api/order'
        await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(Order)
        }).then(res => res.json())
        .then(setRedirect(true))
        .then(toast.success("New Order has been Added Successfully !",{position: toast.POSITION.TOP_RIGHT}))
        // .catch(toast.error("Add Order operation is failed  !",{position: toast.POSITION.TOP_RIGHT}))
    }

    useEffect(async () => {

        setProducts(await getRequest("product", ""))

    }, [])


    if (redirect) {return <Redirect to={`/PlantDetail/${plantId}`}/>}
    return (
        <Grid item xs={9} style={{ marginLeft: '170px' }}>
            <h1>STOCK TRACK</h1>
            <Paper elevation={10} style={{ padding: 20, height: 'auto', width: 'auto' }} >
                <div style={{ height: 600, width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        Add New Order
                    </Typography>
                    <br></br>
                    <form onSubmit={e=>handleSubmit(e)}>
                        <div style={{ marginLeft: '350px' }}>
                            <Grid container spacing={3}>
                                <Grid id item xs={7}>
                                    <Autocomplete
                                        required
                                        id="product"
                                        options={products}
                                        getOptionLabel={(option) => option.name}
                                        onChange={(e, value) => handleInputs('product', value.id)}
                                        style={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} required label="Select Product" variant="outlined" />}
                                    />
                                </Grid>
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <TextField
                                        required
                                        onChange={e => handleInputs(e.target.id, e.target.value)}
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
                                        onChange={e => handleInputs(e.target.id, e.target.value)}
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
                                        onChange={e => handleInputs(e.target.id, e.target.value)}
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
                                        onChange={e => handleInputs(e.target.id, e.target.value)}
                                        
                                        id="deliveryDate"
                                        //name="Delivery Date"
                                        label="Delivery Date"
                                        type="date"
                                        // defaultValue="2017-05-24"
                                        fullWidth
                                        //autoComplete=""
                                        variant='filled'
                                    />
                                </Grid>
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid xs={5} style={{ marginLeft: '50px' }}>
                                    <Button type='submit' style={{ backgroundColor: '#C1F10B', height: '65px' }} >SAVE NEW ORDER</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </div>
            </Paper>
        </Grid >


    );
}

export default AddOrder