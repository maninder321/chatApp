<?php

/**
 * This file contains ChatListService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\Conversation;

use App\Data\Helpers\APIResponse;
use App\Data\Traits\CurrentLoggedUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use function Psy\debug;

class ChatListService
{
    use CurrentLoggedUser;

    private $currentUser = null;

    public function __construct()
    {
    }

    public function getUserChats($data)
    {
        $start = $data["start"];
        $limit = $data["limit"];

        $this->currentUser = $this->getLoggedUser();

        $currentUser = $this->currentUser->id;

        $sql = "
            SELECT
                conversations.*
            FROM
                participants
            INNER JOIN
                conversations
            ON
                conversations.id = participants.conversation_id
            WHERE
                participants.user_id = $currentUser
                AND
                participants.deleted = 0
                AND
                conversations.deleted = 0
            ORDER BY
                updated_at_gmt DESC
            LIMIT ? OFFSET ?
        ";

        $conversations = DB::select($sql, [$limit, $start]);

        $conversationIds = [];

        foreach ($conversations as $conversation) {
            $conversationIds[] = $conversation->id;
        }

        $response = [];

        if (!empty($conversationIds)) {

            $conversationUserMapping = $this->getConversationUsers($conversationIds);
            $conversationLastMessageMapping = $this->getConversationLastMessage($conversationIds);

            foreach ($conversations as $conversation) {

                $lastMessage = $conversationLastMessageMapping[$conversation->id];

                $response[] = [
                    "id" => $conversation->id,
                    "name" => $conversationUserMapping[$conversation->id]->name,
                    "lastMessage" => $lastMessage->message_text,
                    "timestamp" => $lastMessage->created_at_gmt,
                    "unreadCount" => 0
                ];
            }
        }

        return APIResponse::success(
            message: "chat list",
            metaData: [
                "count" => count($conversations)
            ],
            data: $response
        );
    }

    public function getChat($data)
    {
        $chatId = $data["chatId"];

        $this->currentUser = $this->getLoggedUser();

        $currentUser = $this->currentUser->id;

        $conversationUserMapping = $this->getConversationUsers([$chatId]);
        $conversationLastMessageMapping = $this->getConversationLastMessage([$chatId]);

        $response = null;

        if (!empty($conversationUserMapping) && !empty($conversationLastMessageMapping)) {
            $lastMessage = $conversationLastMessageMapping[$chatId];

            $response = [
                "id" => $chatId,
                "name" => $conversationUserMapping[$chatId]->name,
                "lastMessage" => $lastMessage->message_text,
                "timestamp" => $lastMessage->created_at_gmt,
                "unreadCount" => 0
            ];
        }


        return APIResponse::success(
            message: "chat details",
            data: $response
        );
    }

    private function getConversationUsers($conversationIds)
    {

        $conversationIdsString = implode(",", $conversationIds);

        $currentUser = $this->currentUser->id;

        $sql = "
            SELECT
                users.*, participants.conversation_id
            FROM
                participants
            INNER JOIN
                users
            ON users.id = participants.user_id AND conversation_id IN ($conversationIdsString)
            WHERE
                user_id <> $currentUser
                AND
                deleted = 0
        ";

        Log::debug($sql);

        $users = DB::select($sql);

        Log::debug($users);

        $mapping = [];

        foreach ($users as $user) {
            $mapping[$user->conversation_id] = $user;
        }

        return $mapping;
    }

    private function getConversationLastMessage($conversationIds)
    {

        $conversationIdsString = implode(",", $conversationIds);

        $currentUser = $this->currentUser->id;

        $sql = "
            WITH
                lastMessages AS(
                SELECT
                    *,
                    ROW_NUMBER() OVER(
                    PARTITION BY conversation_id
                ORDER BY
                    created_at_gmt
                DESC
                ) AS ROW_COUNT
            FROM
                `conversation_messages`
            WHERE
                conversation_id IN($conversationIdsString) AND deleted = 0)
                SELECT
                    *
                FROM
                    lastMessages
                WHERE
                    ROW_COUNT = 1
        ";

        $lastMessages = DB::select($sql);

        $mapping = [];

        foreach ($lastMessages as $lastMessage) {
            $mapping[$lastMessage->conversation_id] = $lastMessage;
        }

        return $mapping;
    }
}
