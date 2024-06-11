<?php

/**
 * This file contains ConversationRepository class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Repositories\Conversation;

use App\Data\Keys\Conversation\ConversationKeys;
use App\Data\Utils\DateTimeUtility;
use App\Models\Conversation;
use Illuminate\Support\Facades\DB;

class ConversationRepository
{
    public function __construct()
    {
    }

    /**
     * Create a new conversation.
     *
     * @param array $payload The conversation data.
     * @return bool|int Whether the conversation was successfully created.
     */
    public function create($payload)
    {
        // Set default values for certain attributes
        $payload[ConversationKeys::CREATED_AT_GMT] = DateTimeUtility::getTimeStamp('GMT');
        $payload[ConversationKeys::UPDATED_AT_GMT] = DateTimeUtility::getTimeStamp('GMT');
        $payload[ConversationKeys::DELETED] = 0;

        // Create a new conversation model
        $model = new Conversation();

        //map model
        $this->modelMapper($payload, $model);

        // Save the conversation model
        $created = $model->save();

        return $created ? $model->id : false;
    }

    /**
     * Update conversation data.
     *
     * @param int $id The conversation ID.
     * @param array $payload The updated data.
     * @return bool Whether the update was successful.
     */
    public function update($id, $payload)
    {
        // Find the conversation by ID
        $conversation = Conversation::where(ConversationKeys::ID, $id)->first();

        // If conversation not found, return false
        if (!$conversation) {
            return false;
        }

        $payload[ConversationKeys::UPDATED_AT_GMT] = DateTimeUtility::getTimeStamp('GMT');

        // Map payload data to model attributes
        $this->modelMapper($payload, $conversation);

        // Save the updated conversation
        return $conversation->save();
    }

    /**
     * Get a conversation by ID.
     *
     * @param int $id The ID of the conversation.
     * @return mixed The conversation if found, otherwise false.
     */
    public function getById($id)
    {
        // Retrieve conversation by ID
        $conversation = $this->getByColumn(ConversationKeys::ID, $id);

        // If no convera$conversation found, return false
        if ($conversation->isEmpty()) {
            return false;
        }

        // Return the first convera$conversation from the result
        return $conversation->first();
    }


    /**
     * Retrieve conversations by a specific column value.
     *
     * @param string $column The column name.
     * @param mixed $value The column value.
     * @return mixed The conversation or null if not found.
     */
    public function getByColumn($column, $value)
    {
        // Retrieve conversation by column value
        $conversation = Conversation::where($column, $value)->get();

        // If conversation exists, return it, otherwise return null
        if ($conversation) {
            return $conversation;
        }

        return null;
    }

    /**
     * Retrieve conversations based on raw SQL query.
     *
     * @param string $sql The SQL query.
     * @return array The array of conversation models.
     */
    public function getBySql($sql)
    {
        // Execute the SQL query
        $results = DB::select($sql);

        // If no results, return an empty array
        if (empty($results)) {
            return [];
        }

        // Initialize an empty array to store conversation models
        $models = [];

        // Iterate through the results and create conversation models
        foreach ($results as $result) {
            $model = new Conversation();
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
            case ConversationKeys::ID:
                $model->id = $value;
                break;
            case ConversationKeys::CREATOR_ID:
                $model->creator_id = $value;
                break;
            case ConversationKeys::CONVERSATION_TYPE:
                $model->conversation_type = $value;
                break;
            case ConversationKeys::CREATED_AT_GMT:
                $model->created_at_gmt = $value;
                break;
            case ConversationKeys::UPDATED_AT_GMT:
                $model->updated_at_gmt = $value;
                break;
            case ConversationKeys::DELETED:
                $model->deleted = $value;
                break;
        }
    }
}
