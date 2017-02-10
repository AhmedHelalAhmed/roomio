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

Route::get('users', 'UserController@index');
Route::get('users/{user}', 'UserController@show');

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

    Route::get('auth/user', function () {
        return response()->json(
            Auth::user()
        );
    });

    Route::get('user/{id}/conversations', 'UserController@getConversations');

    Route::get('conversations', 'ConversationController@index');
    Route::post('conversations', 'ConversationController@store');

    Route::get('notes', 'NoteController@index');
    Route::post('notes', 'NoteController@store');
});
