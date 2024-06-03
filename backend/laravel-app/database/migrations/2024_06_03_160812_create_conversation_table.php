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
        Schema::create('conversations', function (Blueprint $table) {
            $table->bigInteger("id")->autoIncrement();
            $table->bigInteger("creator_id");
            $table->string("conversation_type");
            $table->datetime("created_at_gmt")->useCurrent();
            $table->datetime("updated_at_gmt")->useCurrent();
            $table->tinyInteger("deleted")->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('conversation');
    }
};
