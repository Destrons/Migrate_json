"use client";
import React, { useEffect, useState } from "react";
import { getItems } from "../services/api";
import { Item } from "./types"; // Importa o tipo corretamente
import Header from "./Header";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Container,
  Box,
  Pagination,
} from "@mui/material";

const PostList: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      console.log(`📡 Buscando itens da página ${page}...`);

      const response = await getItems(page);
      console.log("🔍 Resposta da API:", response);

      if (response?.data && Array.isArray(response.data)) {
        setItems(response.data);
        setTotalPages(response.last_page || 1);
      } else {
        console.error("⚠️ Formato inesperado da API:", response);
        setItems([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("❌ Erro ao buscar itens:", error);
      setItems([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isFiltering) {
      fetchData(currentPage);
    }
  }, [currentPage, isFiltering]);

  // ✅ Atualiza a página ao clicar nos botões
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      {/* O Header agora contém o campo de busca */}
      <Header setFilteredItems={(filtered) => {
        setFilteredItems(filtered);
        setIsFiltering(filtered.length > 0); // ✅ Mantém o estado de filtragem, mesmo sem resultados
        if (filtered.length === 0) {
          setIsFiltering(true); // ✅ Garante que o estado de filtragem continue ativo ao não encontrar resultados
        }
      }} />

      <Container sx={{ marginTop: "40px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          📋 Lista de Itens
        </Typography>

        <Card sx={{ marginTop: 2 }}>
          <CardContent>
            {loading ? (
              <Typography>🔄 Carregando itens...</Typography>
            ) : isFiltering && filteredItems.length === 0 ? (
              <Typography sx={{ color: "red", fontSize: "18px", fontWeight: "bold" }}>
                ❌ Nenhum resultado encontrado.
              </Typography>
            ) : (
              <List>
                {(isFiltering ? filteredItems : items).map((item) => (
                  <ListItem key={item.id} divider>
                    <ListItemText
                      primary={item.title}
                      secondary={item.body === "1" ? "✅ Completo" : "❌ Pendente"}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </CardContent>
        </Card>

        {/* ✅ Controles de Paginação só aparecem se não houver filtro ativo */}
        {!isFiltering && (
          <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Container>
    </>
  );
};

export default PostList;
