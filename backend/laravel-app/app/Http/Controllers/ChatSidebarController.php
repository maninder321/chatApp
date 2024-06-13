<?php

namespace App\Http\Controllers;

use App\Data\Helpers\APIResponse;
use App\Data\Services\Conversation\ChatListService;
use App\Data\Services\Conversation\ChatSearchService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatSidebarController extends Controller
{

    private $chatListService = null;

    public function __construct()
    {
        $this->chatListService = new ChatListService();
    }

    public function chatListUserHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($data, [
            'start' => 'required|numeric',
            'limit' => 'required|numeric'
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        return $this->chatListService->getUserChats($data);
    }

    public function chatByIdHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($data, [
            'chatId' => 'required|numeric',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        return $this->chatListService->getChat($data);
    }

    public function searchChatHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($data, [
            'searchText' => 'required|string',
            'start' => 'required|numeric',
            'limit' => 'required|numeric',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        return (new ChatSearchService())->search($data);
    }
}
