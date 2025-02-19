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
use App\Models\Execucao;

class SyncItemsJob implements ShouldQueue
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

            if (Cache::has($cacheKey)) {
                Log::info("📌 Página {$page} carregada do cache.");
            } else {
                Log::info("🌍 Página {$page} carregada da URL.");
            }

            // Obtém do cache ou busca da API
            $data = Cache::remember($cacheKey, $ttl, function () use ($page) {
                $response = Http::get("https://jsonplaceholder.typicode.com/todos/{$page}");

                if ($response->failed()) {
                    Log::error("❌ Falha ao buscar página {$page}: " . $response->status());
                    return null;
                }

                $jsonData = $response->json();

                if (!is_array($jsonData)) {
                    Log::error("❌ Resposta inesperada da API na página {$page}: " . json_encode($jsonData));
                    return null;
                }

                Log::info("✅ Dados da API para página {$page} armazenados no cache.");
                return $jsonData;
            });

            // Verifica se a API retornou um inteiro ou um formato inesperado
            if (!is_array($data) || empty($data)) {
                Log::warning("⚠️ Nenhum dado válido encontrado na página {$page}, encerrando...");
                $hasMoreData = false; // 🔹 Garante que o loop para corretamente
                break;
            }

            // Se for um objeto único, transforma em um array
            if ($this->isAssoc($data)) {
                $data = [$data];
            }

            foreach ($data as $item) {
                // Validação extra antes de acessar os índices
                if (!isset($item['id'], $item['title'], $item['completed'])) {
                    Log::error("❌ Item inválido na página {$page}: " . json_encode($item));
                    continue; 
                }

                Post::updateOrCreate(
                    ['id' => $item['id']],
                    [
                        'title' => $item['title'],
                        'body' => $item['completed']
                    ]
                );
            }

            Log::info("✅ Página {$page} processada com sucesso.");
            $page++;

            // Simulando paginação da API
            if ($page > 201) {
                $hasMoreData = false;
            }

        }

        Log::info('✅ Validação e atualização concluída!');

    }

    private function isAssoc(array $array): bool
    {
        return array_keys($array) !== range(0, count($array) - 1);
    }
}
