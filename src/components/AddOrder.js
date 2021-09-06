import React from 'react';
import BreadCrumbs from './BreadCrumbs';
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControlLabel, Checkbox, Paper, Button } from '@material-ui/core'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router';
import { Redirect } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NavBar from './NavBar'
import ErrorPage from './ErrorPage';

const AddOrder = (props) => {

    var productId, unitPrice, deliveryCompany, deliveryState, deliveryDate, newOrder = {}

    const param = useParams()
    const plantId = param.plantId
    const [products, setProducts] = useState([])
    const [redirect, setRedirect] = useState(false)
    const [isAuthorized,setIsAuthorized] = useState(false)

    const usebreadCrumbStyles = makeStyles((theme) => ({
        link: {
          display: 'flex',
        },
        icon: {
          marginRight: theme.spacing(0.5),
          width: 20,
          height: 20,
        },
      }));
      const breadCrumbclasses = usebreadCrumbStyles();

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

    const handleSubmit = async (event) => {
        event.preventDefault()
        await postRequest(newOrder)
    }


    const getRequest = async (apiRoute, id) => {
        const baseUrl = 'http://localhost:60925/api/'
        const URL = baseUrl + apiRoute + id
        const result = await fetch(URL, {
            method: 'GET',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())

        return result
    }

    const postRequest = async (Order) => {
        // console.log(Order)
        const URL = 'http://localhost:60925/api/order'
        await fetch(URL, {
            method: 'POST',
            credentials:'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Order)
        }).then(res => res.json())
            .then(setTimeout(async () => {
                await setRedirect(true)
            }, 600))
            .then(toast.success("New Order has been Added Successfully !", { position: toast.POSITION.TOP_RIGHT }))
    }

    useEffect(async () => {

        if (props.user.name === undefined) {
            setIsAuthorized(false)
        } else {
            setIsAuthorized(true)
            setProducts(await getRequest("product", ""))
        }

    }, [])

    if (!isAuthorized) { return <ErrorPage user={props.user} /> }
    if (redirect) { return <Redirect to={`/PlantDetail/${plantId}`} /> }
    return (
        <div>
            <NavBar user = {props.user}/>
            <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '25px' }}>
                <Link color="inherit" href="/Plants"className={breadCrumbclasses.link}>
                    <HomeIcon className={breadCrumbclasses.icon} />
                    Home
                </Link>
                <Link color="inherit" href={`/PlantDetail/${plantId}`} className={breadCrumbclasses.link}>
                    <ListIcon className={breadCrumbclasses.icon} />
                    Plant Detail
                </Link>
                <Typography color="textPrimary" className={breadCrumbclasses.link}>
                    <AddCircleIcon className={breadCrumbclasses.icon} />
                    Add Order
                </Typography>
            </Breadcrumbs>
            <Grid item xs={9} style={{ marginLeft: '170px' }}>
                <h1>STOCK TRACK</h1>
                <Paper elevation={10} style={{ padding: 20, height: 'auto', width: 'auto' }} >
                    <div style={{ height: 600, width: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Add New Order
                        </Typography>
                        <br></br>
                        <form onSubmit={e => handleSubmit(e)}>
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
                                            InputLabelProps={{shrink:true}}
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
        </div>


    );
}

export default AddOrder