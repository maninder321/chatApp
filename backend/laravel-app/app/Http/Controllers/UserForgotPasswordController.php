<?php

namespace App\Http\Controllers;

use App\Data\Helpers\APIResponse;
use App\Data\Services\User\UserForgotPasswordService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UserForgotPasswordController extends Controller
{

    private $userForgotPasswordService = null;

    public function __construct()
    {
        $this->userForgotPasswordService = new UserForgotPasswordService();
    }

    /**
     * Handler for initiating forgot password process.
     *
     * @param Request $request The request object.
     * @return mixed The API response.
     */
    public function forgotPasswordHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($data, [
            'email' => 'required|email|max:255',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        // Initiate forgot password process
        $this->userForgotPasswordService->handleForgotPassword($data);
    }

    /**
     * Handler for verifying forgot password token.
     *
     * @param Request $request The request object.
     * @return mixed The API response or password reset page link.
     */
    public function verifyForgotPasswordHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($data, [
            'token' => 'required|string',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        // Verify the forgot password token
        $isVerified = $this->userForgotPasswordService->handleVerifyForgotPassword($data);

        if ($isVerified) {
            //TODO: Return password reset page link
            return; // Return password reset page link
        }

        //TODO: Return error page
        return; // Return error page
    }

    /**
     * Handler for resetting password.
     *
     * @param Request $request The request object.
     * @return mixed The API response.
     */
    public function resetPasswordHandler(Request $request)
    {
        $data = $request->input();

        // Validate request data
        $validator = Validator::make($data, [
            'password' => 'required|string',
            'confirmPassword' => 'required|string',
            'token' => 'required|string',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            $errorMessage = $validator->errors()->first();
            return APIResponse::error($errorMessage);
        }

        // Handle password reset
        $this->userForgotPasswordService->handleResetForgotPassword($data);
    }
}
