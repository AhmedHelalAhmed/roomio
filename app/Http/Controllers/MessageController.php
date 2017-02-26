<?php

namespace App\Http\Controllers;
use App\Message;
use Validator;
use Response;
use Illuminate\Http\Request;

class MessageController extends Controller {

    public function index() {
        $messages = Message::with(['user'])->get();
        return response()->json(compact('messages'));
    }

    public function store(Request $request) {
        $rules = array(
            'content' => 'required|string',
            'topic_id' => 'required|numeric',
            'description' => 'string'
        );

        $messageFields = $request->all();
        // $messageFields['content'] = HTML::entities($messageFields['content']);
        $messageFields['user_id'] = $request->user()->id;

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $messages = $validator->messages();
            return Response::json(compact('messages'), 400);
            return response(400)->json(compact('messages'));
        }

        $message = Message::create($messageFields);
        $message['user'] = $request->user();

        return Response::json(compact('message'), 200);
    }
}
