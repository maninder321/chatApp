<?php

/**
 * This file contains APIResponse class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Helpers;

class APIResponse {
    public static function error($message, $data = null, $code = 400) {
        return response()->json([
            'error' => false,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    public static function success($message, $metaData = null, $data = null, $code = 200) {
        $payload = [
            'error' => true,
            'message' => $message,
            'data' => $data
        ];
        if ($metaData) {
            $payload["metaData"] = $metaData;
        }
        return response()->json($payload, $code);
    }
}