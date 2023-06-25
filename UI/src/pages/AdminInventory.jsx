import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

import InventoryCard from '../components/InventoryCard';
import { useSome } from '../utilities/MainContextProvider';

function Loading() {
  return <div>Loading...</div>;
}

function Error({ message }) {
  return <div>Error: {message}</div>;
}

export default function AdminInventory() {  // Changed from adminInventory to AdminInventory
  const { currentUser } = useSome();

  const { data, isLoading, error } = useQuery(['inventoryItems'], async () => {
    const res = await axios.get('http://localhost:3000/api/v1/item');
    if (!res.data || !Array.isArray(res.data)) {
      throw new Error("Invalid data");
    }
    return res.data;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  const adminInventory = data?.filter((item) => item.user_id === currentUser.id);

  if (!Array.isArray(adminInventory)) {
    return <Error message="No items found" />;
  }

  return (
    <Row>
      <Col className="my-inventory">
        <h1>My Inventory</h1>
        {adminInventory.map((item) => (
          <div className="inventory-card" key={item.id}>
            <InventoryCard item={item} />
          </div>
        ))}
      </Col>
    </Row>
  );
}
