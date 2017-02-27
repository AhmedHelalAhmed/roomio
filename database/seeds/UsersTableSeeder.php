<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;
use App\User;

class UsersTableSeeder extends Seeder
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
            User::create([
                'username' => $faker->username(),
                'email' => $faker->email(),
                'password' => bcrypt('password'),
                'api_token' => str_random(60),
                'ref' => uniqid((string)($index)),
            ]);
        }
    }
}
