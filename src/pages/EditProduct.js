import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControlLabel, Checkbox, Paper, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router';
import Autocomplete from '@material-ui/lab/Autocomplete';

const EditProduct = () => {

    const param = useParams()
    console.log(param)

   const handleInput = (e) =>{       
        console.log(e.target.textContent)
    }

    const top100Films = [
        { title: 'The Shawshank Redemption', year: 1994 },
        { title: 'The Godfather', year: 1972 },
        { title: 'The Godfather: Part II', year: 1974 },
        { title: 'The Dark Knight', year: 2008 },]

    return (
        <Grid item xs={9} style={{ marginLeft: '170px' }}>
            <h1>STOCK TRACK</h1>
            <Paper elevation={10} style={{ padding: 20, height: 'auto', width: 'auto' }} >
                <div style={{ height: 600, width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        Edit Product İnformations
                    </Typography>
                    <br></br>
                    <form>
                        <div style={{ marginLeft: '350px' }}>
                            <Grid container spacing={3}>
                                <Grid id item xs={7}>
                                    <Autocomplete
                                        required
                                        id="combo-box-demo"
                                        options={top100Films}
                                        getOptionLabel={(option) => option.title}
                                        onChange={e=> handleInput(e)}
                                        defaultValue={{title:'alperen', year:1999}}     //current product Name
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
                                        id="unitPrice"
                                        name="Unit Price"
                                        label="Unit Price"
                                        fullWidth
                                        autoComplete=""
                                        placeholder='1500.00'
                                        variant='filled'
                                    />
                                </Grid>
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <TextField
                                        id="deliverydate"
                                        name="deliverydate"
                                        label="Delivery Date"
                                        fullWidth
                                        placeholder='25.08.2021'
                                        variant='filled' />
                                </Grid>
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <TextField
                                        required
                                        id="deliveryCompany"
                                        name="Delivery Company"
                                        label="Delivery Company"
                                        fullWidth
                                        autoComplete=""
                                        placeholder='Test'
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
                                        id="deliveryState"
                                        name="Delivery State"
                                        label="Delivery State"
                                        fullWidth
                                        autoComplete=""
                                        placeholder='Test'
                                        variant='filled'
                                    />
                                </Grid>
                            </Grid>
                            <br></br>
                            <br></br>
                            <Grid container spacing={3}>
                                <Grid xs={5} style={{ marginLeft: '50px' }}>
                                    <Button style={{ backgroundColor: '#C1F10B', height: '65px' }} >SAVE CHANGES</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </div>
            </Paper>
        </Grid >


    );
}

export default EditProduct