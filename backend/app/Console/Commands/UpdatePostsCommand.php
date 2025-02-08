<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use App\Models\Post;

class UpdatePostsCommand extends Command
{
    protected $signature = 'update:posts';
    protected $description = 'Busca novos posts da API JSONPlaceholder e atualiza o banco de dados';

    public function handle()
    {
        $this->info('Buscando novos posts da API...');

        // Faz a requisição para a API externa
        $response = Http::get('https://jsonplaceholder.typicode.com/posts');

        if ($response->failed()) {
            $this->error('Erro ao buscar dados da API');
            return;
        }

        $posts = $response->json();

        foreach ($posts as $post) {
            Post::updateOrCreate(
                ['id' => $post['id']], // Evita duplicação
                [
                    'title' => $post['title'],
                    'body' => $post['body']
                ]
            );
        }

        $this->info('Banco de dados atualizado com sucesso!');
    }
}
