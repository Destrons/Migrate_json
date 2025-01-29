<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Post;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class PostSeeder extends Seeder
{
    public function run()
    {
        $response = Http::get('https://jsonplaceholder.typicode.com/posts');
        $posts = $response->json();

        foreach ($posts as $post) {
            Post::updateOrCreate(
                ['id' => $post['id']], // Garante que não haja duplicatas
                [
                    'title' => $post['title'],
                    'body' => $post['body']
                ]
            );
        }
    }
}
