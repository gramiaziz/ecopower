<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

try {
    Illuminate\Support\Facades\Mail::raw('ECOPOWER SMTP test', function ($message) {
        $message->to('gramiaziz9@gmail.com')
                ->subject('ECOPOWER SMTP Test');
    });

    echo "EMAIL SENT SUCCESSFULLY\n";
} catch (Throwable $e) {
    echo "EMAIL ERROR: " . $e->getMessage() . "\n";
}
