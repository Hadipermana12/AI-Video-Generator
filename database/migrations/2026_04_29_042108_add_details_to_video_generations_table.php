<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('video_generations', function (Blueprint $table) {
            $table->string('keywords')->nullable()->after('topic');
            $table->string('target_audience')->nullable()->after('keywords');
            $table->string('duration')->nullable()->after('target_audience');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('video_generations', function (Blueprint $table) {
            $table->dropColumn(['keywords', 'target_audience', 'duration']);
        });
    }
};
