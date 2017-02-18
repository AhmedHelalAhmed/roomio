<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Conversation;

class ConversationController extends Controller
{
    public function index()
    {
        $conversations = Conversation::all();
        return response()->json(
            compact('conversations')
        );
    }

    public function store(Request $request)
    {
        $conversation = new Conversation();
        $conversation->save();
        $conversation->users()->attach(
            $request->user1_id
        );
        $conversation->users()->attach(
            $request->user2_id
        );
        return $conversation;
    }

    public function getMessages($convo)
    {
        $conversation = Conversation::with(['users', 'messages.user'])
          ->where('id', $convo)
          ->first();

        return response()->json([
          "conversation" => $conversation,
        ]);
    }
}
