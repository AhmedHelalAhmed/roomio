<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->increments('id');
            
            // this message belongs to a user.
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');

            // this message belongs to a room.
            $table->integer('topic_id')->unsigned();
            $table->foreign('topic_id')->references('id')->on('topics');

            $table->text('content');

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
        Schema::dropIfExists('messages');
    }
}
