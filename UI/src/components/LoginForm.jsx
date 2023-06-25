/* eslint-disable import/no-extraneous-dependencies */
import { TextField, Button, Grid, Box, Dialog, DialogTitle, DialogContent, FormControlLabel, Checkbox } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useSome } from '../utilities/MainContextProvider';

export function LoginForm() {
  const navigate = useNavigate();

  const { isLoggedIn, setIsLoggedIn, setCurrentUser } = useSome();

  const [userError, setUserError] = useState(false);
  const [userExist, setUserExist] = useState('');
  const [isVisitor, setIsVisitor] = useState(false);
  const form = useForm();
  const { register, handleSubmit } = form;
  register('');

  const handleData = (data) => {
    if (Object.values(data).every((value) => value !== '')) {
      axios
        .get(`http://localhost:3000/api/v1/user/${data.username}`)
        .then((res) => res.data)
        .then((user) => {
          if (data.password !== user.password) {
            throw new Error('Passwords do not match');
          }
          setCurrentUser(user);
          setIsLoggedIn(true);
          navigate('/adminInventory');
        })
        .catch((err) => {
          if (err.response?.status === 400) {
            setUserError(true);
            setUserExist(err.response.data);
          } else {
            setUserError(true);
            setUserExist(err.message);
          }
        });
    } else {
      setUserError(true);
      setUserExist('All fields are required');
    }
  };

  const handleVisitor = () => {
    setIsVisitor(!isVisitor);
  };

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

  if (!isLoggedIn && !isVisitor) {
    return (
      <Dialog open={!isLoggedIn && !isVisitor}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box mb={2}>
                <form onSubmit={handleSubmit(handleData)}>
                  <TextField
                    label='Username'
                    variant='outlined'
                    id='username'
                    {...register('username')}
                  />
                  <TextField
                    label='Password'
                    type='password'
                    variant='outlined'
                    id='password'
                    {...register('password')}
                  />
                  <Button variant='contained' color='primary' type='submit'>
                    Login
                  </Button>
                </form>
                <FormControlLabel
                  control={<Checkbox onChange={handleVisitor} />}
                  label='Just visiting'
                />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    );
  }
  return null;
}
