import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ConfirmDialog(props) {
    toast.configure()
  const [open, setOpen] = React.useState(false);
  const [redirect, setRedirect] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteRequest =async () => {
    
    props.deleteRequest(props.orderId)
    setOpen(false);
  };

  //if (redirect) {return <Redirect to={`/PlantDetail/${props.plantId}`}/>}
  return (
    <div>
      <Button variant="outlined" style={{backgroundColor:'#D5312B'}} onClick={handleClickOpen}>
        delete
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are your sure ?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          Are you sure about to remove this order ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={deleteRequest} color="primary" autoFocus>
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}