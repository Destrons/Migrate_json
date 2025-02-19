"use client";
import { useEffect, useState, useCallback } from "react";
import { Autocomplete, TextField, CircularProgress, Box } from "@mui/material";
import { searchItems } from "../services/api";
import debounce from "lodash.debounce";

interface Item {
  id: number;
  title: string;
}

export default function ItemAutocomplete() {
  const [options, setOptions] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  // Busca itens com debounce para evitar chamadas excessivas
  const fetchItems = useCallback(
    debounce(async (query: string) => {
      if (!query) return;
      setLoading(true);
      try {
        const data = await searchItems(query);
        setOptions(data);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if (inputValue) fetchItems(inputValue);
  }, [inputValue, fetchItems]);

  return (
    <Box sx={{ width: "400px" }}> {/* 🔹 Define largura fixa para centralizar */}
      <Autocomplete
        options={options}
        getOptionLabel={(option) => option.title}
        loading={loading}
        value={selectedItem}
        onChange={(_, newValue) => setSelectedItem(newValue)}
        inputValue={inputValue}
        onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar Item"
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "white",
              borderRadius: "5px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#6A0DAD",
                },
                "&:hover fieldset": {
                  borderColor: "#4A0072",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#4A0072",
                },
              },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
