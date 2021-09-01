import React from 'react';
import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
}));



export default function IconBreadcrumbs() {
    
  const classes = useStyles();
  const [redirect,setRedirect] = useState(false)

  function handleClick(event) {
    event.preventDefault();
    setRedirect(true)
  }

  if (redirect) {return <Redirect to={`/`}/>}
  return (
    <Breadcrumbs aria-label="breadcrumb" style={{marginTop:'25px'}}>
      <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
        <HomeIcon className={classes.icon} />
        Home
      </Link>
      <Typography color="textPrimary" className={classes.link}>
        <GrainIcon className={classes.icon} />
        Add Order
      </Typography>
    </Breadcrumbs>
  );
}