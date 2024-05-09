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

}