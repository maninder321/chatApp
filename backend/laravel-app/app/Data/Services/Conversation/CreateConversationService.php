<?php

/**
 * This file contains CreateConversationService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\Conversation;

use App\Data\ApiStatus\Chat\CreateChat\CreateChatApiStatus;
use App\Data\Enums\Conversation\ConversationTypes;
use App\Data\Helpers\APIResponse;
use App\Data\Keys\Conversation\ConversationKeys;
use App\Data\Keys\ConversationMessage\ConversationMessageKeys;
use App\Data\Repositories\Conversation\ConversationRepository;
use App\Data\Repositories\ConversationMessage\ConversationMessageRepository;
use App\Data\Repositories\Participant\ParticipantRepository;
use App\Data\Repositories\User\UserRepository;
use App\Data\Traits\CurrentLoggedUser;
use App\Events\NewChatEvent;
use App\Events\NewMessageEvent;
use Illuminate\Support\Facades\DB;

class CreateConversationService
{
    use CurrentLoggedUser;

    private $conversatioinRepository = null;
    private $participantRepository = null;
    private $conversationMessageRepository = null;

    public function __construct()
    {
        $this->conversatioinRepository = new ConversationRepository();
        $this->participantRepository = new ParticipantRepository();
        $this->conversationMessageRepository = new ConversationMessageRepository();
    }

    public function getChatUserList($data)
    {

        $start = $data["start"];
        $limit = $data["limit"];

        $currentUser = $this->getLoggedUser()->id;

        $sql = "SELECT * FROM users WHERE is_deactivated = 0 AND id <> $currentUser LIMIT $limit OFFSET $start";

        $result = DB::select($sql);

        $data = [];

        foreach ($result as $singleResult) {
            $data[] = [
                "id" => $singleResult->id,
                "name" => $singleResult->name,
                "userName" => $singleResult->username,
                "isActive" => $singleResult->is_user_online
            ];
        }

        return APIResponse::success(
            message: "list fetched",
            statusCode: CreateChatApiStatus::LIST_FETCHED,
            data: $data,
            metaData: [
                "count" => count($data)
            ]
        );
    }

    public function startChat($data)
    {

        $createrId = $this->getLoggedUser()->id;
        $conversationType = ConversationTypes::SINGLE;
        $toUserId = $data["userId"];
        $message = $data["message"];

        $chatAlreadyExists = $this->checkSingleChatAlreadyExists($createrId, $toUserId);

        if (!$chatAlreadyExists) {

            $conversationCreated = $this->conversatioinRepository->create(
                [
                    ConversationKeys::CREATOR_ID => $createrId,
                    ConversationKeys::CONVERSATION_TYPE => $conversationType
                ]
            );

            if (!$conversationCreated) {
                return APIResponse::error(
                    message: "not able to created conversation",
                    httpCode: 200,
                    statusCode: CreateChatApiStatus::CONVERSATION_NOT_CREATED
                );
            }

            $conversationId = $conversationCreated;

            $participantsAdded = $this->participantRepository->addParticipants(
                $conversationId,
                [
                    $createrId,
                    $toUserId
                ]
            );

            if (!$participantsAdded) {
                return APIResponse::error(
                    message: "not able to add participants to chat",
                    httpCode: 200,
                    statusCode: CreateChatApiStatus::PARTICIPANTS_NOT_ADDED
                );
            }
        } else {
            $conversationId = $chatAlreadyExists;
        }



        $messageCreated = $this->conversationMessageRepository->create(
            [
                ConversationMessageKeys::CONVERSATION_ID => $conversationId,
                ConversationMessageKeys::SENDER_ID => $createrId,
                ConversationMessageKeys::MESSAGE_TEXT => $message
            ]
        );

        if (!$messageCreated) {
            return APIResponse::error(
                message: "not able to add message to chat",
                httpCode: 200,
                statusCode: CreateChatApiStatus::MESSAGE_NOT_ADDED
            );
        }

        if ($chatAlreadyExists) {
            if ($toUserId) {
                $conversation = $this->conversatioinRepository->getById($conversationId);
                $payload = [
                    "chatId" => $conversationId,
                    "messageId" => $conversation->id,
                    "message" => $messageCreated->message_text,
                    "direction" => "in",
                    "createdAtGmt" => $conversation->created_at_gmt
                ];

                NewMessageEvent::dispatch("user-channel-" . $toUserId, $payload);
            }
        } else {
            if ($toUserId) {

                $payload = [
                    "id" => $conversationId,
                    "name" => $this->getLoggedUser()->name,
                    "lastMessage" => $messageCreated->message_text,
                    "timestamp" => $messageCreated->created_at_gmt,
                    "unreadCount" => 0
                ];

                NewChatEvent::dispatch("user-channel-" . $toUserId, $payload);
            }
        }


        return APIResponse::success(
            message: "chat created",
            statusCode: CreateChatApiStatus::CHAT_CREATED,
            data: ["id" => $conversationId]
        );
    }

    public function checkSingleChatAlreadyExists(
        $userOne,
        $userTwo
    ) {

        $sql = "
            SELECT
                participants.conversation_id
            FROM
                participants
            WHERE
                participants.user_id IN($userOne, $userTwo)
                AND
                deleted = 0
            GROUP BY
                participants.conversation_id
            HAVING
                COUNT(*) >= 2
        ";

        $result = DB::select($sql);

        if (empty($result)) {
            return false;
        }

        return $result[0]->conversation_id;
    }
}
