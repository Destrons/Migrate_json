<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $perPage = $request->query('per_page', 10); // Padrão: 10
        $query = Post::query();

        if (!empty($search)) {
            $query->where('title', 'like', "%{$search}%")
                  ->orWhere('body', 'like', "%{$search}%");
        }

        // PAGINAÇÃO CORRETA - Laravel já retorna `data` e `last_page`
        $posts = $query->paginate($perPage);

        return response()->json($posts);
    }
}

