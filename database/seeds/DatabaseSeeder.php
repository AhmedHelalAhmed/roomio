<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Topic;
use App\Room;
use App\Message;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        
        User::truncate();
        $this->call(UsersTableSeeder::class);

        Room::truncate();
        $this->call(RoomTableSeeder::class);

        Topic::truncate();
        $this->call(TopicTableSeeder::class);

        Message::truncate();
        $this->call(MessageTableSeeder::class);

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
