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

Route::get("/test", function () {
    return "hllo";
});

Route::group(['prefix' => 'user'], function () {
    UserRoutes::authRoutes();
    UserRoutes::verificationRoutes();
});