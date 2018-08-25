<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Zakaz extends Model
{
    protected $table = 'zakaz';
    protected $fillable = ['name','adres','sena','tovars','status'];

}
