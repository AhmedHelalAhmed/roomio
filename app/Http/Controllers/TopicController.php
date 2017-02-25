<?php

namespace App\Http\Controllers;

use App\Topic;
use Illuminate\Http\Request;
use Response;
use Validator;

class TopicController extends Controller
{
    public function index()
    {
        $topics = Topic::all();
        return Response::json(compact('topics'), 400);
    }

    public function show($topic)
    {
        $topic = Topic::with(['room'])
                    ->where('id', $topic)
                    ->first();
        if ($topic == null) {
            return Response::json([
              'message' => 'No topic with this id.'
            ], 404);
        }
        return Response::json(compact('topic'), 400);
    }

    public function store(Request $request)
    {
        $rules = array(
            'title' => 'required|string|max:160',
            'description' => 'string',
            'room_id' => 'required|numeric'
        );

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails())
        {
            $messages = $validator->messages();
            return Response::json(compact('messages'), 400);
        }

        $topicFields = $request->all();
        $topicFields['user_id'] = $request->user()->id;
        $topic = Topic::create($topicFields);

        return Response::json(compact('topic'), 200);
        // $room->users()->attach(
        //     $request->user1_id
        // );
        // $room->users()->attach(
        //     $request->user2_id
        // );
    }
}
