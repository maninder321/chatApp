<?php

/**
 * This file contains CreateChatApiStatus class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\ApiStatus\Chat\CreateChat;

final class CreateChatApiStatus
{
    //success
    const LIST_FETCHED = "list_fetched";
    const CHAT_CREATED = "chat_created";

    //errors
    const CONVERSATION_NOT_CREATED = "conversation_not_created";
    const PARTICIPANTS_NOT_ADDED = "participants_not_added";
    const MESSAGE_NOT_ADDED = "message_not_added";
}
