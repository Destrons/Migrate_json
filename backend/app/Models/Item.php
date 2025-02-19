<?php

namespace App\Models;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;


class Item extends Model
{
    protected $fillable = ['id', 'title', 'body'];
    protected $signature = 'sync:items';
    protected $description = 'Sincroniza os itens da API para o banco de dados';

    public function handle()
    {
        $url = 'https://jsonplaceholder.typicode.com/posts';
        $cacheKey = 'items_cache';

        if (Cache::has($cacheKey)) {
            Log::error('Dados já armazenados no cache.');
            return;
        }

        $response = Http::get($url);
        if ($response->failed()) {
            Log::error('Falha ao buscar dados da API');
            return;
        }

        $data = $response->json();
        foreach ($data as $post) {
            Item::updateOrCreate(['id' => $post['id']], [
                'title' => $post['title'],
                'body' => $post['body'],
            ]);
        }

        Cache::put($cacheKey, true, now()->addHours(24));
        Log::info('Dados sincronizados com sucesso!');
    }
    
}
