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
        
          User::create([
              'username' => 'admin',
              'email' => 'admin@admin.com',
              'password' => bcrypt('password'),
              'api_token' => 'oFhRFh08fdX1GYfU1SBvni0o764hOSG2aod4otZXZwUv4SMuzeyFBVcNtas3',
              'ref' => uniqid((string)(1)),
          ]);

        foreach (range(1, 19) as $index) {        
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
