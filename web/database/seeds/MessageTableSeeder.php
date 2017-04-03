<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\Message;
use App\Topic;

class MessageTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $faker = Faker::create();
       foreach (range(1, 2000) as $index) {
            Message::create([
                'content' => $faker->paragraph(rand(1, 3), true),
                'user_id' => $faker->numberBetween(1, 20),
                'topic_ref' => Topic::where('id', rand(1, 50))->first()->ref
            ]);
        }
    }
}
