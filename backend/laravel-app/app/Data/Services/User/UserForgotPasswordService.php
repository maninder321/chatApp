<?php

/**
 * This file contains UserForgotPasswordService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\User;

use App\Data\ApiStatus\User\ForgotPasswordApiStatus;
use App\Data\Helpers\APIResponse;
use App\Data\Keys\User\UserKeys;
use App\Data\Repositories\User\UserRepository;
use App\Data\Services\Jwt\JwtService;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserForgotPasswordService
{

    private $jwtService = null;
    private $userRepository = null;

    public function __construct()
    {
        $this->jwtService = new JwtService();
        $this->userRepository = new UserRepository();
    }

    /**
     * Handle forgot password request.
     *
     * @param array $data The request data.
     * @return mixed The API response.
     */
    public function handleForgotPassword($data)
    {
        $email = $data["email"];

        // Retrieve user by email
        $user = $this->userRepository->getByEmail($email);

        // If no user found with the given email, return error response
        if (!$user) {
            return APIResponse::error(
                message: "no user found with given email",
                statusCode: ForgotPasswordApiStatus::USER_NOT_FOUND_WITH_EMAIL,
                httpCode: 200
            );
        }

        // Generate a unique token for password reset
        $token = Str::uuid();

        // Update user record with the password reset token
        $this->userRepository->update(
            $user->id,
            [
                UserKeys::FORGOT_PASSWORD_TOKEN => $token
            ]
        );

        // Generate JWT token payload for the password reset link
        $jwtTokenPayload = [
            "userId" => $user->id,
            "forgotToken" => $token
        ];

        // Generate JWT token with expiration time set to 1 hour
        $jwtToken = $this->jwtService->generateJwtToken($jwtTokenPayload, strtotime("+1 hour"));

        // TODO: Send Forgot password email to user

        // Return success response indicating that the forgot password email has been sent
        return APIResponse::success(
            message: "Forgot password email sent",
            statusCode: ForgotPasswordApiStatus::FORGOT_PASSWORD_EMAIL_SENT
        );
    }

    /**
     * Handle verification of forgot password token.
     *
     * @param array $data The request data.
     * @return bool Whether the forgot password token is verified.
     */
    public function handleVerifyForgotPassword($data)
    {
        $token = $data["token"];

        // Decode the JWT token
        $decodedToken = $this->jwtService->decodeJwtToken($token);

        // If token is invalid, return false
        if (is_null($decodedToken)) {
            return false;
        }

        // Check if userId and forgotToken are present in the decoded token
        if (!isset($decodedToken["userId"]) || !isset($decodedToken["forgotToken"])) {
            return false;
        }

        // Extract userId and token from the decoded token
        $userId = $decodedToken["userId"];
        $token = $decodedToken["forgotToken"];

        // Retrieve user by userId
        $user = $this->userRepository->getById($userId);

        // If no user found, return false
        if (!$user) {
            return false;
        }

        // If the token in the decoded token does not match the user's forgot password token, return false
        if ($user->forgot_password_token !== $token) {
            return false;
        }

        // If all checks pass, return true indicating the token is verified
        return true;
    }

    /**
     * Handle resetting forgot password.
     *
     * @param array $data The request data.
     * @return mixed The API response.
     */
    public function handleResetForgotPassword($data)
    {
        $jwtToken = $data["token"];
        $password = $data["password"];
        $confirmPassword = $data["confirmPassword"];

        // Verify the forgot password token
        $isVerified = $this->handleVerifyForgotPassword(["token" => $jwtToken]);

        // If token verification fails, return error response
        if (!$isVerified) {
            return APIResponse::error(
                message: "Not able to verify user",
                statusCode: ForgotPasswordApiStatus::TOKEN_NOT_VERIFIED,
                httpCode: 200
            );
        }

        // Decode the JWT token to get the user ID
        $decodedToken = $this->jwtService->decodeJwtToken($jwtToken);

        $userId = $decodedToken["userId"] ?? null;

        // If user ID is not found, return error response
        if (is_null($userId)) {
            return APIResponse::error(
                message: "user not found",
                statusCode: ForgotPasswordApiStatus::USER_NOT_FOUND,
                httpCode: 200
            );
        }

        // Retrieve user by user ID
        $user = $this->userRepository->getById($userId);

        // If user does not exist, return error response
        if (!$user) {
            return APIResponse::error(
                message: "user not found",
                statusCode: ForgotPasswordApiStatus::USER_NOT_FOUND,
                httpCode: 200
            );
        }

        // If passwords do not match, return error response
        if ($password !== $confirmPassword) {
            return APIResponse::error(
                message: "passwords not matched",
                statusCode: ForgotPasswordApiStatus::PASSWORDS_NOT_MATCHED,
                httpCode: 200
            );
        }

        // Update user password
        $updated = $this->userRepository->update(
            $user->id,
            [
                UserKeys::PASSWORD => Hash::make($password)
            ]
        );

        // If failed to update password, return error response
        if (!$updated) {
            return APIResponse::error(
                message: "Failed to update password",
                statusCode: ForgotPasswordApiStatus::FAILED_TO_UPDATE_PASSWORD,
                httpCode: 200
            );
        }

        // Return success response indicating password has been updated
        return APIResponse::success(
            message: "Password updated",
            statusCode: ForgotPasswordApiStatus::PASSWORD_UPDATED,
            httpCode: 200
        );
    }
}
