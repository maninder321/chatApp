<?php

/**
 * This file contains ChatSearchService class
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

class ChatSearchService
{
    use CurrentLoggedUser;

    private $currentUser = null;
    private $chatListService = null;

    public function __construct()
    {
        $this->chatListService = new ChatListService();
    }

    public function search($data)
    {
        $searchText = $data["searchText"];
        $start = $data["start"];
        $limit = $data["limit"];

        $this->currentUser = $this->getLoggedUser();

        $currentUser = $this->currentUser->id;

        $sql = "
            SELECT conversations.* FROM conversations
            INNER JOIN participants ON conversations.id = participants.conversation_id AND participants.user_id <> $currentUser
            INNER JOIN users ON participants.user_id = users.id
            WHERE conversations.id IN (SELECT
            conversations.id
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
            conversations.deleted = 0)
        AND
            users.name LIKE '%$searchText%' AND users.id <> $currentUser
        LIMIT $limit OFFSET $start
        ";

        $conversations = DB::select($sql);

        $conversationIds = [];

        foreach ($conversations as $conversation) {
            $conversationIds[] = $conversation->id;
        }

        $response = [];

        if (!empty($conversationIds)) {

            $conversationUserMapping = $this->chatListService->getConversationUsers($conversationIds);
            $conversationLastMessageMapping = $this->chatListService->getConversationLastMessage($conversationIds);

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
            message: "search chat list",
            metaData: [
                "count" => count($conversations)
            ],
            data: $response
        );
    }
}
