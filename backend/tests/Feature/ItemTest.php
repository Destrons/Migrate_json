<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Item;
use Illuminate\Support\Facades\Http;
use App\Jobs\SyncItemsJob;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Cache;

class ItemTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_can_create_an_item()
    {
        $response = $this->postJson('/items', [
            'title' => 'Teste Item',
            'body' => 'Conteúdo de teste',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('items', ['title' => 'Teste Item']);
    }

    public function test_it_can_list_items()
    {
        Item::factory()->count(5)->create();
        $response = $this->getJson('/items');
        $response->assertStatus(200)
                 ->assertJsonCount(5, 'data');
    }

    public function test_sync_command_fetches_data()
    {
        Http::fake([
            'jsonplaceholder.typicode.com/posts' => Http::response([
                ['id' => 1, 'title' => 'Test Post', 'body' => 'Test Body'],
            ], 200)
        ]);

        $this->artisan('sync:items')->assertExitCode(0);
        $this->assertDatabaseHas('items', ['id' => 1, 'title' => 'Test Post']);
    }

    public function test_sync_job_fetches_data()
    {
        Http::fake([
            'jsonplaceholder.typicode.com/posts' => Http::response([
                ['id' => 2, 'title' => 'Job Post', 'body' => 'Job Body'],
            ], 200)
        ]);

        Queue::fake();

        SyncItemsJob::dispatch();

        Queue::assertPushed(SyncItemsJob::class);
        $this->assertDatabaseHas('items', ['id' => 2, 'title' => 'Job Post']);
    }

    public function test_cache_prevents_duplicate_requests()
    {
        Cache::shouldReceive('has')->once()->with('items_cache')->andReturn(true);
        Cache::shouldReceive('put')->never();

        Http::fake([
            'jsonplaceholder.typicode.com/posts' => Http::response([
                ['id' => 3, 'title' => 'Cached Post', 'body' => 'Cached Body'],
            ], 200)
        ]);

        $this->artisan('sync:items')->assertExitCode(0);

        $this->assertDatabaseMissing('items', ['id' => 3]);
    }
}