<?php

/**
 * This file contains APIResponse class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Helpers;

class APIResponse
{
    public static function error($message, $data = null, $statusCode = null, $httpCode = 400)
    {
        return response()->json([
            'error' => true,
            'message' => $message,
            'data' => $data,
            'statusCode' => $statusCode
        ], $httpCode);
    }

    public static function success($message, $metaData = null, $data = null, $statusCode = null, $httpCode = 200)
    {
        $payload = [
            'error' => false,
            'message' => $message,
            'data' => $data,
            'statusCode' => $statusCode
        ];
        if ($metaData) {
            $payload["metaData"] = $metaData;
        }
        return response()->json($payload, $httpCode);
    }
}
