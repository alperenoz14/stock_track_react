import React, { useState, useEffect } from 'react'
import { Grid, TextField, FormControlLabel, Checkbox, Paper, Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ErrorPage(props) {

    const [redirect,setRedirect] = useState(false)

    const handleClick = async () =>{
        setRedirect(true)
    }

    if (redirect) { return <Redirect to={`/`} /> }
    return (
        <Grid item xs={9} style={{ marginLeft: '170px' }}>
            <h1>{props.user.status} {props.user.title} Error</h1>
            <Paper elevation={10} style={{ padding: 20, height: 'auto', width: 'auto' }} >
                <div style={{ height: 300, width: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                        Oops... You need to login to see this page :(
                    </Typography>
                    <br></br>
                    <Button onClick={handleClick} style={{backgroundColor:'#36D14C'}}>Go To Login</Button>
                </div>
            </Paper>
        </Grid >
    )
}
