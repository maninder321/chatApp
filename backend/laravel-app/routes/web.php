<?php

use App\Data\Routes\User\UserRoutes;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {
    UserRoutes::authProtectedRoutes();
});

Route::group(['prefix' => 'user'], function () {
    UserRoutes::authRoutes();

    Route::group(['prefix' => 'email'], function () {
        UserRoutes::verificationRoutes();
    });

    Route::group(['prefix' => 'forgot'], function () {
        UserRoutes::forgotPasswordRoutes();
    });
});
