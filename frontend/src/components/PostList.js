import React, { useEffect, useState, useCallback } from "react";
import { getPosts } from "../services/api";
import { debounce } from "lodash";

const perPage = 10;

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [search, setSearch] = useState("");
    const [isUnlimited, setIsUnlimited] = useState(false); // Se true, mostra tudo sem paginação

    const fetchPosts = useCallback(
        debounce(async (searchTerm, page) => {
            const response = await getPosts(page, perPage, searchTerm);

            if (response && response.data) {
                setPosts(response.data);
                setLastPage(response.last_page || 1); // Agora usamos o last_page da API
                setIsUnlimited(perPage === -1); // Define se estamos em modo "mostrar tudo"
            } else {
                setPosts([]);
                setLastPage(1);
            }
        }, 500),
        []
    );

    useEffect(() => {
        fetchPosts(search, currentPage);
    }, [search, currentPage, fetchPosts]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setCurrentPage(1); // Resetar para página 1 ao pesquisar
    };

    const nextPage = () => {
        if (currentPage < lastPage) setCurrentPage((prev) => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    return (
        <div>
            <h1>Lista de Posts</h1>
            <input type="text" placeholder="Buscar por título..." value={search} onChange={handleSearchChange} />
            
            {!isUnlimited && ( // Exibir paginação apenas se não for ilimitado
                <div>
                    <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                    <span> Página {currentPage} de {lastPage} </span>
                    <button onClick={nextPage} disabled={currentPage === lastPage}>Próxima</button>
                </div>
            )}
            
            <ul>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li key={post.id}>
                            <h3>{post.id}: {post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))
                ) : (
                    <p>Carregando...</p>
                )}
            </ul>
            
            {!isUnlimited && ( // Exibir paginação apenas se não for ilimitado
                <div>
                    <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                    <span> Página {currentPage} de {lastPage} </span>
                    <button onClick={nextPage} disabled={currentPage === lastPage}>Próxima</button>
                </div>
            )}
        </div>
    );
};

export default PostList;
