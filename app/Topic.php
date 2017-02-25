<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $fillable = [
        'title',
        'description',
        'user_id',
        'room_id'
    ];

    public function room()
    {
        return $this->belongsTo(Room::class)->select(array('title', 'name'));
    }

    public function messages() {
        return $this->hasMany(Message::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class)->select(array('id', 'username'));
    }
}
