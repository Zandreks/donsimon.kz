<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="shortcut icon" href="/img/vdf-logo2.png" type="image/png">


    <title>
        Спасибо за покупку
    </title>
    <style>
        .end{
            text-align: center;
            
        }
        .end p{
            font-size: 18px;
        }
        .end span{
            color: red;
        }
    </style>

</head>
<body>
    <div class="end">
        <h2>Спасибо за покупку</h2>
        <p>Ваш промокод для следующей покупки со скидкой <span>{{$promo}}</span> сохраните его<br><a href="http://don-simon.kz/home">Вернуться в магазин </a></p>
    </div>
<script>
    localStorage.clear();

</script>
</body>
</html>
