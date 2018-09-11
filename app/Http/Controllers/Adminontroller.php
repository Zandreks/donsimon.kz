<?php

namespace App\Http\Controllers;

use App\Category;
use App\Skidka;
use App\Tovars;
use App\User;
use App\Zakaz;
use Illuminate\Http\Request;

class Adminontroller extends Controller
{
    public function index(){
        return view('admin');
    }
    public function showtovar(){
        $items= Tovars::all();
        return response()->json($items);

    }
    public function deltovar(Request $request){
        $id = $request->get('id');
        $tovar = Tovars::find($id);
        $tovar->delete();
        return response()->json("Удален");
    }
    public function category(){
        $items = Category::all();
        return response()->json($items);
    }
    public function delcategory(Request $request){
        $id = $request->get('id');
        $category = Category::find($id);
        $category->delete();
        return response()->json("Удален");
    }
    public function addtovar(Request $request){
        $title = $request->get('title');
          if($request->get('file'))
        {
           $nameimage = array();
            $images = $request->get('file');
            foreach ($images as  $key => $image) {
                $name = time().$key.'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                $nameimage[]= $name;
                \Image::make($image)->save(public_path('/img/sokis/').$name);
            }

            $img = implode(" ", $nameimage);
        }
        $item = new Tovars([
            "title"=>$title,
            "articl"=> $request->get("art"),
            "proezvod"=> $request->get('proiz'),
            'cuntry'=> $request->get('count'),
            'obem'=> $request->get('ob'),
            'ypakovka'=> $request->get('yp'),
            'srok' => $request->get('srok'),
            'opisan'=>$request->get('text'),
            'sena'=> $request->get('sena'),
            'sena2'=> $request->get('sena2'),
            'kolichestvo' => $request->get('kol'),
            'sklad' => $request ->get('sklad'),
            'pozit'=>$request->get('pozit'),
            'id_category' => $request->get('cat'),
            "img"=>$img,


        ]);
        $item->save();
        return response()->json('Товар добвлен');
    }

    public function Edittovars(Request $request){
        $id = $request->get("id");
        $items = Tovars::find($id);
        return response()->json($items);
    }

    public function Edit(Request $request){
        $title = $request->get('title');
        if($request->get('file'))
        {
            $nameimage = array();
            $images = $request->get('file');
            foreach ($images as  $key => $image) {
                $name = time().$key.'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                $nameimage[]= $name;
                \Image::make($image)->save(public_path('/img/sokis/').$name);
            }

            $img = implode(" ", $nameimage);
        }

        $item= Tovars::find($request->get('id'));
        $item->title=$title;
        $item->articl=$request->get("art");
        $item->proezvod= $request->get('proiz');
        $item->cuntry=$request->get('count');
        $item->obem= $request->get('ob');
        $item->ypakovka=$request->get('yp');
        $item->srok=$request->get('srok');
        $item->opisan=$request->get('text');
        $item->sena=$request->get('sena');
        $item->sena2=$request->get('sena2');
        $item->kolichestvo=$request->get('kol');
        $item->sklad=$request->get('sklad');
        $item->id_category=$request->get('cat');
        $item->pozit=$request->get('pozit');
        $item->img=$img;
        $item->save();
        return response()->json('Товар изменен');
    }
    public function addcat(Request $request){
        $title = $request->get('title');
        if($request->get('file'))
        {
            $nameimage = array();
            $images = $request->get('file');
            foreach ($images as  $key => $image) {
                $name = time().$key.'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                $nameimage[]= $name;
                \Image::make($image)->save(public_path('/img/sokis/').$name);
            }

            $img = implode(" ", $nameimage);
        }
        $item = new Category([
            "title"=>$title,
            "img"=>$img,


        ]);
        $item->save();
        return response()->json('Добвлено');
    }
    public function Editcat(Request $request){
        $id = $request->get("id");
        $items = Category::find($id);
        return response()->json($items);
    }
    public function Editcate(Request $request){
        $title = $request->get('title');
        if($request->get('file'))
        {
            $nameimage = array();
            $images = $request->get('file');
            foreach ($images as  $key => $image) {
                $name = time().$key.'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                $nameimage[]= $name;
                \Image::make($image)->save(public_path('/img/sokis/').$name);
            }

            $img = implode(" ", $nameimage);
        }

        $item= Category::find($request->get('id'));
        $item->title=$title;
        $item->img=$img;
        $item->save();
        return response()->json('Категория изменена');
    }
    public function ser(Request $request){
        $ser = $request->get('ser');
        $items =Tovars::where('title', 'like', "%".$ser."%")
            ->get();
        return response()->json($items);
    }
    public function zakas() {
        $items= Zakaz::orderBy("id","DESC")->paginate(5);
        return response()->json($items);

    }
    public function addskid(Request $request){
        $int = $request->get('int');
        $time = $request->get('time');
        $day = $time *86400 ;
        $item = Skidka::find(1);
        $item->skid=$int;
        $item->time=$day;
        $item->save();
        return response()->json('Скидка изменена');

    }
    public function editskid (){
        $items = Skidka::find(1);
        return response()->json($items);
    }
    public function stat(Request $request){
        $id = $request->get('id');
        $stat = $request->get('stat');
        $item = Zakaz::find($id);
        $item->status=$stat;
        $item->save();
        return response()->json("ok");

    }
    public function sort (Request $request){
        $sort = $request->get('sort');
        $items = Zakaz::where('status',$sort)->orderBy("id","DESC")->get();
        return response()->json($items);
    }
    public function sortdata (Request $request){
        $sort = $request->get('sort');
        $items =Zakaz::where('created_at', 'like', "%".$sort."%")->orderBy("id","DESC")
            ->get();
        return response()->json($items);
    }
    public function users(){
        $items = User::all();
        return response()->json($items);
    }
    public function usersok(Request $request){
        $id = $request->get('id');
        $item = User::find($id);
        $item->verified=true;
        $item->save();
        return response()->json("ok");
    }
    public function usersdel(Request $request){
        $id = $request->get('id');
        $item = User::find($id);
        $item->verified=true;
        $item->delete();
        return response()->json("ok");
    }

}
