import './App.css';
import { useState, useEffect } from 'react';
import PlantTable from './components/PlantTable';
import PlantDetail from './components/PlantDetail'
import EditOrder from './components/EditOrder'
import AddOrder from './components/AddOrder'
import Login from './components/Login'
import AddDefaultProduct from './components/AddDefaultProduct'
import { Button, FormControlLabel, IconButton } from "@material-ui/core";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'

const App = () => {


  const columns = [
    { field: 'plantId', headerName: 'PlantId', width: 130 },
    { field: 'name', headerName: 'Plant Name', width: 230, },
    { field: 'eic', headerName: 'EIC', width: 170, },
    { field: 'organizationETSOCode', width: 200, headerName: 'Organization ETSO', },
    {
      field: 'plantDetail',
      headerName: 'Plant Detail',
      width: 200,
      editable: false,
      sortable: false,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        return (
          <div
            className="d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer", marginLeft: '25px' }}
          >
            {Detail(params.row.plantId)}
          </div>
        );
      }
    },
  ]

  const Detail = (index) => {
    return (
      <Button href={`/PlantDetail/${index}`} style={{ backgroundColor: 'lightgreen' }}>Plant Detail</Button>
    );
  };

  const [user, setUser] = useState({})
  // const [cols,setColumns] = useState(columns)
  // const [rows, setRows] = useState([])



  useEffect(() => {

    isAuthorized()

  }, [])

  const isAuthorized = async () => {
    console.log('in')
    const URL = 'http://localhost:60925/api/user'
    const user = await fetch(URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true'
      },
      credentials: 'include',
    }).then(res => res.json())

    setUser(user)
  }


  return (
    <div className="App">
      <Route exact path="/" component={() => <Login isAuthorized = {isAuthorized} />} />
      <Route exact path="/Plants" component={() => <PlantTable columns={columns} user = {user} isAuthorized ={isAuthorized} />} />
      <Route exact path="/PlantDetail/:plantId" component={() => <PlantDetail user = {user} isAuthorized ={isAuthorized} />} />
      <Route exact path="/Edit/:orderId" component={() => <EditOrder user = {user} isAuthorized ={isAuthorized} />} />
      <Route exact path="/Add/:plantId" component={() => <AddOrder user = {user} isAuthorized ={isAuthorized} />} />
      <Route exact path="/AddDefaultProduct" component={() => <AddDefaultProduct user = {user} isAuthorized ={isAuthorized} />} />
    </div>
  );
}

export default App;
