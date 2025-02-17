<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log; // ✅ Importação da facade Log
use App\Models\Post;

class MigrarDadosApi extends Command
{
    protected $signature = 'migrar:api';
    protected $description = 'Faz requisições paginadas à API JSON Placeholder e salva no MySQL com cache em Redis';

    public function handle()
    {
        $this->info('Iniciando migração de dados da API...');
        Log::info('🟢 Iniciando migração de dados da API...');

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
                    $this->error("Falha ao buscar página {$page}");
                    return null;
                }

                return $response->json();
            });

            if (!$data || empty($data)) {
                $this->info("Nenhum dado encontrado na página {$page}, encerrando...");
                Log::warning("⚠️ Nenhum dado encontrado na página {$page}, encerrando...");
                break;
            }

            // Verifica se a resposta da API é um objeto ou array
            $data = $this->isAssoc($data) ? [$data] : $data;

            foreach ($data as $item) {
                Post::updateOrCreate(
                    ['id' => $item['id'] ?? null], // Evita erro se 'id' não existir
                    [
                        'title' => $item['title'] ?? 'Título Padrão',
                        'body' => $item['completed'] ?? 'Conteúdo Padrão'
                    ]
                );
            }

            $this->info("Página {$page} processada com sucesso.");
            Log::info("✅ Página {$page} processada com sucesso.");

            $page++;

            // Simulando paginação da API
            $hasMoreData = $page <= 10;
        }

        $this->info('Migração concluída!');
        Log::info('✅ Migração concluída com sucesso!');
    }

    // ✅ Método para verificar se o array é associativo
    private function isAssoc(array $array): bool
    {        
        return array_keys($array) !== range(0, count($array) - 1);
    }
}
