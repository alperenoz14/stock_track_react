import './App.css';
import { useState,useEffect } from 'react';
import PlantTable from './components/PlantTable';
import PlantDetail from './pages/PlantDetail'
import EditProduct from './pages/EditProduct'
import AddProduct from './pages/AddProduct'
import AddDefaultProduct from './pages/AddDefaultProduct'
import { Button, FormControlLabel, IconButton } from "@material-ui/core";
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'


const App = () => {

  const columns = [
    { field: 'plantId', headerName: 'ID', width: 120 },
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

  const getPlants= () =>{
       fetch('https://localhost:44399/api/plant',{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      }).then(res => res.json())
      .then(resultJson => {
        setRows(resultJson)
      })
  }

  // const postPlants=(plants) =>{
  //   var resultData = []
  //   plants.map((plant)=>{
  //     const resultPlant ={
  //       plantId:plant.id,
  //       name:plant.name,
  //       eic:plant.eic,
  //       organizationETSOCode:plant.organizationETSOCode
  //     }
  //       resultData.push(resultPlant)
  //   })

    //console.log(resultData)
  //   fetch('https://localhost:44399/api/plant',{
  //     method:'POST',
  //     headers:{
  //       'Content-Type':'application/json'
  //     },
  //     body:JSON.stringify(resultData)
  //   }).then(res =>res.json())
  //   .then(resultJson => console.log(resultJson))


  //   // console.log(rows)
  // }
  

  return (
    <div className="App">
      <Route exact path="/" component={() => <PlantTable rows={rows} columns={cols} />} />
      <Route exact path="/PlantDetail/:id" component={() => <PlantDetail />} />
      <Route exact path="/Edit/:productId" component={() => <EditProduct />} />
      <Route exact path="/Add" component={() => <AddProduct />} />
      <Route exact path="/AddDefaultProduct" component={() => <AddDefaultProduct />} />
    </div>
  );
}

export default App;
