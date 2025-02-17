<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $query = Item::query();
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        return response()->json($query->paginate(10));
    }

    public function store(Request $request)
    {
        Log::info('Recebendo requisição para adicionar item.', ['payload' => $request->all()]);
        
        $request->validate([
            'title' => 'required|string',
            'body' => 'required|string',
        ]);
        
        $item = Item::create($request->all());
        Log::info('Item criado com sucesso.', ['id' => $item->id]);
        
        return response()->json($item, 201);
    }
}
