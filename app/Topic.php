<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model {

    protected $fillable = [
        'title',
        'description',
        'user_id',
        'room_name',
        'ref'
    ];

    public function room() {
        return $this->belongsTo(Room::class, 'room_name', 'name')->select(array('title', 'name'));
        // return $this->belongsTo(Room::class)->select(array('title', 'name'));
    }

    public function messages() {
        return $this->hasMany(Message::class, 'topic_ref', 'ref');
    }

    public function user() {
        return $this->belongsTo(User::class)->select(array('id', 'username'));
    }

    public function allMessages() {
        return $this->hasMany(Message::class, 'topic_ref', 'ref');
    }
}
