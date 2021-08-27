import React from 'react';
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



const datas = [
    { name: 'India', lastname: 'IN', id: 1324171354, number: 3287263 },
    { name: 'China', lastname: 'CN', id: 1403500365, number: 9596961 },
    { name: 'India', lastname: 'IN', id: 1324171354, number: 3287263 },
    { name: 'China', lastname: 'CN', id: 1403500365, number: 9596961 },
    { name: 'India', lastname: 'IN', id: 1324171354, number: 3287263 },
    { name: 'China', lastname: 'CN', id: 1403500365, number: 9596961 },
    { name: 'India', lastname: 'IN', id: 1324171354, number: 3287263 },
    { name: 'China', lastname: 'CN', id: 1403500365, number: 9596961 },
    { name: 'India', lastname: 'IN', id: 1324171354, number: 3287263 },
    { name: 'China', lastname: 'CN', id: 1403500365, number: 9596961 },
    { name: 'India', lastname: 'IN', id: 1324171354, number: 3287263 },
    { name: 'China', lastname: 'CN', id: 1403500365, number: 9596961 },
    { name: 'India', lastname: 'IN', id: 1324171354, number: 3287263 },
    { name: 'China', lastname: 'CN', id: 1403500365, number: 9596961 },
    { name: 'India', lastname: 'IN', id: 1324171354, number: 3287263 },
    { name: 'China', lastname: 'CN', id: 1403500365, number: 9596961 },
    { name: 'India', lastname: 'IN', id: 1324171354, number: 3287263 },
    { name: 'China', lastname: 'CN', id: 1403500365, number: 9596961 },

];

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

export default function PlantDetail() {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        console.log('rendered')
    }, [])

    return (

        <Grid item xs={9} style={{ marginLeft: '170px' }}>
            <h1>STOCK TRACK</h1>
            <Card className={classes.root} style={{backgroundColor:'#D7D7D7'}}>
                <CardActionArea>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Pamuk HES
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            TEST TEST TEST TEST TESTTESTTESTTESTTEST TEST TEST TEST TEST
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <h2>Products of PAMUK HES</h2>
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
                                {datas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={data.code}>
                                            <TableCell>{data.name}</TableCell>
                                            <TableCell>{data.lastname}</TableCell>
                                            <TableCell>{data.id}</TableCell>
                                            <TableCell>{data.number}</TableCell>
                                            <TableCell>on Road</TableCell>
                                            <TableCell><Button href={`/Edit/${data.id}`} style={{ backgroundColor: '#E7E41E' }}>EDIT</Button></TableCell>
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
                        count={datas.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </div>
                <Button href="/Add" style={{backgroundColor:'#4BD025',width:'150px',height:'50px'}}>Add New Product to Plant</Button>
            </Paper>
        </Grid>

    );
}