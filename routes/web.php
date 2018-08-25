<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/home{path?}', [
    'uses' => 'HomeController@index',
    'where' => ['path' => '.*']
]);
Route::get("/", function (){
  return redirect("/home");
});
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::post("/home",'HomeController@showcategory');
Route::post("/idtovar",'HomeController@showcategoryid');
Route::post("/categoryname",'HomeController@categoryname');
Route::post("/tovar",'HomeController@showtovarcategoryindex');
Route::post("/ser",'HomeController@ser');
Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');
Route::get("/pay",'HomeController@pay');

Route::post("/savepay",'HomeController@savepay');
Route::post("/payok",'HomeController@payok');
Route::get("/paygood",'HomeController@paygood');
Route::get("/payfail",'HomeController@payfail');
Route::post("/promo",'HomeController@promo');

Route::post("/skid",'HomeController@skid');


Route::group(['prefix' => 'admin',  'middleware' => 'auth'], function()
{
    Route::get('/{path?}',[
    'uses' => 'Adminontroller@index',
    'where' => ['path' => '.*'] ]);
    Route::post("/index","Adminontroller@showtovar");
    Route::post("/deltovar","Adminontroller@deltovar");
    Route::post("/category","Adminontroller@category");
    Route::post("/delcategory","Adminontroller@delcategory");
    Route::post("/addtovar","Adminontroller@addtovar");
    Route::post("/edittovar","Adminontroller@Edittovars");
    Route::post("/edit","Adminontroller@Edit");
    Route::post("/addcat","Adminontroller@addcat");
    Route::post("/editcat","Adminontroller@Editcat");
    Route::post("/editcae","Adminontroller@Editcate");
    Route::post("/ser",'Adminontroller@ser');
    Route::post("/zakas",'Adminontroller@zakas');
    Route::post("/addskid",'Adminontroller@addskid');
    Route::post("/editskid",'Adminontroller@editskid');
    Route::post("/stat",'Adminontroller@stat');
    Route::post("/sort",'Adminontroller@sort');
    Route::post("/sortdata",'Adminontroller@sortdata');
    Route::post("/users",'Adminontroller@users');
    Route::post("/usersok",'Adminontroller@usersok');
    Route::post("/usersdel",'Adminontroller@usersdel');
});