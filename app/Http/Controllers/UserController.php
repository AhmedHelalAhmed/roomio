<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

    public function index()
    {
        $users = User::all();
        return response()->json(
            compact('users')
        );
    }

    public function show(User $user)
    {
        return response()->json(
            compact('user')
        );
    }

    public function getUserProfileFromUsername($username)
    {
        $user = User::with('rooms', 'topics')
                  ->where('username', $username)
                  ->first();

        if ($user == null) {
          return Response::json([
            'error' => 'Could not find a user with that id'
          ], 200);
        }

        return response()->json(
            compact('user')
        );
    }
}
