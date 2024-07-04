<?php

/**
 * This file contains ParticipantRepository class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Repositories\Participant;

use App\Data\Keys\Participant\ParticipantKeys;
use App\Data\Utils\DateTimeUtility;
use App\Models\Participant;
use Illuminate\Support\Facades\DB;

class ParticipantRepository
{
    public function __construct()
    {
    }

    /**
     * Create a new participant.
     *
     * @param array $payload The participant data.
     * @return bool|int Whether the participant was successfully created.
     */
    public function create($payload)
    {
        // Set default values for certain attributes
        $payload[ParticipantKeys::CREATED_AT_GMT] = DateTimeUtility::getTimeStamp('GMT');
        $payload[ParticipantKeys::UPDATED_AT_GMT] = DateTimeUtility::getTimeStamp('GMT');
        $payload[ParticipantKeys::DELETED] = 0;

        // Create a new participant model
        $model = new Participant();

        //map model
        $this->modelMapper($payload, $model);

        // Save the participant model
        $created = $model->save();

        return $created ? $model->id : false;
    }

    /**
     * Update participant data.
     *
     * @param int $id The participant ID.
     * @param array $payload The updated data.
     * @return bool Whether the update was successful.
     */
    public function update($id, $payload)
    {
        // Find the participant by ID
        $participant = Participant::where(ParticipantKeys::ID, $id)->first();

        // If participant not found, return false
        if (!$participant) {
            return false;
        }

        // Map payload data to model attributes
        $this->modelMapper($payload, $participant);

        // Save the updated participant
        return $participant->save();
    }

    /**
     * Get a participant by ID.
     *
     * @param int $id The ID of the participant.
     * @return mixed The participant if found, otherwise false.
     */
    public function getById($id)
    {
        // Retrieve participant by ID
        $participant = $this->getByColumn(ParticipantKeys::ID, $id);

        // If no convera$participant found, return false
        if ($participant->isEmpty()) {
            return false;
        }

        // Return the first convera$participant from the result
        return $participant->first();
    }


    /**
     * Retrieve participants by a specific column value.
     *
     * @param string $column The column name.
     * @param mixed $value The column value.
     * @return mixed The participant or null if not found.
     */
    public function getByColumn($column, $value)
    {
        // Retrieve participant by column value
        $participant = Participant::where($column, $value)->get();

        // If participant exists, return it, otherwise return null
        if ($participant) {
            return $participant;
        }

        return null;
    }

    /**
     * Retrieve participants based on raw SQL query.
     *
     * @param string $sql The SQL query.
     * @return array The array of participant models.
     */
    public function getBySql($sql)
    {
        // Execute the SQL query
        $results = DB::select($sql);

        // If no results, return an empty array
        if (empty($results)) {
            return [];
        }

        // Initialize an empty array to store participant models
        $models = [];

        // Iterate through the results and create participant models
        foreach ($results as $result) {
            $model = new Participant();
            $model->fill((array) $result);
            $models[] = $model;
        }

        return $models;
    }

    public function addParticipants($conversationId, $userIds)
    {
        $payload = [];

        foreach ($userIds as $userId) {
            $payload[] = [
                ParticipantKeys::CONVERSATION_ID => $conversationId,
                ParticipantKeys::USER_ID => $userId,
                ParticipantKeys::CREATED_AT_GMT => DateTimeUtility::getTimeStamp('GMT'),
                ParticipantKeys::UPDATED_AT_GMT => DateTimeUtility::getTimeStamp('GMT'),
                ParticipantKeys::DELETED => 0
            ];
        }

        return Participant::insert($payload);
    }

    /**
     * Map payload data to model attributes.
     *
     * @param array $payload The payload data.
     * @param mixed $model The model instance.
     * @return void
     */
    private function modelMapper($payload, $model)
    {
        // Map payload data to model attributes
        foreach ($payload as $key => $value) {
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
        switch ($key) {
            case ParticipantKeys::ID:
                $model->id = $value;
                break;
            case ParticipantKeys::CONVERSATION_ID:
                $model->conversation_id = $value;
                break;
            case ParticipantKeys::USER_ID:
                $model->user_id = $value;
                break;
            case ParticipantKeys::CREATED_AT_GMT:
                $model->created_at_gmt = $value;
                break;
            case ParticipantKeys::UPDATED_AT_GMT:
                $model->updated_at_gmt = $value;
                break;
            case ParticipantKeys::DELETED:
                $model->deleted = $value;
                break;
        }
    }
}
