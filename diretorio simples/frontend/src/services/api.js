import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/posts";

export const getPosts = async (page = 1, perPage = 10, search = "") => {
  try {
    const response = await axios.get(API_URL, {
      params: { page, per_page: perPage, search },
    });

    return response.data; // A API precisa retornar { data, last_page, current_page }
  } catch (error) {
    console.error("Erro ao buscar posts", error);
    return { data: [], last_page: 1 };
  }
};
