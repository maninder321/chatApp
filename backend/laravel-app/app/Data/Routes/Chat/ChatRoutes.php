<?php

/**
 * This file contains ChatRoutes class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Routes\Chat;

use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\ChatSidebarController;
use App\Http\Controllers\CreateChatController;
use Illuminate\Support\Facades\Route;

class ChatRoutes
{
    public static function createChatRoutes()
    {
        Route::post("/getUsers", [CreateChatController::class, "chatListUserHandler"]);
        Route::post("/start", [CreateChatController::class, "startChatHandler"]);
    }

    public static function chatSidebarRoutes()
    {
        Route::post("/getChats", [ChatSidebarController::class, "chatListUserHandler"]);
        // Route::post("/search", [ChatSidebarController::class, "searchChatHandler"]);
    }

    public static function chatMessageRoutes()
    {
        Route::post("/getMessages", [ChatMessageController::class, "getChatMessagesHandler"]);
        Route::post("/sendMessage", [ChatMessageController::class, "sendMessageHandler"]);
    }
}
