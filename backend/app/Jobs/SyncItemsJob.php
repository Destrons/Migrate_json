<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use App\Models\Post;

class ValidarEPopularItems implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        Log::info('🔄 Iniciando validação e atualização da tabela items...');

        $page = 1;
        $ttl = 86400; // Cache de 24 horas
        $hasMoreData = true;

        while ($hasMoreData) {
            $cacheKey = "api_data_page_{$page}";

            // Obtém do cache ou busca da API
            $data = Cache::remember($cacheKey, $ttl, function () use ($page) {
                $response = Http::get("https://jsonplaceholder.typicode.com/todos/{$page}");

                if ($response->failed()) {
                    Log::error("❌ Falha ao buscar página {$page}: " . $response->status());
                    return null;
                }

                return $response->json();
            });

            if (!$data || empty($data)) {
                Log::warning("⚠️ Nenhum dado encontrado na página {$page}, encerrando...");
                break;
            }

            foreach ($data as $item) {
                Post::updateOrCreate(
                    ['id' => $item['id'] ?? null], // Evita erro se 'id' não existir
                    [
                        'title' => $item['title'] ?? 'Título Padrão',
                        'body' => $item['completed'] ?? 'Conteúdo Padrão'
                    ]
                );
            }

            Log::info("✅ Página {$page} processada com sucesso.");
            $page++;

            // Simulando paginação da API
            $hasMoreData = $page <= 10;
        }

        Log::info('✅ Validação e atualização concluída!');
    }
}
