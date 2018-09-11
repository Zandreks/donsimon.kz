<?php

namespace App\Http\Controllers;

use App\Category;
use App\Order;
use App\Promo;
use App\Skidka;
use App\Tovars;
use App\Zakaz;
use App\Alltovars;

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
        $items = Tovars::where('id_category',$id)->orderBy('pozit', 'asc')->get();

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
        $timeorder = session('timeorder');
        $promo = session('promo') ;

        $dataadres=iconv('UTF-8','windows-1251', $adres);
        $datadop=iconv('UTF-8','windows-1251', $dopinva);
        $datatovars =iconv('UTF-8','windows-1251', $tovars);
        $PAYMENT_AMOUNT=$goodamount;
        $PAYMENT_INFO=$datatovars;
        $PAYMENT_DELIVER=$dataadres;
        $PAYMENT_ADDVALUE=$datadop;
        $MERCHANT_INFO=929;
        $PAYMENT_ORDER=$timeorder;
        $PAYMENT_TYPE=33;
        $PAYMENT_RULE=1;
        $PAYMENT_RETURNRES='http://don-simon.kz/payok';
        $PAYMENT_RETURN='http://don-simon.kz/paygood';
        $PAYMENT_RETURNMET=2;
        $PAYMENT_RETURNFAIL="http://don-simon.kz/payfail";
        $PAYMENT_TESTMODE=0;
        $SECRETCODE ='KXVi5,_OFDgF52451';
        $PAYMENT_VISA='';
        $PAYMENT_HASH=md5("$MERCHANT_INFO:$PAYMENT_TYPE:$PAYMENT_RULE:$PAYMENT_AMOUNT:$PAYMENT_ADDVALUE:$PAYMENT_INFO:$PAYMENT_DELIVER:$PAYMENT_ORDER:$PAYMENT_VISA:$PAYMENT_TESTMODE:$PAYMENT_RETURNRES:$PAYMENT_RETURN:$PAYMENT_RETURNMET:$SECRETCODE");;



        $params =
            "PAYMENT_AMOUNT=$PAYMENT_AMOUNT&PAYMENT_INFO=$PAYMENT_INFO&PAYMENT_DELIVER=$PAYMENT_DELIVER&PAYMENT_ADDVALUE=$PAYMENT_ADDVALUE&MERCHANT_INFO=$MERCHANT_INFO&PAYMENT_ORDER=$PAYMENT_ORDER&PAYMENT_TYPE=$PAYMENT_TYPE&PAYMENT_RULE=$PAYMENT_RULE&PAYMENT_RETURNRES=$PAYMENT_RETURNRES&PAYMENT_RETURN=$PAYMENT_RETURN&PAYMENT_RETURNMET=$PAYMENT_RETURNMET&PAYMENT_RETURNFAIL=$PAYMENT_RETURNFAIL&PAYMENT_TESTMODE=$PAYMENT_TESTMODE&PAYMENT_HASH=$PAYMENT_HASH";
        $httpurl =
            "https://balance.prostoplateg.kz/sale.php";


            /// сохранение заказов
            $item = new Alltovars([
                "name"=>$dopinva,
                "adres"=> $adres,
                "sena"=> $amout,
                'tovars'=> $tovars,
                "idzakas"=>$timeorder,
                'email'=>$email,
                "promo"=>$promo
            ]);
            $item->save();

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
        session(['timeorder' => time()]);

        $adres = $reg." регион. ".$city." г. ".$adres;

        $dopinva = $name." ".$lastname." ".$email." ".$phone;

        session(['dopinva' => $dopinva]);

        session(['adresdata' => $adres]);
        return response()->json("ok");


    }
    public function payok (Request $request){
         $item = new Order([
            'RETURN_UNIQ_ID'=>$request->get('RETURN_UNIQ_ID'),
            'RETURN_MERCHANT'=>$request->get('RETURN_MERCHANT'),
            'RETURN_CLIENTORDER'=> $request->get('RETURN_CLIENTORDER'),
            'RETURN_AMOUNT'=> $request->get('RETURN_AMOUNT'),
            'RETURN_RESULT'=> $request->get('RETURN_RESULT'),
            'RETURN_COMISSION'=>$request->get('RETURN_COMISSION'),
            'TEST_MODE'=>$request->get('TEST_MODE'),
            'PAYMENT_DATE'=>$request->get('PAYMENT_DATE'),
            'RETURN_PMEMAIL'=>$request->get('RETURN_PMEMAIL'),
            'RETURN_TPHONE'=> $request->get('RETURN_TPHONE'),
            'RETURN_COMMISSTYPE' => $request->get('RETURN_COMMISSTYPE'),
            'RETURN_TYPE' => $request->get('RETURN_TYPE'),
            'RETURN_HASH'=>$request->get('RETURN_HASH')

        ]);
        $item->save();
        if ($request->get('RETURN_RESULT') ==20) {
          $polya = Alltovars::where('idzakas',$request->get('RETURN_CLIENTORDER'))->first();
          $idzakas = $polya->idzakas;
          $promokod = $polya->promo;
          if ($idzakas == $request->get('RETURN_CLIENTORDER')) {
            $name = $polya->name;
            $adres = $polya->adres;
            $sena = $polya->sena;
            $email = $polya->email;
            $tovars = $polya->tovars;
            $item = new Zakaz([
                "name"=>$name,
                "adres"=> $adres,
                "sena"=> $sena,
                'tovars'=> $tovars,
                "status"=>0
            ]);
            $item->save();
            $id = $item->id;

            if($promokod ==null){

                do  {
                    $randomnum = mt_rand(1000, 9999);
                    $items = Promo::where('promo', $randomnum)->get();
                        }while(count($items) != 0);
                
                $item = new Promo([
                    "promo"=>$randomnum,
                    "timer"=>$idzakas,
    
                ]);
                $item->save();
    
            }else{
                $items = Promo::where('promo', $promokod)->delete();

                $randomnum = "Ваш промокод успешно использован!";
            }

            $data =[
                "tomars"=>$tovars,
                "promo"=>$randomnum,
                "id"=>$id,
            ];
            $email2 = $polya->email;
            session(['email2' => $email2]);

            Mail::send('zakazkli',$data,  function ($message) {
              $email2 = session('email2');

                $message->to($email2, 'Ваш заказ с сайта don-simon.kz')->subject('Ваш заказ с сайта don-simon.kz');
               $message->from('zakaz@don-simon.kz','Ваш заказ с сайта don-simon.kz');
            });


            $data2 =[
                "tomars"=>$tovars,
                "name"=>$name,
                "adres"=>$adres,
                "sena"=>$sena,
                "id"=>$id,
                "order"=>$idzakas,
            ];

            Mail::send('mail',$data2,  function ($message) {
                $message->to('zakaz@megabar.kz', 'Новый заказ с сайта don-simon.kz')->subject('Новый заказ с сайта don-simon.kz');
                $message->from('zakaz@megabar.kz','Новый заказ с сайта don-simon.kz');
            });
           
          }else {
          echo "OK";
          }

        }

  
        echo "OK";
    }
    public function paygood(Request $request){
        if ($request->session()->has('timeorder')) {
          $polya = Alltovars::where('idzakas',session('timeorder'))->first();
          $idzakas = $polya->idzakas;
          if (session('timeorder')==$idzakas) {
             $order = Order::where('RETURN_CLIENTORDER',$idzakas)->get();
             if (count($order)>0) {
                $promoview = Promo::where('timer', $idzakas)->get();
                $prom =Promo::where('timer', $idzakas)->first();
                if(count($promoview) >0){
                    $email = $prom->promo;
                }else{
                    $email ="Ваш промокод успешно использован!";
                }
               
               $request->session()->flush();
               return view('end', ['promo' => $email]);
             }else {
               return redirect('http://don-simon.kz/home');

             }

          }else {
              return redirect('http://don-simon.kz/home');
          }

        }else{
           return redirect('http://don-simon.kz/home');
        }

    }
    public function payfail(){
        return redirect('http://don-simon.kz/home');
    }
    public function promo(Request $request){
        $promo = $request->get('promo');

        $items = Promo::where('promo', $promo)->get();
        $items2 = Promo::where('promo', $promo)->first();

        if (count($items)>0){
            $id = $items2->promo;
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
