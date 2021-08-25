import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, FormControlLabel, Checkbox, Paper, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function AddDefaultProduct() {
    return (
        <Grid item xs={9} style={{ marginLeft: '170px' }}>
            <h1>STOCK TRACK</h1>
            <Paper elevation={10} style={{ padding: 20, height: 'auto', width: 'auto' }} >
                <div style={{ height: 500, width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        Add New Default Product
                    </Typography>
                    <br></br>
                    <form>
                        <div style={{ marginLeft: '350px' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={7}>
                                    <TextField
                                        required
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
                                <Grid item xs={7}>
                                    <TextField
                                        required
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
                                <Grid xs={5} style={{ marginLeft: '50px' }}>
                                    <Button style={{ backgroundColor: '#C1F10B', height: '65px' }} >SAVE NEW PRODUCT</Button>
                                </Grid>
                            </Grid>
                        </div>
                    </form>
                </div>
            </Paper>
        </Grid >
    )
}
