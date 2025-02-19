<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Item;
use App\Models\Execucao;
use App\jobs\SyncItemsJob;

class ItemController extends Controller
{
    public function index(Request $request)
    {
        $query = Item::query();
        if ($request->has('search')) {
            $query->where('title', 'like', '%' . $request->search . '%');
        }
        return response()->json($query->paginate());
    }

    public function store(Request $request)
    {
        Log::info('Recebendo requisição para adicionar item.', ['payload' => $request->all()]);
        
        $request->validate([
            'id' => 'id',
            'title' => 'required|string',
            'body' => 'required|string',
        ]);
        
        $item = Item::create($request->all());
        Log::info('Item criado com sucesso.', ['id' => $item->id]);
        
        return response()->json($item, 201);
    }

    public function status()
    {
        $execucao = Execucao::latest()->first();

        return response()->json([
            'ultima_execucao' => $execucao->ultima_execucao ?? 'Nunca executado',
            'status' => $execucao->status ?? 'pendente'
        ]);
    }

    public function forcarExecucao()
    {
        dispatch(new SyncItemsJob);

        return response()->json(['message' => 'Execução forçada iniciada!']);
        
    }
}
