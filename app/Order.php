<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    protected $fillable = [
        'RETURN_UNIQ_ID',
        'RETURN_MERCHANT',
        'RETURN_ADDVALUE',
        'RETURN_CLIENTORDER',
        'RETURN_AMOUNT',
        'RETURN_RESULT',
        'RETURN_COMISSION',
        'TEST_MODE',
        'PAYMENT_DATE',
        'RETURN_PMEMAIL',
        'RETURN_TPHONE',
        'RETURN_COMMISSTYPE',
        'RETURN_TYPE',
        'RETURN_HASH'
    ];

}
