<?php
$app = new Illuminate\Foundation\Application(realpath(__DIR__ . '/../'));

$app->singleton(Illuminate\Contracts\Http\Kernel::class, ChaoticWave\WrongNumber\Http\Kernel::class);
$app->singleton(Illuminate\Contracts\Console\Kernel::class, ChaoticWave\WrongNumber\Console\Kernel::class);
$app->singleton(Illuminate\Contracts\Debug\ExceptionHandler::class, ChaoticWave\WrongNumber\Exceptions\Handler::class);

return $app;
