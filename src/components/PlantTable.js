import React from 'react'
import { Grid, Paper } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid'


const PlantTable = (props) => {

    return (
        <div>
            <Grid fixed container spacing={3}>
                <Grid item xs={9} style={{ marginLeft: '170px' }}>
                    <h1>STOCK TRACK</h1>
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