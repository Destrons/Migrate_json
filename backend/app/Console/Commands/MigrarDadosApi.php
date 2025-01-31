<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class MigrarDadosApi extends Command
{
    protected $signature = 'migrar:api';
    protected $description = 'Faz requisições paginadas à API e salva no MySQL com cache em Redis';

    public function handle()
    {
        $this->info('Iniciando migração de dados da API...');

        $page = 1;
        $ttl = 86400;
        $hasMoreData = true;

        while ($hasMoreData) {
            $cacheKey = "api_data_page_{$page}";

            // Tenta obter os dados do cache Redis
            $data = Cache::remember($cacheKey, $ttl, function () use ($page) {
                $response = Http::get("https://jsonplaceholder.typicode.com/todos/{$page}");

                if ($response->failed()) {
                    $this->error("Falha ao buscar página {$page}");
                    return null;
                }

                return $response->json();
            });

            if (!$data || empty($data['items'])) {
                $this->info("Nenhum dado encontrado na página {$page}, encerrando...");
                break;
            }

            // Salvar no banco evitando duplicação
            foreach ($data['items'] as $item) {
                DB::table('dados')->updateOrInsert(
                    ['id' => $item['id']], // Evita duplicação
                    [
                        'nome' => $item['nome'],
                        'email' => $item['email'],
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }

            $this->info("Página {$page} processada com sucesso.");
            $page++;

            // Verifica se há mais páginas
            $hasMoreData = isset($data['has_more']) ? $data['has_more'] : false;
        }

        $this->info('Migração concluída!');
    }
}
