import React, { useEffect, useState, useCallback } from "react";
import { getPosts } from "../services/api";
import { debounce } from "lodash";

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [search, setSearch] = useState("");
    const perPage = 10;

    const fetchPosts = useCallback(
        debounce(async (searchTerm, page) => {
            const data = await getPosts(page, perPage, searchTerm);
            console.log("Dados recebidos:", data);

            if (Array.isArray(data)) {
                setPosts(data);
                setLastPage(Math.ceil(data.length / perPage));
            } else {
                setPosts([]);
                setLastPage(1);
            }
        }, 1000),
        []
    );

    useEffect(() => {
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
            <input type="text" placeholder="Buscar por título..." value={search} onChange={handleSearchChange} />
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <span> Página {currentPage} de {lastPage} </span>
                <button onClick={nextPage} disabled={currentPage === lastPage}>Próxima</button>
            </div>
            <ul>
                {posts.length > 0 ? (
                    posts.slice((currentPage - 1) * perPage, currentPage * perPage).map((post) => (
                        <li key={post.id}>
                            <h3>{post.id}: {post.title}</h3>
                            <p>{post.body}</p>
                        </li>
                    ))
                ) : (
                    <p>Carregando...</p>
                )}
            </ul>
            <div>
                <button onClick={prevPage} disabled={currentPage === 1}>Anterior</button>
                <span> Página {currentPage} de {lastPage} </span>
                <button onClick={nextPage} disabled={currentPage === lastPage}>Próxima</button>
            </div>
        </div>
    );
};

export default PostList;
