<!doctype html>
<html lang="ru">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.2.0/css/all.css" integrity="sha384-hWVjflwFxL6sNzntih27bfxkr27PmbbK/iSvJ+a4+0owXq79v+lsFkW54bOGbiDQ" crossorigin="anonymous">

        <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
        <link rel="shortcut icon" href="/img/vdf-logo2.png" type="image/png">

        <script>
            new WOW().init();
        </script>

        <title>
            DON SIMON
        </title>

    </head>
    <body>
        <div id="root"></div>
        <script src="{{mix('js/app.js')}}" ></script>

    </body>
</html>
