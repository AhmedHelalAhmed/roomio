<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Room;

class RoomTableSeeder extends Seeder
{   

    protected $rooms = [
      ['javascript', 'Javascript'],
      ['politics', 'Politics'],
      ['hiphop', 'Hip Hop Heads'],
      ['news', 'News'],
      ['music', 'Music'],
      ['programming', 'Programming'],
      ['gifs', 'Gifs'],
      ['movies', 'Movies'],
      ['photography', 'Photography'],
      ['gaming', 'Gaming']
    ]; // 10 rooms

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $index = 1;
        foreach ($this->rooms as $room) {
          Room::create([
              'name' => $room[0],
              'title' => $room[1],
              'description' => $faker->sentences(2, true),
              'user_id' => $faker->numberBetween(1, 20),
              'ref' => uniqid((string)($index)),
          ]);
          $index++;
        }
    }
}
