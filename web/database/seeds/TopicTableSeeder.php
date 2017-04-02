<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Topic;

class TopicTableSeeder extends Seeder
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

        foreach (range(1, 1000) as $index) {
            Topic::create([
                'title' => $faker->paragraph(2, true),
                'description' => $faker->paragraph(3, true),
                'room_name' => $this->rooms[rand(0, 9)][0],
                'user_id' => $faker->numberBetween(1, 20),
                'ref' => uniqid((string)($index)),
            ]);
        }
    }
}
