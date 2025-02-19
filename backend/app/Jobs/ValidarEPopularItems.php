<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

use App\Models\Post;
use App\Models\Execucao;

class ValidarEPopularItems implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function handle()
    {
        Log::info('🔄 Iniciando validação e atualização da tabela items...');

        try {
            // Código da sincronização...
    
            Execucao::create([
                'ultima_execucao' => now(),
                'status' => 'sucesso'
            ]);
    
            Log::info('✅ Validação e atualização concluída!');
        } catch (\Exception $e) {
            Execucao::create([
                'ultima_execucao' => now(),
                'status' => 'falha'
            ]);
    
            Log::error('❌ Erro ao executar sincronização: ' . $e->getMessage());
        }

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

            if (!is_array($data)) {
                Log::error("❌ Resposta inesperada da API: " . json_encode($data));
                break;
            }

            if (!isset($data[0])) {
                $data = [$data];
            }

        foreach ($data as $item) {
                Post::Create([
                    'id' => $item['id'],
                    'title' => $item['title'],
                    'body' => $item['completed']                    
                ]);
            }

            Log::info("✅ Página {$page} processada com sucesso.");
            $page++;

            // Simulando paginação da API
            $hasMoreData = $page <= 10;
        }

        Log::info('✅ Validação e atualização concluída!');
    }
}
