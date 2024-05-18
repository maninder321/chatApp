<?php

/**
 * This file contains UserRoutes class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Routes\User;

use App\Http\Controllers\UserAuthController;
use App\Http\Controllers\UserForgotPasswordController;
use Illuminate\Support\Facades\Route;

class UserRoutes
{

    public static function authRoutes()
    {
        Route::post("register", [UserAuthController::class, "registerHandler"]);
        Route::post("login", [UserAuthController::class, "loginHandler"]);
    }

    public static function authProtectedRoutes()
    {
        Route::post("checkTokenValid", [UserAuthController::class, "checkTokenValidHanlder"]);
    }

    public static function verificationRoutes()
    {
        Route::get("verifyToken", [UserAuthController::class, "verifyEmailTokenHandler"]);
    }

    public static function forgotPasswordRoutes()
    {
        Route::post("forgotPassword", [UserForgotPasswordController::class, "forgotPasswordHandler"]);
        Route::get("verifyPassword", [UserForgotPasswordController::class, "verifyForgotPasswordHandler"]);
        Route::post("resetPassword", [UserForgotPasswordController::class, "resetPasswordHandler"]);
    }
}
