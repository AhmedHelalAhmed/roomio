<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/logout', function () {
    Auth::logout();
     return redirect()->intended('/');
});

// for all routes that aren't auth, send the index.html (routing handled in react).
Route::get('/{all}', function ($all) {
    return view('index');
})->where(['all' => '.*']);
