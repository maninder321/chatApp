<?php

/**
 * This file contains RegisterUserService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\User;

use App\Data\ErrorStatus\User\LoginRegisterApiStatus;
use App\Data\Keys\User\UserKeys;
use App\Data\Repositories\User\UserRepository;
use App\Helpers\APIResponse;
use Illuminate\Support\Facades\Hash;

class RegisterUserService
{

    private $userRepository = null;
    private $userVerificationService = null;

    public function __construct()
    {
        $this->userRepository = new UserRepository();
        $this->userVerificationService = new UserVerificationService();
    }

    /**
     * Register a new user.
     *
     * @param array $data The user data.
     * @return mixed The API response.
     */
    public function registerUser($data)
    {
        $userName = $data["userName"];
        $firstName = $data["firstName"];
        $lastName = $data["lastName"];
        $email = $data["email"];
        $password = $data["password"];

        // Check if username is already taken
        $user = $this->userRepository->getByColumn(UserKeys::USERNAME, $userName);
        if ($user) {
            return APIResponse::error(
                message: "userName is already taken",
                statusCode: LoginRegisterApiStatus::USERNAME_ALREADY_TAKEN,
                httpCode: 200
            );
        }

        // Check if email is already taken
        $user = $this->userRepository->getByColumn(UserKeys::EMAIL, $email);
        if ($user) {
            return APIResponse::error(
                message: "email is already taken",
                statusCode: LoginRegisterApiStatus::EMAIL_ALREADY_TAKEN,
                httpCode: 200
            );
        }

        // Prepare payload for user creation
        $payload = [];
        $payload[UserKeys::NAME] = $firstName . " " . $lastName;
        $payload[UserKeys::EMAIL] = $email;
        $payload[UserKeys::PASSWORD] = Hash::make($password);
        $payload[UserKeys::USERNAME] = $userName;
        $payload[UserKeys::IS_EMAIL_VERIFIED] = 0;

        // Create the user
        $created = $this->userRepository->create($payload);

        // If user creation failed, return error response
        if (!$created) {
            return APIResponse::error(
                message: "failed to register user",
                statusCode: LoginRegisterApiStatus::FAILED_TO_REGISTER_USER,
                httpCode: 200
            );
        }

        // Get the ID of the created user
        $userId = $created;

        // Start User verification process
        $this->userVerificationService->verifyUser($userId);

        // Return success response
        return APIResponse::success(
            message: "user registered",
            data: ["id" => $userId],
            statusCode: LoginRegisterApiStatus::USER_REGISTERED,
        );
    }

}