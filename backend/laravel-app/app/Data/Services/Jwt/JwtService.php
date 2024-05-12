<?php

/**
 * This file contains JwtService class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Services\Jwt;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtService
{

    /**
     * Generate a JWT token.
     *
     * @param string $identifier The identifier for the token.
     * @param array $payload The payload data.
     * @return string The generated JWT token.
     */
    public function generateJwtToken($payload, $expireAt)
    {
        $jwtSecret = config("services.jwt.secret");
        $payload["exp"] = $expireAt;
        return JWT::encode($payload, $jwtSecret, 'HS256');
    }

    /**
     * Decode a JWT token.
     *
     * @param string $jwtToken The JWT token to decode.
     * @return mixed|null The decoded payload if successful, otherwise null.
     */
    public function decodeJwtToken($jwtToken)
    {
        // Get the JWT secret key from the configuration
        $jwtSecret = config("services.jwt.secret");

        try {
            // Decode the JWT token
            $decoded = JWT::decode($jwtToken, new Key($jwtSecret, 'HS256'));

            return (array)$decoded;
        } catch (\Exception $e) {
            dd($e);
            // If decoding fails, return null
            return null;
        }
    }
}
