<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Conversation;

class ConversationController extends Controller
{
    public function index()
    {
        $conversations = Conversation::all();
        return response()->json(compact('conversations'));
    }

    public function store(Request $request)
    {
        $conversation = new Conversation($request->all());
        $conversation->save();
        $conversation->users()->attach($request->user1_id);
        $conversation->users()->attach($request->user2_id);
        return $conversation;
    }
}
