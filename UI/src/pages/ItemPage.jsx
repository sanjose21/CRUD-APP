import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import InventoryCard from '../components/InventoryCard';
import { useSome } from '../utilities/MainContextProvider';

export default function ItemPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { item } = location.state;
  const { someState, setSomeState } = useSome();

  const { data: inventory, isLoading, isError } = useQuery(
    'idForQuery',
    async () => {
      const response = await axios.get('http://localhost:3000/api/v1/item');
      return response.data;
    }
  );

  return (
    <div className="item-page">
      {isLoading ? <div>Loading...</div> : <InventoryCard item={item} />}
    </div>
  );
}
