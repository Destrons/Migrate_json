'use client';
import { useEffect, useState } from 'react';
import api from '../utils/api';
import ItemAutocomplete from '../components/ItemAutocomplete';
import { Container, Typography } from '@mui/material';

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
      api.get('/items')
          .then((response) => setItems(response.data.data))
          .catch((error) => console.error('Erro ao buscar itens:', error));
  }, []);

  return (
      <main>
          <h1>Lista de Itens</h1>
          <ul>
              {items.map((item: any) => (
                  <li key={item.id}>{item.title}</li>
              ))}
          </ul>
          <Container>
            <Typography variant="h4" gutterBottom>Buscar Itens</Typography>
            <ItemAutocomplete />
          </Container>
      </main>
  );
}
