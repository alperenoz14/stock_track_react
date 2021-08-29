import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Button, Grid } from '@material-ui/core'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles({
    root: { width: '100%', }, container: { maxHeight: 440, },
});

export default function PlantDetail() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const [plant, setPlant] = useState({})
    const [orders, setOrders] = useState([])

    const handleChangePage = (event, newPage) => { setPage(newPage); };
    const handleChangeRowsPerPage = (event) => { setRowsPerPage(+event.target.value); setPage(0); };

    const param = useParams()

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

    const configureOrders = async () => {
        var resultOrders = []
        const products = await getRequest("product", "")
        var orders = await getRequest("order/getOrdersByPlantId/", param.plantId)

        orders.map((order) => {
            products.map((product) => {
                if (product.id == order.productId) {
                    const newOrder = { ...order, productName: product.name }
                    resultOrders.push(newOrder)
                }
            })
        })
        return resultOrders
    }


    useEffect(async () => {
        setPlant(await getRequest("plant/", param.plantId))
        setOrders(await configureOrders())
    }, [])

    return (
        <Grid item xs={9} style={{ marginLeft: '170px' }}>
            <h1>STOCK TRACK</h1>
            <Card className={classes.root} style={{ backgroundColor: '#D7D7D7' }}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {plant.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            <b>Plant ID:</b> {plant.plantId}    /   <b>Plant EIC:</b> {plant.eic}   /    <b>Plant Organization ETSO Code:</b> {plant.organizationETSOCode}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <h2>Orders of {plant.name}</h2>
            <Paper elevation={10} style={{ padding: 20, height: 'auto', width: 'auto' }} >
                <div style={{ height: 500, width: '100%' }}>
                    <TableContainer className={classes.container}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product Name</TableCell>
                                    <TableCell>Unit Price</TableCell>
                                    <TableCell>Delivery Date</TableCell>
                                    <TableCell>Delivery Company</TableCell>
                                    <TableCell>Delivery State</TableCell>
                                    <TableCell>EDIT</TableCell>
                                    <TableCell>DELETE</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={order.id}>
                                            <TableCell>{order.productName}</TableCell>
                                            <TableCell>{order.unitPrice} ₺</TableCell>
                                            <TableCell>{order.deliveryDate}</TableCell>
                                            <TableCell>{order.deliveryCompany}</TableCell>
                                            <TableCell>{order.deliveryState}</TableCell>
                                            <TableCell><Button href={`/Edit/${order.id}`} style={{ backgroundColor: '#E7E41E' }}>EDIT</Button></TableCell>
                                            <TableCell><Button style={{ backgroundColor: '#F1320B' }}>DELETE</Button></TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={orders.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                <Button href={`/Add/${param.plantId}`} style={{ backgroundColor: '#4BD025', width: '150px', height: '50px' }}>Add New Order to Plant</Button>
            </Paper>
        </Grid>

    );
}