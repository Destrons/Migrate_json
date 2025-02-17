<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Execucao;

class ExecucaoController extends Controller
{
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
        dispatch(new \App\Jobs\ValidarEPopularItems());

        return response()->json(['message' => 'Execução forçada iniciada!']);
    }
}
