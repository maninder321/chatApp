<?php

/**
 * This file contains UserVerificationService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\User;

use App\Data\Keys\User\UserKeys;
use App\Data\Repositories\User\UserRepository;
use App\Data\Services\Jwt\JwtService;
use App\Data\Utils\DateTimeUtility;
use Illuminate\Support\Str;

class UserVerificationService
{

    private $jwtService = null;
    private $userRepository = null;

    public function __construct()
    {
        $this->jwtService = new JwtService();
        $this->userRepository = new UserRepository();
    }

    /**
     * Verify user and generate verification token.
     *
     * @param int $userId The ID of the user to verify.
     * @return void
     */
    public function verifyUser($userId)
    {
        // Generate a unique identifier
        $identifier = Str::uuid();

        // Prepare payload for JWT token
        $payload = [
            UserKeys::EMAIL_VERIFICATION_TOKEN => $identifier
        ];

        // Generate JWT token with expiration time set to 1 hour
        $jwtToken = $this->jwtService->generateJwtToken(
            [
                "userId" => $userId,
                "token" => $identifier
            ],
            strtotime("+1 hour")
        );

        // Update user record with verification token
        $this->userRepository->update($userId, $payload);

        // TODO: Send Verification Email Here
    }

    /**
     * Verify email token.
     *
     * @param string $token The email verification token.
     * @return bool Whether the email token was successfully verified.
     */
    public function verifyEmailToken($token)
    {
        // Decode the JWT token
        $decodedToken = $this->jwtService->decodeJwtToken($token);

        // If token is invalid, return false
        if (is_null($decodedToken)) {
            return false;
        }

        // Check if userId and token are present in the decoded token
        if (!isset($decodedToken["userId"]) || !isset($decodedToken["token"])) {
            return false;
        }

        // Extract userId and token from the decoded token
        $userId = $decodedToken["userId"];
        $token = $decodedToken["token"];

        // Retrieve user by userId
        $user = $this->userRepository->getById($userId);

        // If user does not exist, return false
        if (!$user) {
            return false;
        }

        // If email is already verified, return true
        if ($user->is_email_verified) {
            return true;
        }

        // If the token in the decoded token does not match the user's email verification token, return false
        if ($user->email_verification_token !== $token) {
            return false;
        }

        // Update user record to mark email as verified
        $this->userRepository->update(
            $userId,
            [
                UserKeys::IS_EMAIL_VERIFIED => 1,
                UserKeys::EMAIL_VERIFICATION_TOKEN => null,
                UserKeys::EMAIL_VERIFIED_AT => DateTimeUtility::getTimeStamp('GMT')
            ]
        );

        return true;
    }
}
