<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tovars extends Model
{
    protected $table = 'tovars';
    protected $fillable = ['title','img','opisan','cuntry','obem','articl','kolichestvo','sena','sena2','proezvod','ypakovka','srok','sklad','id_category','pozit'];
}
