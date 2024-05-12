<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'mailgun' => [
        'domain' => env('MAILGUN_DOMAIN'),
        'secret' => env('MAILGUN_SECRET'),
        'endpoint' => env('MAILGUN_ENDPOINT', 'api.mailgun.net'),
        'scheme' => 'https',
    ],

    'postmark' => [
        'token' => env('POSTMARK_TOKEN'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'jwt' => [
        "secret" => env("JWT_SECRET", "444eefebd757f655dce05e87ff6a106b1becf11ffba31e1a85b84e1496932977851bd36915bb5aafc1561413c8d00a25dda8ed5afeae02caee84472ff693e4cad4f808a40023e329ea4e7df413e0c0b46b800d335d039e6e4bc215e9218221be829efc0598c0df1e510880888632fd9a782d25e57cfa58ce604e815769708ac3876aae2a07bafd74568bac3429e68647cd70be23fce049438b293897fdef6643f72edd54e011b9cf571cf6ca347ae85ab0148787bf59aaa263ffe4c583743d79006641ffec1da1bd4785477b0894996a7294abf44f6979973e37a79ae16646f8432cc9472d1dd920714c21fb895dae4ba295a7026a3cb8a988fed03680cb3af6")
    ]

];
