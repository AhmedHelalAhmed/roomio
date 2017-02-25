<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->increments('id');
            $table->string('ref', 60)->unique()->default(uniqid());

            // no spaces (in the url) - e.g. "phplaravel"
            $table->string('name', 40)->unique()->index();

            // presentational name of topic - e.g. "The official PHP Laravel room"
            $table->text('title');
            
            // description of this room - e.g. "A place to chat about the PHP framework, Laravel"
            $table->text('description')->nullable();
            
            // This room was created by a user
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

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
        Schema::dropIfExists('rooms');
    }
}
