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

class ChatListService
{
    use CurrentLoggedUser;

    public function __construct()
    {
    }

    public function getUserChats($data)
    {
        $start = $data["start"];
        $limit = $data["limit"];

        $currentUser = $this->getLoggedUser()->id;

        $sql = "
            SELECT
                *
            FROM
                participants
            INNER JOIN
                conversation
            ON
                conversation.creator_id = participants.user_id
            WHERE
                participants.user_id = $currentUser
                AND
                participants.deleted = 0
                AND
                conversations.deleted = 0
            LIMIT ? OFFSET ?
        ";

        $conversations = DB::select($sql, [$limit, $start]);

        $response = [];

        foreach ($conversations as $conversation) {
            $response[] = [
                "id" => $conversation->id,
            ];
        }

        return APIResponse::success(
            message: "chat list",
            metaData: [
                "count" => count($conversations)
            ],
            data: $response
        );
    }
}
