<?php

/**
 * This file contains LoginRegisterApiStatus class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\ApiStatus\User;

final class LoginRegisterApiStatus
{
    const USERNAME_ALREADY_TAKEN = "username_already_taken";
    const EMAIL_ALREADY_TAKEN = "email_already_taken";
    const FAILED_TO_REGISTER_USER = "failed_to_register_user";
    const USER_REGISTERED = "user_registered";
}
