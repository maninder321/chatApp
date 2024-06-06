<?php

namespace App\Http\Controllers;

use App\Data\Helpers\APIResponse;
use App\Data\Services\ConversationMessage\GetMessageListService;
use App\Data\Services\ConversationMessage\SendChatMessageService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChatMessageController extends Controller
{

    private $getMessageListService = null;
    private $sendChatMessageService = null;

    public function __construct()
    {
        $this->getMessageListService = new GetMessageListService();
        $this->sendChatMessageService = new SendChatMessageService();
    }

    public function getChatMessagesHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($data, [
            'chatId' => 'required|numeric',
            'start' => 'required|numeric',
            'limit' => 'required|numeric'
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        return $this->getMessageListService->getChatMessages($data);
    }

    public function sendMessageHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($data, [
            'chatId' => 'required|numeric',
            'message' => 'required|string',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        return $this->sendChatMessageService->sendChatMessage($data);
    }
}
