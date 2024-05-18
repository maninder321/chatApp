<?php

/**
 * This file contains AuthService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\Auth;

use App\Data\Helpers\APIResponse;
use App\Data\Traits\CurrentLoggedUser;

class AuthService
{
    use CurrentLoggedUser;

    public function __construct()
    {
    }

    public function checkValidTokenHandler()
    {
        $user = $this->getLoggedUser();
        $data = [
            "tokenValid" => true,
            "userData" => [
                "id" => $user->id,
                "name" => $user->name,
                "email" => $user->email
            ]
        ];
        return APIResponse::success(message: "token is valid", data: $data);
    }
}
