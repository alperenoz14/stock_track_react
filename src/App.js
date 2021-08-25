import './App.css';
import PlantTable from './components/PlantTable';
import PlantDetail from './pages/PlantDetail'
import EditProduct from './pages/EditProduct'
import AddProduct from './pages/AddProduct'
import AddDefaultProduct from './pages/AddDefaultProduct'
import { Button, FormControlLabel, IconButton } from "@material-ui/core";
import {BrowserRouter as Router,Link, Route} from 'react-router-dom'

const columns = [
  { field: 'id', headerName: 'ID', width: 120 },
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
          {Detail(params.row.id)}
        </div>
      );
    }
  },
]

const rows = [
  {
    id:'123',
    name:'test',
    eic:'xxx',
    organizationETSOCode:'132145'
  },
  {
    id:'222',
    name:'asd',
    eic:'sddfg',
    organizationETSOCode:'8654'
  },
  {
    id:'123',
    name:'test',
    eic:'xxx',
    organizationETSOCode:'132145'
  }
]

const Detail = (index) => {
  const handleEditClick = () => {
    this.setState({ index })
  };

  return (

  <Button href={`/PlantDetail/${index}`} style={{backgroundColor:'lightgreen'}}>Plant Detail</Button>


  );
};

const App = () => {
  return (
    <div className="App">
      <Route exact path="/" component={() => <PlantTable rows = {rows} columns = {columns}/>}/>
      <Route exact path="/PlantDetail/:id" component={() => <PlantDetail/>}/>
      <Route exact path="/Edit/:productId" component={() => <EditProduct/>}/>
      <Route exact path="/Add" component={() => <AddProduct/>}/>
      <Route exact path="/AddDefaultProduct" component={() => <AddDefaultProduct/>}/>
    </div>
  );
}

export default App;
