import React from 'react'
import { Grid, Paper,Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid'


const PlantTable = (props) => {

    return (
        <div>
            <Grid fixed container spacing={3}>
                <Grid item xs={9} style={{ marginLeft: '170px' }}>
                    <div>
                    <h1>STOCK TRACK</h1>
                    <Button href='/AddDefaultProduct' style={{backgroundColor:'#4772D9',height:'40px'}}>Add new product</Button>
                    </div>
                    <br></br>
                    <Paper elevation={10} style={{ padding: 20, height: 'auto', width: 'auto' }} >
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
                                rows={props.rows}
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