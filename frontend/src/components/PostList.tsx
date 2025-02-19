"use client"
import React, { useEffect, useState } from "react";
import { searchItems } from "../services/api";
import { Card, CardContent, Typography, List, ListItem, ListItemText, Container, Button } from "@mui/material";

interface Item {
  id: number;
  title: string;
  body: string;
}

const PostList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
  
      console.log("🚀 Job iniciado! Aguardando atualização...");
  
      // 🔹 Aguarde alguns segundos antes de buscar os dados
      setTimeout(async () => {
        console.log("📡 Buscando itens atualizados...");
        const response = await searchItems(""); // Busca os itens
  
        console.log("🔍 Resposta da API:", response);
  
        // 🔥 🚨 Garantir que response seja um array antes de usar setItems
        if (Array.isArray(response)) {
          setItems(response);
        } else if (response?.data && Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error("⚠️ Formato inesperado da API:", response);
          setItems([]); // Evita erro no .map()
        }
  
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("❌ Erro ao buscar itens:", error);
      setItems([]); // Garante que items será sempre um array
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchData(); // 🔹 Executa a função ao carregar a página
  }, []);

  return (
    <Container sx={{ marginTop: "40px", textAlign: "center" }}>
      <Typography variant="h4">Lista de Itens</Typography>
      <Card sx={{ marginTop: 2 }}>
        <CardContent>
          {loading ? (
            <Typography>🔄 Carregando itens...</Typography>
          ) : items.length === 0 ? (
            <Typography>Nenhum item encontrado.</Typography>
          ) : (
            <List>
              {items.map((item) => (
                <ListItem key={item.id} divider>
                  <ListItemText primary={item.title} secondary={item.body} />
                </ListItem>
              ))}
            </List>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default PostList;
