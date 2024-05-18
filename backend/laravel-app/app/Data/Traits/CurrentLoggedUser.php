<?php

/**
 * This file contains CurrentLoggedUser class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Traits;

use Illuminate\Support\Facades\Auth;

trait CurrentLoggedUser
{
    public function getLoggedUser()
    {
        return Auth::user();
    }
}
