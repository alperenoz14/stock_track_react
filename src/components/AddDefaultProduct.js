import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControlLabel, Checkbox, Paper, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import NavBar from './NavBar'
import ErrorPage from './ErrorPage';


export default function AddDefaultProduct(props) {

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
    const [redirect, setRedirect] = useState(false)
    const [newProductName, setnewProductName] = useState('')
    const [isAuthorized, setIsAuthorized] = useState(false)

    const handleChange = async (e) => {
        e.preventDefault()
        setnewProductName(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const product = { Name: newProductName }
        await postRequest(product)
    }

    useEffect(async () => {

        if (props.user.name === undefined) {
            console.log(props)
            setIsAuthorized(false)
        } else {
            setIsAuthorized(true)
        }

    }, [])

    const postRequest = async (newProduct) => {

        const URL = 'http://localhost:60925/api/product'
        await fetch(URL, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        }).then(res => res.json())
            .then(setRedirect(true))
            .then(toast.success("New Product product has beed added Successfully !", { position: toast.POSITION.TOP_RIGHT }))
    }

    if (!isAuthorized) { return <ErrorPage user={props.user} /> }
    if (redirect) { return <Redirect to={`/`} /> }
    return (
        <div>
            <NavBar user={props.user} />
            <Breadcrumbs aria-label="breadcrumb" style={{ marginTop: '25px' }}>
                <Link color="inherit" href="/Plants" className={breadCrumbclasses.link}>
                    <HomeIcon className={breadCrumbclasses.icon} />
                    Home
                </Link>
                <Typography color="textPrimary" className={breadCrumbclasses.link}>
                    <AddCircleIcon className={breadCrumbclasses.icon} />
                    Add New Dafault Product
                </Typography>
            </Breadcrumbs>
            <Grid item xs={9} style={{ marginLeft: '170px' }}>
                <h1>STOCK TRACK</h1>
                <Paper elevation={10} style={{ padding: 20, height: 'auto', width: 'auto' }} >
                    <div style={{ height: 300, width: '100%' }}>
                        <Typography variant="h6" gutterBottom>
                            Add New Default Product
                        </Typography>
                        <br></br>
                        <form onSubmit={e => handleSubmit(e)}>
                            <div style={{ marginLeft: '350px' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={7}>
                                        <TextField
                                            required
                                            onChange={e => handleChange(e)}
                                            id="productName"
                                            name="Product Name"
                                            label="Product Name"
                                            fullWidth
                                            autoComplete=""
                                            variant='filled'
                                        />
                                    </Grid>
                                </Grid>
                                <br></br>
                                <br></br>
                                <Grid container spacing={3}>
                                    <Grid xs={5} style={{ marginLeft: '50px' }}>
                                        <Button type='submit' style={{ backgroundColor: '#C1F10B', height: '65px' }} >SAVE NEW PRODUCT</Button>
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                    </div>
                </Paper>
            </Grid >
        </div>

    )
}
