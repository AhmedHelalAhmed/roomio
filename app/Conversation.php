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
        // return User::find([$this->user1_id, $this->user2_id]);
        return User::find([$this->user1_id, $this->user2_id]);
    }
}
