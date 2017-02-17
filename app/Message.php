<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    protected $fillable = [
        'content',
        'user_id',
        'conversation_id'
    ];
    
    public function user()
    {
        return $this->belongsTo(User::Class);
    }

    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }
}