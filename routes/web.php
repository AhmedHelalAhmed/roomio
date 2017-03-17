<?php

/**
 * /login and /register routes.
 */
// Auth::routes();

Route::get('/logout', function () {
    Auth::logout();
    return redirect()->intended('/');
});

// for all routes that aren't auth, send the index.html (routing handled in react).
Route::get('/{all}', function ($all) {
    // dd(Auth::user());
    return view('index');
})->where(['all' => '.*']);
