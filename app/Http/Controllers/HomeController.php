<?php

namespace App\Http\Controllers;

use App\Category;
use App\Promo;
use App\Skidka;
use App\Tovars;
use App\Zakaz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use phpDocumentor\Reflection\Types\Null_;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */


    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $skid = Skidka::find(1);
        $timeskid = (integer)$skid->time;
        $promos = Promo::all();
        $time = time();
        foreach ($promos as $promo){
            $timer =  (integer)$promo->timer + $timeskid;

            if ($timer<$time){
               $id = $promo->id;
               $item = Promo::find($id);
               $item->delete();

           }
        }

        return view('welcome');
    }
    public function showcategory(){
        $items = Category::all();
        return response()->json($items);

    }

    public function showcategoryid(Request $request){
        $id = $request->get("id");
        $items = Tovars::where('id_category',$id)->orderBy('id', 'desc')->get();

        return response()->json($items);

    }

    public function showtovarcategoryindex(Request $request){
        $id = $request->get("id");
        $items = Tovars::find($id);
        return response()->json($items);
    }
    public function categoryname(Request $request){
        $id = $request->get("id");
        $items = Category::find($id);
        return response()->json($items);

    }

    public function showctovar($id){

    }
    public function ser(Request $request){
       $ser = $request->get('ser');
       $items =Tovars::where('title', 'like', "%".$ser."%")
            ->get();
        return response()->json($items);
    }

    public function pay(){
        $ccity = session('city');
        $reg= session('reg');
        $adr= session('adres');
        $name = session('name');
        $lastname = session('lastname');
        $email = session('email');
        $phone = session('phone');
        $amout = session('sena');
        $tovars = session('tovars');
        $goodamount = $amout."00";
        $adres = $reg." регион. ".$ccity." г. ".$adr;

        $dopinva = $name." ".$lastname." ".$email." ".$phone;


        $dataadres=iconv('UTF-8','windows-1251', $adres);
        $datadop=iconv('UTF-8','windows-1251', $dopinva);
        $datatovars =iconv('UTF-8','windows-1251', $tovars);
        $PAYMENT_AMOUNT=$goodamount;
        $PAYMENT_INFO=$datatovars;
        $PAYMENT_DELIVER=$dataadres;
        $PAYMENT_ADDVALUE=$datadop;
        $MERCHANT_INFO=929;
        $PAYMENT_ORDER=time();
        $PAYMENT_TYPE=33;
        $PAYMENT_RULE=1;
        $PAYMENT_RETURNRES='http://don-simon.kz/payok';
        $PAYMENT_RETURN='http://don-simon.kz/paygood';
        $PAYMENT_RETURNMET=1;
        $PAYMENT_RETURNFAIL="http://don-simon.kz/payfail";
        $PAYMENT_TESTMODE=0;
        $SECRETCODE ='KXVi5,_OFDgF52451';
        $PAYMENT_VISA='';
        $PAYMENT_HASH=md5("$MERCHANT_INFO:$PAYMENT_TYPE:$PAYMENT_RULE:$PAYMENT_AMOUNT:$PAYMENT_ADDVALUE:$PAYMENT_INFO:$PAYMENT_DELIVER:$PAYMENT_ORDER:$PAYMENT_VISA:$PAYMENT_TESTMODE:$PAYMENT_RETURNRES:$PAYMENT_RETURN:$PAYMENT_RETURNMET:$SECRETCODE");;


        
        $params =
            "PAYMENT_AMOUNT=$PAYMENT_AMOUNT&PAYMENT_INFO=$PAYMENT_INFO&PAYMENT_DELIVER=$PAYMENT_DELIVER&PAYMENT_ADDVALUE=$PAYMENT_ADDVALUE&MERCHANT_INFO=$MERCHANT_INFO&PAYMENT_ORDER=$PAYMENT_ORDER&PAYMENT_TYPE=$PAYMENT_TYPE&PAYMENT_RULE=$PAYMENT_RULE&PAYMENT_RETURNRES=$PAYMENT_RETURNRES&PAYMENT_RETURN=$PAYMENT_RETURN&PAYMENT_RETURNMET=$PAYMENT_RETURNMET&PAYMENT_RETURNFAIL=$PAYMENT_RETURNFAIL&PAYMENT_TESTMODE=$PAYMENT_TESTMODE&PAYMENT_HASH=$PAYMENT_HASH";
        $httpurl =
            "https://balance.prostoplateg.kz/sale.php";

// инициализация сеанса
        $ch = curl_init();

// установка URL и других необходимых параметров
// установка URL и других необходимых параметров
        curl_setopt($ch, CURLOPT_URL, $httpurl);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST,1);
        curl_setopt($ch, CURLOPT_POSTFIELDS,$params);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
// выполнение запроса
        $answer = curl_exec($ch);

// завершение сеанса и освобождение ресурсов
        curl_close($ch);
        $messageutf8 = iconv('windows-1251', 'UTF-8', $answer);

        echo $messageutf8;
    }


    public function savepay(Request $request){
        $name = $request->get('name');
        $lastname =$request->get('lastname');
        $email  = $request->get('email');
        $phone = $request->get('phone');
        $reg = $request->get('reg');
        $city = $request->get('city');
        $amount = $request->get('amount');
        $adres = $request->get('adres');
        $tovars = $request->get('tovars');

        session(['name' => $name]);
        session(['lastname' => $lastname]);
        session(['email' => $email]);
        session(['phone' => $phone]);
        session(['reg' => $reg]);
        session(['city' => $city]);
        session(['adres' => $adres]);
        session(['sena' => $amount]);
        session(['tovars' => $tovars]);

        $adres = $reg." регион. ".$city." г. ".$adres;

        $dopinva = $name." ".$lastname." ".$email." ".$phone;

        session(['dopinva' => $dopinva]);

        session(['adresdata' => $adres]);
        return response()->json("ok");


    }
    public function payok (){
        session(['ok' => 'ok']);

        echo "OK";
    }
    public function paygood(Request $request){
        if ($request->session()->has('sena')) {
            $name = session('dopinva');
            $adres = session('adresdata');
            $sena = session('sena');
            $tovars = session('tovars');
            $item = new Zakaz([
                "name"=>$name,
                "adres"=> $adres,
                "sena"=> $sena,
                'tovars'=> $tovars,
                "status"=>0
            ]);
            $item->save();
            $id = $item->id;


            $email = md5(session('email'));

            $data =[
                "tomars"=>$tovars,
                "promo"=>$email,
                "id"=>$id,
            ];
            Mail::send('zakazkli',$data,  function ($message) {
                $email2 = session('email');

                $message->to($email2, 'Ваш заказ с сайта don-simon.kz')->subject('Ваш заказ с сайта don-simon.kz');
               $message->from('zakaz@don-simon.kz','Ваш заказ с сайта don-simon.kz');
            });


            $data2 =[
                "tomars"=>$tovars,
                "name"=>$name,
                "adres"=>$adres,
                "sena"=>$sena,
                "id"=>$id,
            ];

            Mail::send('mail',$data2,  function ($message) {
                $message->to('zakaz@don-simon.kz', 'Новый заказ с сайта don-simon.kz')->subject('Новый заказ с сайта don-simon.kz');
                $message->from('zakaz@don-simon.kz','Новый заказ с сайта don-simon.kz');
            });
            $item = new Promo([
                "promo"=>$email,
                "timer"=>time() ,

            ]);
            $item->save();
            if ($request->session()->has('promo')) {

                $promo = Promo::find(session('promo'));
                $promo->delete();
            }
            $request->session()->flush();

            return view('end', ['promo' => $email]);

        }else{
           return redirect('http://don-simon.kz/home');
        }

    }
    public function payfail(){
        echo "Что-то пошло не так ошибка сервера";
    }
    public function promo(Request $request){
        $promo = $request->get('promo');

        $items = Promo::where('promo', $promo)->get();
        $items2 = Promo::where('promo', $promo)->first();

        if (count($items)>0){
            $id = $items2->id;
            session(['promo' => $id]);

            return response()->json('ok');

        }else{
            return response()->json("no");
        }

    }

    public function skid(){
        $item = Skidka::find(1);
        return response()->json($item);
    }

}

