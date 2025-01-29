import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/posts";

export const getPosts = async (page = 1, perPage = 10, search = "") => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar posts", error);
    return { data: [], total: 0, current_page: 1, last_page: 1 };
  }
};