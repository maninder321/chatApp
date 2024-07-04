<?php

namespace App\Http\Controllers;

use App\Data\Keys\User\UserKeys;
use App\Data\Repositories\User\UserRepository;
use App\Events\OnlineOfflineEvent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebSocketController extends Controller
{

    public function __construct()
    {
    }

    public function onlineOfflineHandler(Request $request)
    {
        Log::debug($request->input());
        $data = $request->input();
        $event = $data["events"][0];

        $userId = explode("-", $event["channel"])[2];

        $isOnline = 1;

        if ($event["name"] == "channel_vacated") {
            $isOnline = 0;
        }

        (new UserRepository())->update(
            $userId,
            [
                UserKeys::IS_USER_ONLINE => $isOnline
            ]
        );

        OnlineOfflineEvent::dispatch(["id" => $userId, "isActive" => $isOnline ? true : false]);
    }
}
