import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Col, Row } from 'react-bootstrap';

import './styles.css';

import InventoryCard from '../components/InventoryCard';

export default function Inventory() {
  const { data, isLoading, error } = useQuery(['inventoryItems'], async () => {
    const res = await axios.get('http://localhost:3000/api/v1/item');
    return res.data;
  });

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <Row>
      <Col>
        <h1 className="inventory-heading">Inventory</h1>
        <div className="inventory-container">
          {data.map((item) => (
            <div className="inventory-card" key={item.id}>
              <InventoryCard item={item} />
            </div>
          ))}
        </div>
      </Col>
    </Row>
  );
}
