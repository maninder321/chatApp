<?php

/**
 * This file contains UserRepository class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Repositories\User;

use App\Data\Keys\User\UserKeys;
use App\Data\Utils\DateTimeUtility;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class UserRepository
{

    public function __construct()
    {
        
    }

    /**
     * Create a new user.
     *
     * @param array $payload The user data.
     * @return bool Whether the user was successfully created.
     */
    public function create($payload)
    {
        // Set default values for certain attributes
        $payload[UserKeys::EMAIL_VERIFIED_AT] = null;
        $payload[UserKeys::CREATED_AT] = DateTimeUtility::getTimeStamp('GMT');
        $payload[UserKeys::UPDATED_AT] = DateTimeUtility::getTimeStamp('GMT');
        $payload[UserKeys::IS_DEACTIVATED] = 0;

        // Create a new user model
        $model = new User();

        //map model
        $this->modelMapper($payload, $model);

        // Save the user model
        return $model->save();
    }

    /**
     * Update user data.
     *
     * @param int $id The user ID.
     * @param array $payload The updated data.
     * @return bool Whether the update was successful.
     */
    public function update($id, $payload)
    {
        // Find the user by ID
        $user = User::where(UserKeys::ID, $id)->first();
        
        // If user not found, return false
        if (!$user) {
            return false;
        }

        // Map payload data to model attributes
        $this->modelMapper($payload, $user);

        // Save the updated user
        return $user->save();
    }

    /**
     * Retrieve users based on raw SQL query.
     *
     * @param string $sql The SQL query.
     * @return array The array of user models.
     */
    public function getBySql($sql)
    {
        // Execute the SQL query
        $results = DB::select($sql);

        // If no results, return an empty array
        if (empty($results)) {
            return [];
        }

        // Initialize an empty array to store user models
        $models = [];

        // Iterate through the results and create user models
        foreach ($results as $result)
        {
            $model = new User();
            $model->fill((array) $result);
            $models[] = $model;
        }

        return $models;
    }
    /**
     * Map payload data to model attributes.
     *
     * @param array $payload The payload data.
     * @param mixed $model The model instance.
     * @return void
     */
    private function modelMapper($payload, $model) {
        // Map payload data to model attributes
        foreach ($payload as $key => $value)
        {
            $this->mapToModel($key, $value, $model);
        }
    }

    /**
     * Map key-value pairs to the corresponding attributes of the model.
     *
     * @param string $key The key.
     * @param mixed $value The value.
     * @param mixed $model The model instance.
     * @return void
     */
    private function mapToModel($key, $value, $model)
    {
        switch ($key) 
        {
            case UserKeys::ID:
                $model->id = $value;
                break;
            case UserKeys::NAME:
                $model->name = $value;
                break;
            case UserKeys::EMAIL:
                $model->email = $value;
                break;
            case UserKeys::EMAIL_VERIFIED_AT:
                $model->email_verified_at = $value;
                break;
            case UserKeys::PASSWORD:
                $model->password = $value;
                break;
            case UserKeys::CREATED_AT:
                $model->created_at = $value;
                break;
            case UserKeys::UPDATED_AT:
                $model->updated_at = $value;
                break;
            case UserKeys::IS_DEACTIVATED:
                $model->is_deactivated = $value;
                break;
        }
    }



}