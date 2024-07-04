<?php

namespace App\Http\Controllers;

use App\Data\Helpers\APIResponse;
use App\Data\Services\Conversation\CreateConversationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CreateChatController extends Controller
{

    private $createConversationService = null;

    public function __construct()
    {
        $this->createConversationService = new CreateConversationService();
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

        return $this->createConversationService->getChatUserList($data);
    }

    public function startChatHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($data, [
            'userId' => 'required|numeric',
            'message' => 'required|string'
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        return $this->createConversationService->startChat($data);
    }
}
