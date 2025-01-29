import React, { useEffect, useState, useCallback } from "react";
import { getPosts } from "../services/api";
import { debounce } from "lodash";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [search, setSearch] = useState("");
    const perPage = 5;

    // Função com debounce para buscar os posts após um tempo de espera
    const fetchPosts = useCallback(
        debounce(async (searchTerm, page) => {
          const data = await getPosts(page, perPage, searchTerm);
      
          console.log("Dados recebidos:", data); // Debug
      
          setPosts(Array.isArray(data) ? data : []); // Corrigido para lidar com arrays diretos
          setCurrentPage(currentPage); // Defina manualmente a página inicial
          setLastPage(lastPage); // Sem paginação, apenas uma página
        }, 500),
        []
      );

      useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
          .then((response) => response.json())
          .then((data) => {
            console.log("Resposta da API:", data);
          })
          .catch((error) => console.error("Erro ao buscar dados:", error));
      
        fetchPosts(search, currentPage);
      }, [search, currentPage, fetchPosts]);
    
      const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1);
      };
    
      const nextPage = () => {
        if (currentPage < lastPage) setCurrentPage(currentPage + 1);
      };
    
      const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
      };
    
      return (
        <div>
          <h1>Lista de Posts</h1>
    
          {/* Campo de busca com debounce */}
          <input
            type="text"
            placeholder="Buscar por título..."
            value={search}
            onChange={handleSearchChange}
          />

            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span> Página {currentPage} de {lastPage} </span>
            <button onClick={nextPage} disabled={currentPage === lastPage}>
              Próxima
            </button>
          </div>
    
        <ul>
            {Array.isArray(posts) ? (
                posts.map((post) => (
        <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
        </li>
                ))
            ) : (
                <p>Carregando...</p>
            )}
        </ul>

    
          {/* Paginação */}
          <div>
            <button onClick={prevPage} disabled={currentPage === 1}>
              Anterior
            </button>
            <span> Página {currentPage} de {lastPage} </span>
            <button onClick={nextPage} disabled={currentPage === lastPage}>
              Próxima
            </button>
          </div>
        </div>
      );
    };
    
    export default PostList;
