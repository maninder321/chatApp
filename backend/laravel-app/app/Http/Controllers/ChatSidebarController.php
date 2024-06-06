<?php

namespace App\Http\Controllers;

use App\Data\Helpers\APIResponse;
use App\Data\Services\Conversation\ChatListService;
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
}
