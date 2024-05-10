<?php

/**
 * This file contains LoginUserService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\User;

use App\Data\Helpers\APIResponse;
use App\Data\Services\Passport\PassportService;
use Illuminate\Support\Facades\Http;
use Laravel\Passport\Client;

use function PHPSTORM_META\map;

class LoginUserService
{

    private $passportService = null;

    public function __construct()
    {
        $this->passportService = new PassportService();
    }

    public function loginUser($data)
    {
        $email = $data["email"];
        $password = $data["password"];

        $loginDetails = $this->passportService->getPassportTokenDetails($email, $password);

        if (!$loginDetails) {
            return APIResponse::error(
                message: "Login faied",
                statusCode: "login_failed",
                httpCode: 200
            );
        }
        return APIResponse::success(
            message: "Login Success",
            data: $loginDetails
        );
    }
}
