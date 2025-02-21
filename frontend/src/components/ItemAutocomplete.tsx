"use client";
import { useEffect, useState, useCallback } from "react";
import { TextField, CircularProgress, Box } from "@mui/material";
import { searchItems } from "../services/api";
import debounce from "lodash.debounce";
import { Item } from "./types"; // Importa o tipo centralizado

export default function ItemAutocomplete({ setFilteredItems }: { setFilteredItems: (items: Item[]) => void }) {
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(""); // ✅ Mantém o valor digitado

  // Busca itens com debounce para evitar chamadas excessivas
  const fetchItems = useCallback(
    debounce(async (query: string) => {
      setLoading(true);
      try {
        const response = await searchItems(query);
        // if (response?.data && Array.isArray(response.data)) {
        //   setFilteredItems(response.data); // ✅ Atualiza os itens na lista principal
        // } else {
        //   setFilteredItems([]); // ✅ Se não houver resultado, limpa a lista
        // }
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
        setFilteredItems([]);
      } finally {
        setLoading(false);
      }
    }, 500),
    [setFilteredItems]
  );

  useEffect(() => {
    fetchItems(inputValue);
  }, [inputValue, fetchItems]);

  return (
    <Box sx={{ width: "400px", margin: "auto", textAlign: "center" }}>
      <TextField
        label="Buscar Item"
        variant="outlined"
        fullWidth
        value={inputValue} // ✅ Mantém o valor digitado
        onChange={(e) => setInputValue(e.target.value)} // ✅ Atualiza o estado ao digitar
        sx={{
          backgroundColor: "white",
          borderRadius: "5px",
        }}
        InputProps={{
          endAdornment: loading ? <CircularProgress color="inherit" size={20} /> : null,
        }}
      />
    </Box>
  );
}
