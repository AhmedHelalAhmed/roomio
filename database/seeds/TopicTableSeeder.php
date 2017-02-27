<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Topic;

class TopicTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        foreach (range(1, 20) as $index) {
            Topic::create([
                'title' => $faker->paragraph(2, true),
                'description' => $faker->paragraph(3, true),
                'room_id' => $faker->numberBetween(1, 10),
                'user_id' => $faker->numberBetween(1, 20),
                'ref' => uniqid((string)($index)),
            ]);
        }
    }
}
