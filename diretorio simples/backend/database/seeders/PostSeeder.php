<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class PostSeeder extends Seeder
{
    public function run()
    {
        // Tempo de cache em minutos
        $cacheTime = 1440; // 24 hora

        // Verifica se os posts já estão em cache
        $posts = Cache::remember('posts_data', $cacheTime, function () {
            $response = Http::get('https://jsonplaceholder.typicode.com/posts');
            return $response->json();
        });

        // Insere ou atualiza os posts no banco
        foreach ($posts as $post) {
            Post::updateOrCreate(
                ['id' => $post['id']], 
                [
                    'title' => $post['title'],
                    'body' => $post['body']
                ]
            );
        }
    }
}
