<?php

/**
 * This file contains ConversationMessageRepository class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Repositories\ConversationMessage;

use App\Data\Keys\ConversationMessage\ConversationMessageKeys;
use App\Data\Utils\DateTimeUtility;
use App\Models\ConversationMessage;
use Illuminate\Support\Facades\DB;

class ConversationMessageRepository
{
    public function __construct()
    {
    }

    /**
     * Create a new conversationMessage.
     *
     * @param array $payload The conversationMessage data.
     * @return bool|int Whether the conversationMessage was successfully created.
     */
    public function create($payload)
    {
        // Set default values for certain attributes
        $payload[ConversationMessageKeys::CREATED_AT_GMT] = DateTimeUtility::getTimeStamp('GMT');
        $payload[ConversationMessageKeys::UPDATED_AT_GMT] = DateTimeUtility::getTimeStamp('GMT');
        $payload[ConversationMessageKeys::DELETED] = 0;

        // Create a new conversationMessage model
        $model = new ConversationMessage();

        //map model
        $this->modelMapper($payload, $model);

        // Save the conversationMessage model
        $created = $model->save();

        return $created ? $model->id : false;
    }

    /**
     * Update conversationMessage data.
     *
     * @param int $id The conversationMessage ID.
     * @param array $payload The updated data.
     * @return bool Whether the update was successful.
     */
    public function update($id, $payload)
    {
        // Find the conversationMessage by ID
        $conversationMessage = ConversationMessage::where(ConversationMessageKeys::ID, $id)->first();

        // If conversationMessage not found, return false
        if (!$conversationMessage) {
            return false;
        }

        // Map payload data to model attributes
        $this->modelMapper($payload, $conversationMessage);

        // Save the updated conversationMessage
        return $conversationMessage->save();
    }

    /**
     * Get a conversationMessage by ID.
     *
     * @param int $id The ID of the conversationMessage.
     * @return mixed The conversationMessage if found, otherwise false.
     */
    public function getById($id)
    {
        // Retrieve conversationMessage by ID
        $conversationMessage = $this->getByColumn(ConversationMessageKeys::ID, $id);

        // If no convera$conversationMessage found, return false
        if ($conversationMessage->isEmpty()) {
            return false;
        }

        // Return the first convera$conversationMessage from the result
        return $conversationMessage->first();
    }


    /**
     * Retrieve conversationMessages by a specific column value.
     *
     * @param string $column The column name.
     * @param mixed $value The column value.
     * @return mixed The conversationMessage or null if not found.
     */
    public function getByColumn($column, $value)
    {
        // Retrieve conversationMessage by column value
        $conversationMessage = ConversationMessage::where($column, $value)->get();

        // If conversationMessage exists, return it, otherwise return null
        if ($conversationMessage) {
            return $conversationMessage;
        }

        return null;
    }

    /**
     * Retrieve conversationMessages based on raw SQL query.
     *
     * @param string $sql The SQL query.
     * @return array The array of conversationMessage models.
     */
    public function getBySql($sql)
    {
        // Execute the SQL query
        $results = DB::select($sql);

        // If no results, return an empty array
        if (empty($results)) {
            return [];
        }

        // Initialize an empty array to store conversationMessage models
        $models = [];

        // Iterate through the results and create conversationMessage models
        foreach ($results as $result) {
            $model = new ConversationMessage();
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
            case ConversationMessageKeys::ID:
                $model->id = $value;
                break;
            case ConversationMessageKeys::CONVERSATION_ID:
                $model->conversation_id = $value;
                break;
            case ConversationMessageKeys::SENDER_ID:
                $model->sender_id = $value;
                break;
            case ConversationMessageKeys::UUID:
                $model->uuid = $value;
                break;
            case ConversationMessageKeys::MESSAGE_TEXT:
                $model->message_text = $value;
                break;
            case ConversationMessageKeys::ATTACHMENT_BATCH_NUMBER:
                $model->attachment_batch_number = $value;
                break;
            case ConversationMessageKeys::CREATED_AT_GMT:
                $model->created_at_gmt = $value;
                break;
            case ConversationMessageKeys::UPDATED_AT_GMT:
                $model->updated_at_gmt = $value;
                break;
            case ConversationMessageKeys::DELETED:
                $model->deleted = $value;
                break;
        }
    }
}
