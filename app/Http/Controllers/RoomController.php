<?php

namespace App\Http\Controllers;

use App\Room;
use App\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Input;
use Response;
use Validator;

class RoomController extends Controller {
  
    public function index() {
        $rooms = Room::with(['user'])->get();
        return response()->json(
            compact('rooms')
        );
    }

    public function showById($room) {
        $room = Room::with(['user'])
                  ->where('id', $room)
                  ->first();

        if ($room == null) {
            return Response::json([
              'error' => 'No room with this id.'
            ], 404);
        }

        return Response::json(compact('room'), 200);
    }

    public function showByName($name) {
        $res = [];

        $room = Room::with(['user'])
                        ->where('name', $name)
                        ->first();

        $res['room'] = $room;          

        if (Input::get("with") == 'topics') {
          $res['topics'] = Topic::with(['user'])
                            ->where('room_name', $room->name)
                            ->paginate(20);
        }

        if ($room == null) {
            return Response::json([
              'error' => 'No room with this name.'
            ], 404);
        }

        return Response::json($res, 200);
    }

    public function getWithTopics($name) {
        $room = Room::with(['user', 'topics.user'])
                  ->where('name', $name)
                  ->first();

        if ($room == null) {
            return Response::json([
              'error' => 'No room with this name.'
            ], 404);
        }

        return Response::json(compact('room'), 200);
    }

    public function store(Request $request) {
        $rules = array(
            'name' => 'required|alpha_num|max:40|unique:rooms',
            'title' => 'required|string',
            'description' => 'string'
        );

        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            $messages = $validator->messages();
            return Response::json(compact('messages'), 400);
        }

        $roomFields = $request-all();
        $roomFields['ref'] = uniqid();
        
        $room = new Room(roomFields);
        $room->user_id = $request->user()->id;
        $room->save();

        return Response::json(compact('room'), 200);
        // $room->users()->attach(
        //     $request->user1_id
        // );
        // $room->users()->attach(
        //     $request->user2_id
        // );
    }

    public function update(Request $request, Room $room) {
        $rules = array(
            'title' => 'string',
            'description' => 'string'
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

        $room->fill($newFields)->save();

        return $room;
    }

    // public function getWithMessages($convo)
    // {
    //     $room = Room::with(['users', 'messages.user'])
    //       ->where('id', $convo)
    //       ->first();
        
    //     if ($room == null) {
    //         return Response::json(compact('room'), 404);
    //     }

    //     return Response::json(compact('room'), 200);
    // }
}
