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

    public function getConversations()
    {
        $user = request()->user();
        $conversations = $user->conversations()->with('users')->get();
        return response()->json(
            compact('conversations')
        );
    }
}
