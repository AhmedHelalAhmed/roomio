<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Response;

class UserController extends Controller {

    public function index() {
        $users = User::all();
        return Response::json(compact('users'), 200);
    }

    public function show(User $user) {
        if ($user === null) {
          return Response::json([
            'error' => 'Could not find a user with that id'
          ], 404);
        }
        return Response::json(compact('user'), 200);
    }

    public function getUserProfileFromUsername($username) {
        $user = User::with('rooms', 'topics')
                  ->where('username', $username)
                  ->first();

        if ($user == null) {
          return Response::json([
            'error' => 'Could not find a user with that id'
          ], 200);
        }

       return Response::json(compact('user'), 200);
    }
}
