<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Topic;
use App\Room;

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

        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }
}
