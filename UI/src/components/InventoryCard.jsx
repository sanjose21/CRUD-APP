/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import { useState } from 'react';
import { Alert, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useLocation, useNavigate } from 'react-router-dom';

import { useSome } from '../utilities/MainContextProvider';
import { ItemForm } from './ItemForm';

export default function InventoryCard({ item }) {
  const navigateTo = useNavigate();
  const location = useLocation();

  const [userError, setUserError] = useState(false);
  const [userExist, setUserExist] = useState('');
  const [editMode, setEditMode] = useState(false);

  // context
  const { isLoggedIn, setIsLoggedIn, currentUser, setCurrentUser } = useSome();

  // delete handlers
  const handleData = (data) => {
    axios
      .delete(`http://localhost:3000/api/v1/item/${item.item_name}`)
      .then((res) => navigateTo('/adminInventory'))
      .catch((err) => {
        setUserError(true);
        console.log(err.response.data);
        console.log(userError);
        setUserExist(err.response.data);
      });
  };

  if (userError) {
    return (
      <Alert key='danger' variant='danger'>
        {`${userExist} `}
        <button onClick={() => setUserError(true)} type='button'>
          Please Retry
        </button>
      </Alert>
    );
  }

  return (
    <Col>
      <Card
        style={{ border: '1px solid black' }}
        onClick={() =>
          navigateTo(`/item/${item.id}`, {
            state: { item },
          })
        }
        // style={{  }}
      >
        <Card.Body>
          <Card.Title>{item.item_name}</Card.Title>
          <Card.Text>
            {(location.pathname.includes('/inventory') ||
              location.pathname.includes('/adminInventory')) &&
            item.description.length >= 99
              ? `${item.description.slice(0, 100)}...`
              : item.description}
          </Card.Text>

          <Card.Text className='text-muted mb-2'>{`Quantity: ${item.quantity}`}</Card.Text>

          {isLoggedIn && location.pathname.includes('/item') && (
            <Button variant='primary' onClick={() => handleData()}>
              Delete
            </Button>
          )}
          {isLoggedIn && location.pathname.includes('/item') && !editMode && (
            <Button variant='primary' onClick={() => setEditMode(true)}>
              Edit Mode
            </Button>
          )}
        </Card.Body>
      </Card>
      {isLoggedIn && location.pathname.includes('/item') && (
        <ItemForm item={item} editMode={editMode} />
      )}
    </Col>
  );
}
