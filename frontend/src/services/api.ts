import axios from "axios";

// ✅ Definição da URL base da API
const API_URL = "http://127.0.0.1:8000/api";

// ✅ Configuração do Axios para chamadas reutilizáveis
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Função para obter a lista de itens com paginação
export const getItems = async (page: number = 1) => {
  try {
    const response = await api.get(`/items?page=${page}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar itens:", error);
    return { data: [], last_page: 1 }; // Retorna um objeto seguro caso dê erro
  }
};

// ✅ Função para buscar itens filtrados pelo nome (para autocomplete)
export const searchItems = async (query: string) => {
  try {
    const response = await api.get(`/items?search=${query}`);
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao buscar itens:", error);
    return { data: [] };
  }
};

// ✅ Função para obter o status da última sincronização
export const getExecucaoStatus = async () => {
  try {
    const response = await api.get("/execucao/status");
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao obter status da sincronização:", error);
    return { ultima_execucao: "Erro", status: "falha" };
  }
};

// ✅ Função para forçar a execução da sincronização
export const forcarExecucao = async () => {
  try {
    const response = await api.post("/execucao/forcar");
    return response.data;
  } catch (error) {
    console.error("❌ Erro ao iniciar execução:", error);
    return { message: "Erro ao iniciar execução" };
  }
};

// ✅ Exportação padrão do Axios para outras chamadas
export default api;
