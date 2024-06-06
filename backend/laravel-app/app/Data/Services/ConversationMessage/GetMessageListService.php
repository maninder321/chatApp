<?php

/**
 * This file contains GetMessageListService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\ConversationMessage;

use App\Data\Helpers\APIResponse;
use Illuminate\Support\Facades\DB;

class GetMessageListService
{

    public function __construct()
    {
    }

    public function getChatMessages($data)
    {
        $chatId = $data["chatId"];
        $start = $data["start"];
        $limit = $data["limit"];

        $sql = "
            SELECT
                *
            FROM
                conversation_messages
            WHERE
                conversation_id = ?
                AND
                deleted = 0
            LIMIT ? OFFSET ?
            ORDER BY 
                created_at_gmt
            DESC
        ";

        $chatMessages = DB::select($sql, [$chatId, $limit, $start]);

        $response = [];

        foreach ($chatMessages as $chatMessage) {
            $response[] = [
                "id" => $chatMessage->id
            ];
        }

        return APIResponse::success(
            message: "chat messages fetched",
            metaData: [
                "count" => count($chatMessages)
            ],
            data: $response
        );
    }
}
