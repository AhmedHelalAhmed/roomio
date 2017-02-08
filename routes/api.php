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
    Route::get('token', function() {
        if (Auth::check()) {
            return response()->json([
                'token' => Auth::user()->api_token
            ]);
        } else {
            return response()->json([
                'message' => 'No user in session.',
                'status' => 401
            ]);
        }
    });

    Route::get('user', function () {
        return response()->json(
            Auth::user()
        );
    });

    Route::get('notes', 'NoteController@index');
    Route::post('notes', 'NoteController@store');
});
