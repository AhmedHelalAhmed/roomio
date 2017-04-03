<?php

namespace App\Http\Controllers;

use App\Topic;
use App\Room;
use App\Message;
use Illuminate\Http\Request;
use Response;
use Validator;

class TopicController extends Controller {

    public function index() {
        $topics = Topic::with(['room', 'user'])
                    ->withCount('messages')
                    ->orderBy('created_at', 'DESC')
                    ->paginate(20);

        return Response::json(compact('topics'), 200);
    }

    public function show($topicRef) {
        $topic = Topic::with(['room'])
                    ->where('ref', '=', $topicRef)
                    ->first();

        if ($topic == null) {
            return Response::json([
              'message' => 'No topic with this id.'
            ], 404);
        }

        return Response::json([compact('topic')], 200);
    }

    public function getTopicsFromRoomName($roomName) {
        $topics = Topic::with(['user'])
                    ->where('room_name', $roomName)
                    ->withCount('messages')
                    ->orderBy('created_at', 'DESC')
                    ->paginate(20);

        return Response::json(compact('topics'), 200);            
    }

    public function getWithMessages($topicRef) {
        $topic = Topic::with(['room'])
                    ->where('ref', '=',  $topicRef)
                    ->first();

        $messages = Message::with(['user'])
                    ->where('topic_ref', $topicRef)
                    ->orderBy('created_at', 'DESC')
                    ->paginate(50);

        if ($topic == null) {
            return Response::json([
              'message' => 'No topic with this id.'
            ], 404);
        }

        return Response::json([
          'topic' => $topic,
          'messages' => $messages
        ], 200);
    }

    public function store(Request $request) {
        $rules = array(
            'title' => 'required|string|max:160',
            'description' => 'string|max:1000',
            'room_name' => 'string|alpha_num|exists:rooms,name'
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator->fails()) {
            $messages = $validator->messages();
            return Response::json(compact('messages'), 400);
        }

        // check if there is a room with that id
        // $room = Room::where('name', $request->input('room_name'))->first();
        
        // if ($room === null) {
        //     return Response::json([
        //       'error' => 'There is no room with that id'
        //     ], 400);
        // }


        $topicFields = $request->all();
        $topicFields['user_id'] = $request->user()->id;
        $topicFields['ref'] = uniqid();
        
        $topic = Topic::create($topicFields);

        return Response::json(compact('topic'), 200);
        // $room->users()->attach(
        //     $request->user1_id
        // );
        // $room->users()->attach(
        //     $request->user2_id
        // );
    }

    public function update(Request $request, Topic $topic) {
        $topic = Topic::where('ref', '=', $topicRef)->first();

        $rules = array(
            'title' => 'sometimes|string|max:160',
            'description' => 'sometimes|string|max:1000'
        );

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $messages = $validator->messages();
            return Response::json(compact('messages'), 400);
        }

        $newFields = [];
        
        $newFields['description'] = $request->input('description');
        
        if ($request->input('title') != null) {
            $newFields['title'] = $request->input('title');
        }

        $topic->fill($newFields)->save();

        return $room;
    }
}
