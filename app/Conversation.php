<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

class Conversation extends Model
{
    protected $fillable = [
        'user1_id', 'user2_id',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'conversation_user');
        // return $this->belongsToMany(User::class)->withTimestamps();
    }
}

// return User::find([ $this->user1_id, $this->user2_id] );
