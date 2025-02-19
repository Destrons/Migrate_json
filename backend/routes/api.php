<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ExecucaoController;

Route::get('/items', [ItemController::class, 'index']);
Route::post('/items', [ItemController::class, 'store']);
Route::get('/execucao/status', [ItemController::class, 'status']);
Route::post('/execucao/forcar', [ItemController::class, 'forcarExecucao']);
