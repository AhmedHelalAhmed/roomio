<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;

/**
 * To test connection to the api send a request to /api/ping and "pong" should
 * be the response.
 */
Route::get('ping', function() { //  test connection to API.
    return 'pong';
});

/**
 * Routes in this group can only be accessed if a valid auth token is located
 * in the headers of the request under "Authorization" : "Bearer" + api_token.
 */
Route::group([ 'middleware' => 'auth:api' ], function () {
    Route::get('user', function () {
        return response()->json(
            Auth::user()
        );
    });
    //  Route::post('note', 'NoteController@store');
});
