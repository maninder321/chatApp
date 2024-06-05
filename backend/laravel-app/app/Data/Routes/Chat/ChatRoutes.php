<?php

/**
 * This file contains ChatRoutes class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Routes\Chat;

use App\Http\Controllers\CreateChatController;
use Illuminate\Support\Facades\Route;

class ChatRoutes
{
    public static function createChatRoutes()
    {
        Route::post("/getUsers", [CreateChatController::class, "chatListUserHandler"]);
        Route::post("/start", [CreateChatController::class, "startChatHandler"]);
    }
}
