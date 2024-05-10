<?php

/**
 * This file contains PassportService class
 * 
 * @author Maninderjit Singh <maninder@zinosi.com>
 * 
 */

namespace App\Data\Services\Passport;

use Illuminate\Support\Facades\Http;
use Laravel\Passport\Client;

class PassportService
{

    public function __construct()
    {
    }

    public function getPassportTokenDetails($email, $password)
    {
        $client = Client::where("password_client", 1)->first();

        $url = url('/');

        if (config('app.local_dev')) {
            $url = 'http://host.docker.internal';
            $port = config('app.local_dev_port');
            $url = $url . ":" . $port . "/api";
        }

        $response = Http::post($url . '/oauth/token', [
            'grant_type' => 'password',
            'client_id' => $client->id,
            'client_secret' => $client->secret,
            'username' => $email,
            'password' => $password,
            'scope' => ''
        ]);

        if (!$response->successful()) {
            return false;
        }

        return $response->json();
    }
}
