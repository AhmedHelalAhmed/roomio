<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Conversation;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'api_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token', 'api_token',
    ];

    public function notes() {
        return $this->hasMany(Note::class);
    }

    public function conversations() {
        return $this->belongsToMany(Conversation::class, 'conversation_user')->withTimestamps();
    }

    public function messages() {
        return $this->hasMany(Message::Class);
    }
}
