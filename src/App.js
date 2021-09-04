import './App.css';
import { useState,useEffect } from 'react';
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


  const [cols,setColumns] = useState(columns)
  const [rows, setRows] = useState([])


  useEffect(() => {
    getPlants()
  }, [])

  const getPlants= async () =>{
       await fetch('https://localhost:44399/api/plant',{    //in sync ops, get datas from mysql and use postPlants.
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      }).then(async res =>await res.json())
      .then( resultJson => {
        setRows(resultJson)
      })
    }

    

  // const postPlants=(response) =>{
  //   var plants = []
  //   response.map((item)=>{
  //     const plant ={
  //       plantId:item.id,
  //       name:item.name,
  //       eic:item.eic,
  //       organizationETSOCode:item.organizationETSOCode
  //     }
  //     plants.push(plant)
  //   })

  //   //console.log(plants)
  //   fetch('https://localhost:44399/api/plant',{
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     body:JSON.stringify(plants)
  //   }).then(res =>res.json())
  //   .then(resultJson => console.log(resultJson))


  //   // console.log(rows)
  // }
  

  return (
    <div className="App">
      <Route exact path="/" component={() => <PlantTable rows={rows} columns={cols} />} />
      <Route exact path="/PlantDetail/:plantId" component={() => <PlantDetail />} />
      <Route exact path="/Edit/:orderId" component={() => <EditOrder />} />
      <Route exact path="/Add/:plantId" component={() => <AddOrder />} />
      <Route exact path="/AddDefaultProduct" component={() => <AddDefaultProduct />} />
      <Route exact path="/Login" component={() => <Login />} />
    </div>
  );
}

export default App;
