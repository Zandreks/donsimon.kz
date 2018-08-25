<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Promo extends Model
{
    protected $table = 'promo';
    protected $fillable = ['promo','timer'];

}
