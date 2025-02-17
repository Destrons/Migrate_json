<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Execucao extends Model
{
    use HasFactory;

    protected $table = 'execucoes';
    protected $fillable = ['ultima_execucao', 'status'];
}
