<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedInteger('sort_order')->default(0)->index();
        });

        // Conserve l'ordre actuel (vedettes d'abord, puis prix) comme ordre de départ.
        $i = 0;
        DB::table('products')->orderByDesc('is_featured')->orderBy('price')->pluck('id')
            ->each(function ($id) use (&$i) {
                DB::table('products')->where('id', $id)->update(['sort_order' => $i++]);
            });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn('sort_order');
        });
    }
};
