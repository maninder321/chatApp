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
        Schema::table('users', function (Blueprint $table) {
            $table->tinyInteger("is_deactivated")->default(0)->after("updated_at");
            $table->string("username")->after("email");
            $table->tinyInteger("is_email_verified")->default(0)->after("username");
            $table->text("email_verification_token")->nullable()->after("email_verified_at");
            $table->text("forgot_password_token")->nullable()->after("email_verification_token");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn("is_deactivated");
            $table->dropColumn("username");
            $table->dropColumn("is_email_verified");
            $table->dropColumn("email_verification_token");
            $table->dropColumn("forgot_password_token");
        });
    }
};
