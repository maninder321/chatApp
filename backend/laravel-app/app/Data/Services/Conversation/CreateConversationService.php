<?php

/**
 * This file contains CreateConversationService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\Conversation;

use App\Data\ApiStatus\Chat\CreateChat\CreateChatApiStatus;
use App\Data\Helpers\APIResponse;
use App\Data\Traits\CurrentLoggedUser;
use Illuminate\Support\Facades\DB;

class CreateConversationService
{

    use CurrentLoggedUser;

    public function __construct()
    {
    }

    public function getChatUserList($data)
    {

        $currentUser = $this->getLoggedUser()->id;

        $sql = "SELECT * FROM users WHERE is_deactivated = 0 AND id <> $currentUser";

        $result = DB::select($sql);

        $data = [];

        foreach ($result as $singleResult) {
            $data[] = [
                "id" => $singleResult->id,
                "name" => $singleResult->name,
                "userName" => $singleResult->username
            ];
        }

        return APIResponse::success(
            message: "list fetched",
            statusCode: CreateChatApiStatus::LIST_FETCHED,
            data: $data
        );
    }
}
