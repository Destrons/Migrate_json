<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::group(['namespace' => 'App\Http\Controllers'], function () {
    Route::get('/posts', [PostController::class, 'index']);
});

