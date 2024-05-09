<?php

/**
 * This file contains DateTimeUtility class
 * 
 * @author Maninderjit Singh <maninderjitsingh380@gmail.com>
 * 
 */

namespace App\Data\Utils;

use Carbon\Carbon;

class DateTimeUtility
{

    /**
     * Get timestamp based on specified timezone.
     *
     * @param string $timeZone The timezone (default: 'GMT').
     * @return string The formatted timestamp.
     */
    public static function getTimeStamp($timeZone = 'GMT')
    {
        // Get current datetime based on timezone
        $dateTime = Carbon::now($timeZone);

        // Format datetime as 'Y-m-d H:i:s'
        $formattedDateTime = $dateTime->format('Y-m-d H:i:s');

        return $formattedDateTime;
    }

}