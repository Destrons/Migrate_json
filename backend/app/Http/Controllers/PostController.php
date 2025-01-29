<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->query('per_page', 10); // Número de itens por página (padrão: 10)
        $search = $request->query('search', ''); // Termo de busca

        $query = Post::query();

        if (!empty($search)) {
            $query->where('title', 'LIKE', "%{$search}%");
        }

        //return response()->json(Post::paginate($perPage));
        return response()->json(Post::all());
    }
}
