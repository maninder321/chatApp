<?php

/**
 * This file contains ForgotPasswordApiStatus class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\ApiStatus\User;

class ForgotPasswordApiStatus
{
    const USER_NOT_FOUND_WITH_EMAIL = "user_not_found_with_email";
    const USER_NOT_FOUND = "user_not_found";
    const FORGOT_PASSWORD_EMAIL_SENT = "forgot_password_email_sent";
    const TOKEN_NOT_VERIFIED = "token_not_verified";
    const PASSWORDS_NOT_MATCHED = "passwords_not_matched";
    const FAILED_TO_UPDATE_PASSWORD = "failed_to_update_password";
    const PASSWORD_UPDATED = "password_updated";
}
