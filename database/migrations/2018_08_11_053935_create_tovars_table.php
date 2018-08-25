<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTovarsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tovars', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->text('img');
            $table->text('opisan');
            $table->text("fact");
            $table->string("cuntry",100);
            $table->string('obem');
            $table->string('kg');
            $table->string('articl');
            $table->string("kolichestvo");
            $table->integer("sena");
            $table->boolean("sklad")->default(true)->change();;
            $table->text("svet");
            $table->text('vkys');
            $table->text('aromat');
            $table->text('gs');
            $table->string('proezvod');
            $table->string('ypakovka');
            $table->string('srok');
            $table->integer('id_category');
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
        Schema::dropIfExists('tovars');
    }
}
