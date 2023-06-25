import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  TextField,
  Container,
  Typography,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

function Forms() {
  const navigate = useNavigate();
  const [userError, setUserError] = useState(false);
  const [userExist, setUserExist] = useState('');
  const form = useForm();
  const { register, handleSubmit } = form;

  const headers = {
    'Content-Type': 'application/json',
  };

  const handleData = (data) => {
    if (Object.values(data).some((value) => value !== '')) {
      axios
        .post(
          'http://localhost:3000/api/v1/createuser',
          JSON.stringify(data),
          {
            headers,
          }
        )
        .then(() => navigate('/login'))
        .catch((err) => {
          setUserError(true);
          setUserExist(err.response.data);
        });
    }
  };

  if (userError) {
    return (
      <Container maxWidth='sm'>
        <Alert severity='error'>
          {`${userExist} `}
          <Button color='secondary' onClick={() => setUserError(false)}>
            Please Retry
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' component='h1' gutterBottom>
        Create User
      </Typography>
      <form onSubmit={handleSubmit(handleData)}>
        <TextField
          label='First Name'
          fullWidth
          margin='normal'
          {...register('first_name')}
        />
        <TextField
          label='Last Name'
          fullWidth
          margin='normal'
          {...register('last_name')}
        />
        <TextField
          label='Username'
          fullWidth
          margin='normal'
          {...register('username')}
        />
        <TextField
          label='Password'
          fullWidth
          margin='normal'
          type='password'
          {...register('password')}
        />
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default Forms;
