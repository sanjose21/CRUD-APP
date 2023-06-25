import { useEffect, useState } from 'react';
import { TextField, Button, Grid, Box, Dialog, DialogTitle, DialogContent } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSome } from '../utilities/MainContextProvider';

export function ItemForm({ item, editMode }) {
  const location = useLocation();
  const { isLoggedIn, currentUser } = useSome();
  const navigate = useNavigate();

  const [userError, setUserError] = useState(false);
  const [userExist, setUserExist] = useState('');
  const [open, setOpen] = useState(false); // State for the modal

  const form = useForm();
  const { register, handleSubmit } = form;
  register('');

  const headers = {
    'Content-Type': 'application/json',
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleData = (data) => {
    // Form validation
    if (Object.values(data).some((value) => !value)) {
      setUserError(true);
      setUserExist('All fields are required');
    } else {
      data.user_id = currentUser.id;
      if (location.pathname.includes('/item')) {
        axios
          .patch(`http://localhost:3000/api/v1/item/${item.id}`, JSON.stringify(data), {
            headers,
          })
          .then(() => {
            navigate('/adminInventory');
            handleClose();
          })
          .catch((err) => {
            setUserError(true);
            console.log(err.response.data);
            console.log(userError);
            setUserExist(err.response.data);
          });
      } else {
        axios
          .post('http://localhost:3000/api/v1/createitem', JSON.stringify(data), {
            headers,
          })
          .then(() => {
            navigate('/adminInventory');
            handleClose(); // Close the modal after submitting
          })
          .catch((err) => {
            setUserError(true);
            console.log(err.response.data);
            console.log(userError);
            setUserExist(err.response.data);
          });
      }
    }
  };

  useEffect(() => {
    if (location.pathname.includes('/createitem')) {
      handleOpen();
    }
  }, [location.pathname]);

  if (userError) {
    return (
      <Alert severity='error'>
        {`${userExist} `}
        <Button color='secondary' onClick={() => setUserError(false)}>
          Please Retry
        </Button>
      </Alert>
    );
  }

  return (
    <>
      {isLoggedIn && (editMode || location.pathname.includes('/createitem')) && (
        <Button variant='contained' color='primary' onClick={handleOpen}>
          Add Item
        </Button>
      )}

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(handleData)}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextField
                    label='Item Name'
                    variant='outlined'
                    id='item_name'
                    {...register('item_name')}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextField
                    label='Description'
                    variant='outlined'
                    id='description'
                    {...register('description')}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box mb={2}>
                  <TextField
                    label='Quantity'
                    variant='outlined'
                    type='number'
                    id='quantity'
                    {...register('quantity')}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Button variant='contained' color='primary' type='submit'>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
