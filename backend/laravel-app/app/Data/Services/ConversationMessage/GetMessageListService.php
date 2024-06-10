<?php

/**
 * This file contains GetMessageListService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\ConversationMessage;

use App\Data\Helpers\APIResponse;
use App\Data\Traits\CurrentLoggedUser;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class GetMessageListService
{

    use CurrentLoggedUser;

    public function __construct()
    {
    }

    public function getChatMessages($data)
    {

        $currentUser = $this->getLoggedUser()->id;

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
                ORDER BY 
                created_at_gmt
            DESC
            LIMIT ? OFFSET ?
        ";

        Log::debug($sql);

        $chatMessages = DB::select($sql, [$chatId, $limit, $start]);

        $response = [];

        foreach ($chatMessages as $chatMessage) {

            $direction = "in";

            if ($chatMessage->sender_id === $currentUser) {
                $direction = "out";
            }

            $response[] = [
                "id" => $chatMessage->id,
                "message" => $chatMessage->message_text,
                "cretedAtGmt" => $chatMessage->created_at_gmt,
                "direction" => $direction
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
