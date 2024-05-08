<?php

/**
 * This file contains UserRoutes class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Routes\User;

use App\Http\Controllers\UserAuthController;
use Illuminate\Support\Facades\Route;

class UserRoutes
{

    public static function authRoutes()
    {
        Route::post("/register", [UserAuthController::class, "registerHandler"]);
        Route::post("/login", [UserAuthController::class, "loginHandler"]);
    }

}