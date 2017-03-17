<?php

/**
 * /login and /register routes.
 */
// Auth::routes();
Route::group([ 'prefix' => 'api' ], function () {
  Route::post('login', ['as' => 'login.post', 'uses' => 'Auth\LoginController@login']);
  Route::post('register', ['as' => 'register.post', 'uses' => 'Auth\RegisterController@register']);
});


Route::get('/logout', function () {
    Auth::logout();
    return redirect()->intended('/');
});

// for all routes that aren't auth, send the index view (routing handled in react).
Route::get('/{all}', function ($all) {
    return view('index');
})->where(['all' => '.*']);
