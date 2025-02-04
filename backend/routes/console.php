<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('json_migrate', function () {
    $this->comment('Migração efetuada com sucesso!');
})->purpose('migrar dados de um arquivo json para o banco de dados');