<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Alltovars extends Model
{
  protected $table = 'alltovars';
  protected $fillable = [
      'name',
      'tovars',
      'adres',
      'email',
      'sena',
      'idzakas'
  ];

}
