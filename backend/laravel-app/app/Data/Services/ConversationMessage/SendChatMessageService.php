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
use App\Data\Repositories\Conversation\ConversationRepository;
use App\Data\Repositories\ConversationMessage\ConversationMessageRepository;
use App\Data\Services\Conversation\ConversationService;
use App\Data\Traits\CurrentLoggedUser;
use App\Events\NewMessageEvent;

class SendChatMessageService
{
    use CurrentLoggedUser;

    private $conversationMessageRepository = null;
    private $conversationRepository = null;
    private $conversationService = null;

    public function __construct()
    {
        $this->conversationMessageRepository = new ConversationMessageRepository();
        $this->conversationRepository = new ConversationRepository();
        $this->conversationService = new ConversationService();
    }

    public function sendChatMessage($data)
    {
        $chatId = $data["chatId"];
        $message = $data["message"];

        $conversationMessageCreated = $this->conversationMessageRepository->create(
            [
                ConversationMessageKeys::CONVERSATION_ID => $chatId,
                ConversationMessageKeys::SENDER_ID => $this->getLoggedUser()->id,
                ConversationMessageKeys::MESSAGE_TEXT => $message
            ]
        );

        if (!$conversationMessageCreated) {
            return APIResponse::error(
                message: "Failed to send message",
                httpCode: 200
            );
        }

        $this->conversationRepository->update($chatId, []);

        $response = [
            "id" => $conversationMessageCreated->id,
            "message" => $conversationMessageCreated->message_text,
            "direction" => "out",
            "createdAtGmt" => $conversationMessageCreated->created_at_gmt
        ];

        $toUser = $this->conversationService->getSingleChatOtherUser($chatId);

        if ($toUser) {

            $payload = [
                "chatId" => $chatId,
                "messageId" => $conversationMessageCreated->id,
                "message" => $conversationMessageCreated->message_text,
                "direction" => "in",
                "createdAtGmt" => $conversationMessageCreated->created_at_gmt
            ];

            NewMessageEvent::dispatch("user-channel-" . $toUser, $payload);
        }

        return APIResponse::success(
            message: "message sent",
            data: $response
        );
    }
}
