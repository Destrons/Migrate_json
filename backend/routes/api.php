<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\PostController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\ExecucaoController;

// Route::group(['namespace' => 'App\Http\Controllers'], function () {
//     Route::get('/posts', [PostController::class, 'index']);
// });

Route::get('/items', [ItemController::class, 'index']);
Route::post('/items', [ItemController::class, 'store']);
Route::get('/execucao/status', [ExecucaoController::class, 'status']);
Route::post('/execucao/forcar', [ExecucaoController::class, 'forcarExecucao']);
