<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
    {
        // Executa a migração automaticamente a cada 24 horas
        $schedule->command('migrar:api')->dailyAt('02:00')->withoutOverlapping();
    }

    protected function commands()
    {
        $this->load(__DIR__.'/Commands');
    }
}
