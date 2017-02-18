<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Conversation extends Model
{
    public function users()
    {
        return $this->belongsToMany(User::class, 'conversation_user')->withTimestamps();
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }
}

// return User::find([ $this->user1_id, $this->user2_id] );
