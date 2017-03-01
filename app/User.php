<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Conversation;

class User extends Authenticatable
{
    use Notifiable;

    protected $fillable = [
        'username', 'email', 'password', 'api_token',
    ];

    protected $hidden = [
        'password', 'remember_token', 'api_token',
    ];

    public function notes() {
        return $this->hasMany(Note::class);
    }

    public function topics() {
      return $this->hasMany(Topic::class);
    }

    public function rooms() {
        return $this->hasMany(Room::class);
    }

    public function messages() {
        return $this->hasMany(Message::Class);
    }
}
