<?php namespace ChaoticWave\WrongNumber\Providers;

use Barryvdh\LaravelIdeHelper\IdeHelperServiceProvider;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        if ('production' !== $this->app->environment()) {
            $this->app->register(IdeHelperServiceProvider::class);
        }
    }
}
