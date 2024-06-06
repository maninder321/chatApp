<?php

/**
 * This file contains SendChatMessageService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\ConversationMessage;

use App\Data\Helpers\APIResponse;
use App\Data\Keys\ConversationMessage\ConversationMessageKeys;
use App\Data\Repositories\ConversationMessage\ConversationMessageRepository;
use App\Data\Traits\CurrentLoggedUser;

class SendChatMessageService
{
    use CurrentLoggedUser;

    private $conversationMessageRepository = null;

    public function __construct()
    {
        $this->conversationMessageRepository = new ConversationMessageRepository();
    }

    public function sendChatMessage($data)
    {
        $chatId = $data["chatId"];
        $message = $data["message"];

        $conversationCreated = $this->conversationMessageRepository->create(
            [
                ConversationMessageKeys::CONVERSATION_ID => $chatId,
                ConversationMessageKeys::SENDER_ID => $this->getLoggedUser()->id,
                ConversationMessageKeys::MESSAGE_TEXT => $message
            ]
        );

        if (!$conversationCreated) {
            return APIResponse::error(
                message: "Failed to send message",
                httpCode: 200
            );
        }

        $response = [
            "id" => $conversationCreated
        ];

        return APIResponse::success(
            message: "message sent",
            data: $response
        );
    }
}
