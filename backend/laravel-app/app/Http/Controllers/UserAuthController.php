<?php

/**
 * This file contains UserAuthController class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Http\Controllers;

use App\Data\Helpers\APIResponse;
use App\Data\Services\User\LoginUserService;
use App\Data\Services\User\RegisterUserService;
use App\Data\Services\User\UserVerificationService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserAuthController extends Controller
{

    private $registerUserService = null;
    private $loginUserService = null;
    private $userVerificationService = null;

    public function __construct()
    {
        $this->registerUserService = new RegisterUserService();
        $this->loginUserService = new LoginUserService();
        $this->userVerificationService = new UserVerificationService();
    }

    /**
     * Login handler.
     *
     * @param Request $request The request object.
     * @return mixed The response.
     */
    public function loginHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($data, [
            'email' => 'required|email|max:255',
            'password' => 'required|string|max:255'
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        // Authenticate the user using the service
        return $this->loginUserService->loginUser($data);
    }

    /**
     * Register a new user handler.
     *
     * @param Request $request The request object.
     * @return mixed The response.
     */
    public function registerHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($request->input(), [
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'password' => 'required|string|max:255',
            'userName' => 'required|string',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        // Register the user using the service
        return $this->registerUserService->registerUser($data);
    }

    /**
     * Verify email token handler.
     *
     * @param Request $request The request object.
     * @return mixed The response.
     */
    public function verifyEmailTokenHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($request->input(), [
            'token' => 'required|string',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        // Register the user using the service
        $isVerified = $this->userVerificationService->verifyEmailToken($data["token"]);

        if ($isVerified) {
            return "User Verified";
        }

        return "User not Verified";
    }
}
