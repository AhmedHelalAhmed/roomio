<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->increments('id');

            // the reference is for public urls and places where we dont want to
            // leak the MySQL id (because its incremental and shows our structure)
            $table->string('ref', 60)->unique();

            $table->string('username')->unique();
            $table->string('email')->unique();

            // for api permissions e.g. we want to delete a room
            $table->enum('type', array('admin','basic'))->default('basic')->index();

            // auth related
            $table->string('password');
            $table->string('api_token', 60)->unique();
            $table->rememberToken();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
