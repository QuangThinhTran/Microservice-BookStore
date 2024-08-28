<?php

namespace App\Providers;

use App\repositories\interfaces\IOrderRepository;
use App\repositories\OrderRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(IOrderRepository::class, OrderRepository::class);
    }
}
