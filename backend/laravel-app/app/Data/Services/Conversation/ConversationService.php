<?php

/**
 * This fle contains ConversationService class
 * 
 * @author Maninderjit Singh <maninder@zinosi.com>
 * 
 */

namespace App\Data\Services\Conversation;

use App\Data\Traits\CurrentLoggedUser;
use Illuminate\Support\Facades\DB;

class ConversationService
{

    use CurrentLoggedUser;

    public function __construct()
    {
    }

    public function getSingleChatOtherUser($chatId)
    {

        $currentUser = $this->getLoggedUser()->id;

        $sql = "
            SELECT
                *
            FROM
                conversations
            INNER JOIN
                participants
            ON conversations.id = participants.conversation_id
                AND participants.conversation_id = ?
            WHERE participants.user_id <> $currentUser
        ";

        $result = DB::select($sql, [$chatId]);

        if (empty($result)) {
            return false;
        }

        return $result[0]->user_id;
    }
}
