import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false)

  const handleClick = async () =>{
    
    const URL = 'http://localhost:60925/api/user/logout'
    await fetch(URL,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      credentials:'include'
    }).then(await setRedirect(true))
    

  }

  if (redirect) { return <Redirect to={`/`} /> }
  return (
    <div className={classes.root} style={{backgroundColor : 'green'}}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Welcome {props.user.name}
          </Typography>
          <Button onClick={handleClick} style={{backgroundColor: 'black'}} color="inherit">LogOut</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}