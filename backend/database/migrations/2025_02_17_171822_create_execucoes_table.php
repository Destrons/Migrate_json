<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('execucoes', function (Blueprint $table) {
            $table->id();
            $table->timestamp('ultima_execucao')->nullable();
            $table->string('status')->default('pendente'); // sucesso ou falha
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('execucoes');
    }
};
