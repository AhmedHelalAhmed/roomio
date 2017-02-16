<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

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

    public function getConversations($id)
    {
        $user = User::find($id);
        $conversations = $user->conversations()->with('users')->get();
        // $conversations = $user->conversations->map(function ($item) {
        //     $item->users = $item->users();
        //     return $item;
        // })->toArray();

        return response()->json(
            compact('conversations')
        );
    }
}
