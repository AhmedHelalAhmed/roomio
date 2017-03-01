<?php

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Hashids\Hashids;
/**
 * To test connection to the api send a request to /api/ping and "pong" should
 * be the response.
 */
Route::get('ping', function() { //  test connection to API.
    return 'pong';
});

/** PUBLIC ROUTES (NO AUTH NEEDED) **/
Route::group(['prefix' => 'user'], function () {
    Route::get('/', 'UserController@index');
    Route::get('/{user}', 'UserController@show');
    Route::get('/{username}/profile', 'UserController@getUserProfileFromUsername');
});

Route::group(['prefix' => 'room'], function () {
    Route::get('/', 'RoomController@index');
    Route::get('/{name}', 'RoomController@showByName');
    Route::get('/{name}/topics', 'RoomController@getWithTopics'); // TODO: Paginate

    Route::group([ 'middleware' => 'auth:api' ], function () {
      Route::post('/', 'RoomController@store');
      Route::patch('/{room}', 'RoomController@update');
    });
});


Route::group(['prefix' => 'topic'], function () {
    Route::get('/', 'TopicController@index');
    Route::get('/{topicRef}', 'TopicController@show');
    Route::get('/{topicRef}/messages', 'TopicController@getWithMessages'); // TODO: Paginate
    Route::get('/room/${roomId}', 'TopicController@getTopicsFromRoomId');
    
    Route::group([ 'middleware' => 'auth:api' ], function () {
      Route::post('/', 'TopicController@store');
      Route::patch('/{topicRef}', 'TopicController@update');
    });
});

Route::group(['prefix' => 'message'], function () {
    Route::get('/', 'MessageController@index');
    Route::get('/topic/{topicId}', 'MessageController@getMessagesForTopic');

    Route::group([ 'middleware' => 'auth:api' ], function () {
        Route::post('/', 'MessageController@store');
    });
});


/**
 * Routes in this group can only be accessed if a valid auth token is located
 * in the headers of the request under "Authorization" : "Bearer" + api_token.
 */
Route::group([ 'middleware' => 'auth:api' ], function () {
    Route::get('/auth/user', function () {
        return response()->json(
            Auth::user()
        );
    });
});
