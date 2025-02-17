<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use App\Jobs\SyncItemsJob;
use \App\Jobs\ValidarEPopularItems;

class Kernel extends ConsoleKernel
{
    protected function schedule(Schedule $schedule)
    {
        $schedule->job(new SyncItemsJob)->daily();
        $schedule->job(new ValidarEPopularItems())->daily('01:00');
    }
    
}
