'use client';
import { useEffect, useState } from 'react';
import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import api from '../utils/api';
import debounce from 'lodash.debounce';

interface Item {
    id: number;
    title: string;
}

export default function ItemAutocomplete() {
    const [options, setOptions] = useState<Item[]>([]);
    const [loading, setLoading] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selectedItem, setSelectedItem] = useState<Item | null>(null);

    // Busca itens com debounce para evitar chamadas excessivas
    const fetchItems = debounce(async (query: string) => {
        if (!query) return;
        setLoading(true);
        try {
            const response = await api.get(`/items?search=${query}`);
            setOptions(response.data.data);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
        } finally {
            setLoading(false);
        }
    }, 500);

    useEffect(() => {
        fetchItems(inputValue);
    }, [inputValue]);

    // Adiciona novo item se não houver correspondência
    const handleAddNewItem = async () => {
        if (!inputValue) return;

        try {
            const response = await api.post('/items', { title: inputValue, body: 'Conteúdo padrão' });
            setOptions((prev) => [...prev, response.data]);
            setSelectedItem(response.data);
        } catch (error) {
            console.error('Erro ao adicionar item:', error);
        }
    };

    return (
        <Autocomplete
            options={options}
            getOptionLabel={(option) => option.title}
            loading={loading}
            value={selectedItem}
            onChange={(_, newValue) => setSelectedItem(newValue)}
            inputValue={inputValue}
            onInputChange={(_, newInputValue) => setInputValue(newInputValue)}
            renderInput={(params) => (
                <TextField {...params} label="Buscar Item" variant="outlined" fullWidth
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
            noOptionsText={
                <button onClick={handleAddNewItem} style={{ cursor: 'pointer', background: 'none', border: 'none', color: 'blue' }}>
                    Adicionar "{inputValue}"
                </button>
            }
        />
    );
}
