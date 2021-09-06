import React, { useState, useEffect } from 'react'
import { Grid, Paper, Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid'
import NavBar from './NavBar'
import ErrorPage from './ErrorPage';


const PlantTable = (props) => {

    const [rows, setRows] = useState([])
    const [isAuthorized, setIsAuthorized] = useState(false)

    useEffect(() => {
        if (props.user.name === undefined) {
            setIsAuthorized(false)
        } else {
            setIsAuthorized(true)
            getPlants()
        }
    }, [])


    const getPlants = async () => {
        await fetch('http://localhost:60925/api/plant', {    //in sync ops, get datas from mysql and use postPlants.
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async res => await res.json())
            .then(resultJson => {
                setRows(resultJson)
            })
    }


    if (!isAuthorized) { return <ErrorPage user={props.user} /> }
    return (
        <div>
            <NavBar user={props.user} />
            <Grid fixed container spacing={3}>
                <Grid item xs={9} style={{ marginLeft: '170px' }}>
                    <div>
                        <h1>STOCK TRACK</h1>
                        <Button href='/AddDefaultProduct' style={{ backgroundColor: '#4772D9', height: '40px' }}>Add new product</Button>
                    </div>
                    <br></br>
                    <Paper elevation={10} style={{ padding: 20, height: 'auto', width: 'auto' }} >
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
                                rows={rows}
                                columns={props.columns}
                                pageSize={5}
                                checkboxSelection
                                disableSelectionOnClick
                            />
                        </div>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}

export default PlantTable