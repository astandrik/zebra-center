angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!doctype html>\r\n<html class=\"no-js\">\r\n  <head>\r\n      <base href=\"/\" />\r\n      <meta charset=\"utf-8\">\r\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\r\n      <title ng-bind=\"pageTitle\"></title>\r\n      <meta name=\"description\" content=\"\">\r\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n      <!--[if lt IE 9]>\r\n         <script src=\"http://html5shiv.googlecode.com/svn/trunk/html5.js\"></script>\r\n      <![endif]-->\r\n      <script src=\"//cdn.ckeditor.com/4.5.9/full/ckeditor.js\"></script>\r\n      <script src=\"https://code.jquery.com/jquery-1.12.4.min.js\"></script>\r\n      <script src=\"https://use.fontawesome.com/1e4fa77add.js\"></script>\r\n      <script src=\"vendors/jquery.gridster.min.js\"></script>\r\n      <link rel=\"stylesheer\" href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css\">\r\n      <link rel=\"stylesheet\" href=\"vendors/jquery.gridster.min.css\">\r\n      <link rel=\"stylesheet\" href=\"css/styles/main.css\">\r\n\r\n  </head>\r\n  <body>\r\n      <div class=\"global\">\r\n        <header-directive></header-directive>\r\n        <navbar-directive></navbar-directive>\r\n        <section id=\"page\">\r\n            <sidebar-directive></sidebar-directive>\r\n            <div ui-view=\"content\" class=\"content\"></div>\r\n        </section>\r\n      </div>\r\n      <script src=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js\"></script>\r\n      <script src=\"js/main.js\"></script>\r\n  </body>\r\n</html>\r\n");
$templateCache.put("views/components/footer.html","<footer>\r\n<!-- нижнее меню - дубль верхнего -->\r\n	<ul class=\"bottom_menu\">\r\n<li><a href=# >Главная</a></li>\r\n<li><a href=# >Команда</a></li>\r\n<li><a href=# >Благодарности</a></li>\r\n<li><a href=# >Сотрудничество</a></li>\r\n<li><a href=# >Книги</a></li>\r\n<li><a href=# >Карта сайта</a></li>\r\n<li><a href=# >Финансирование</a></li>\r\n<li><a href=# >Контакты</a></li>\r\n	</ul>\r\n\r\n<p><br />© Реабилитационный благотворительный фонд «Зебра и К».<br />\r\n При цитировании и копировании материалов сайта ссылка на первоисточник обязательна.<br />\r\n Отзывы, замечания и предложения по сайту <u>пишите админу</u> сайта</p>\r\n	  </footer>\r\n");
$templateCache.put("views/components/header.html","<header>\r\n  <div class=\"logo\">\r\n    <a href=\"#\" title=\"Перейти на Главную\"><img src=\"images/logo07f2.png\" width=\"580\" height=\"150\" alt=\"images/logo07.png\"></a>\r\n  </div>\r\n</header>\r\n");
$templateCache.put("views/components/navbar.html","<nav class=\"clearfix navbar\">\r\n		<ul class=\"clearfix\">\r\n            <li><a ng-click=\"addArticle()\">Добавить статью</a></li>\r\n			<li><a href=\"/\">Главная</a></li>\r\n			<!--<li><a href=\"#\">Команда</a></li>\r\n			<li><a href=\"#\">Благодарности</a></li>\r\n			<li><a href=\"#\">Книги</a></li>\r\n            	<li><a href=\"#\">Сотрудничество</a></li>\r\n			<li><a href=\"#\">Карта сайта</a></li>\r\n			<li><a href=\"#\">Финансирование</a></li>\r\n			<li><a href=\"#\">Контакты</a></li>-->\r\n		</ul>\r\n		<a href=\"#\" id=\"pull\">Меню</a>\r\n</nav>\r\n");
$templateCache.put("views/components/sidebar.html","<!DOCTYPE html>\r\n<html>\r\n<head>\r\n    <title></title>\r\n</head>\r\n<body>\r\n    <aside>\r\n        <div class=\"search\" title=\"Имитатор модуля поиска\">\r\n            <i>Поиск по сайту...</i>\r\n        </div><!-- ************* блок аккордеон ******************* -->\r\n        <!-- Если нужно чтобы рубрика не закрывалась, надо: -->\r\n        <!-- div class=\"info\" style=\"display: block;\" -->\r\n        <div class=\"accordion\">\r\n            <section class=\"accordion_item\">\r\n                <h3 class=\"title_block\"><a href=\'/Drafts\'>Черновики</a></h3>\r\n                <!--<h3 class=\"title_block\">Проблема и решение</h3>\r\n                <div class=\"info\">\r\n                    <p class=\"info_item\">Комментарий к рубрике</p>\r\n                    <ul>\r\n                        <li>\r\n                            <a href=\"#\">Наркомания и алкоголизм</a>\r\n                        </li>\r\n                        <li>\r\n                            <a href=\"#\">Концепция болезни</a>\r\n                        </li>\r\n                        <li>\r\n                            <a href=\"#\">Выздоровление</a>\r\n                        </li>\r\n                        <li>\r\n                            <a href=\"#\">Программа «12 шагов»</a>\r\n                        </li>\r\n                    </ul>\r\n                </div>-->\r\n            </section>\r\n            <!--<section class=\"accordion_item\">\r\n                <h3 class=\"title_block\">Центр «Зебра»</h3>\r\n                <div class=\"info\">\r\n                    <ul>\r\n                        <li>\r\n                            <a href=\"#\">{{title}}</a>\r\n                        </li>\r\n                    </ul>\r\n                </div>\r\n            </section>-->\r\n            <section class=\"accordion_item\">\r\n                <h3 class=\"title_block\">Координаты</h3>\r\n                <div class=\"info\">\r\n                    <b>Адрес центра:</b><br>\r\n                    Москва, 117186, ул.Нагорная, д.9, корп.2.<br>\r\n                    <br>\r\n                    <b>Проезд:</b><br>\r\n                    <span style=\"font-size: 11px;\">ст. м. Нагорная, далее\r\n                    пешком или маршрутка №746;<br>\r\n                    ст. м. Профсоюзная, автобус №44 или маршрутки №414, 698 до\r\n                    ост. &laquo;Колледж МЧС (№38)&raquo;</span><br>\r\n                    <!-- Всплывающая карта района!!! -->\r\n                    <a href=\"javascript:void(0)\" onclick=\r\n                    \"document.getElementById(\'parent_popup_click\').style.display=\'block\';\"\r\n                    title=\"Посмотреть карту\">Карта района</a>\r\n                    <div id=\"parent_popup_click\">\r\n                        <div id=\"popup_click\">\r\n                            <img height=\"746\" src=\"images/map4.png\" title=\r\n                            \"От метро Нагорная до \'Зебры\' ходу минут 15-20\"\r\n                            width=\"890\"> <a class=\"close\" onclick=\r\n                            \"document.getElementById(\'parent_popup_click\').style.display=\'none\';\"\r\n                            title=\"Закрыть\">X</a>\r\n                        </div>\r\n                    </div><br>\r\n                    <br>\r\n                    <b>Телефоны:</b><br>\r\n                    8 (925) 545-7236<br>\r\n                    8 (499) 127-3988<br>\r\n                    <br>\r\n                    Директор Фонда и руководитель Центра: Савина Екатерина\r\n                    Алексеевна<br>\r\n                    <b>E-mail:</b> <a href=\r\n                    \"mailto:katjasavina@mail.ru\">katjasavina@mail.ru</a>\r\n                </div>\r\n            </section><!-- конец координат -->\r\n            <section class=\"accordion_item\">\r\n                <h3 class=\"title_block\">Наши друзья</h3>\r\n                <div class=\"info\">\r\n                    <p class=\"info_item\"></p><!--  код баннеров -->\r\n                    <div style=\"text-align:center;\">\r\n                        <a href=\"http://alter-ekb.ru/\" target=\r\n                        \"_blank\"><img height=\"67\" src=\r\n                        \"../images/logo-grey2.png\" style=\r\n                        \"border: 1px solid #E2E2E2; padding: 4px;\" title=\r\n                        \"Центр социальной адаптации Альтернатива\" width=\r\n                        \"180\"></a> <a href=\r\n                        \"http://www.%D1%86%D0%B5%D0%BD%D1%82%D1%80-%D0%BC%D0%BE%D1%81%D1%82.%D1%80%D1%84/\"\r\n                        target=\"_blank\" title=\r\n                        \"Реабилитация наркоманов, алкоголиков и игроманов...\"><img height=\"20\"\r\n                        src=\"../images/logo-most_180x20.png\" style=\r\n                        \"border: 1px solid #E2E2E2; padding: 4px;\" width=\r\n                        \"180\"></a> <a href=\"http://www.metanoia.msdm.ru/\"\r\n                        target=\"_blank\"><img alt=\"баннер Метанойи\" height=\"31\"\r\n                        src=\"../images/metanoia_banner.jpg\" style=\r\n                        \"margin-top: 4px;\" title=\r\n                        \"Православный центр помощи Метанойя\" width=\"88\"></a>\r\n                    </div>\r\n                </div>\r\n            </section>\r\n            <section class=\"accordion_item\">\r\n                <h3 class=\"title_block\">Сертификат</h3>\r\n                <div class=\"info\" style=\r\n                \"display: block; text-align: center; padding: 5px;\"><img alt=\"\"\r\n                src=\"images/Sertificat.jpg\" style=\r\n                \"max-width: 100%; height: auto;\" title=\r\n                \"Сертификат Москвы\"></div>\r\n            </section>\r\n        </div><!-- конец блока аккордеон -->\r\n        <!-- Имитация счётчика, ТИЦ и соц - заменится статическим кодом -->\r\n        <div style=\"text-align:center; margin-top: 1em;\"><img alt=\"\" height=\r\n        \"76\" src=\"images/Zebra-banner.jpg\" style=\r\n        \"display: block; margin: 1em auto;\" title=\"Давайте меняться баннерами!\"\r\n        width=\"190\"> <img alt=\"metrics.png\" height=\"105\" src=\r\n        \"images/metrics.png\" title=\"Имитация счётчика посещений\" width=\r\n        \"106\"></div><!-- Если на странице используется галерея, то здесь скрипт отключить! -->\r\n        <!--    <script src=\"FancyBox-v2.1.5/lib/jquery-1.10.1.min.js\"></script> -->\r\n    </aside>\r\n</body>\r\n</html>");
$templateCache.put("views/directives/content.html","\r\n			<!--     статьи       -->\r\n<div id=\"articles\">\r\n\r\n\r\n</div> <!-- articles end -->\r\n");
$templateCache.put("views/directives/example.html","<div class=\"example-directive\">\r\n  <h1>Directive title: {{title}}</h1>\r\n  <p>This is an example of a directive, click me!</p>\r\n</div>\r\n");
$templateCache.put("js/Routes/Articles/addArticle.html","<ng-md-icon icon=\"close\" size=30 style=\"float:right\" ng-click=\"close()\"></ng-md-icon>\r\n<div class=\"form-group\">\r\n    <label>Раздел</label>\r\n    <select ng-model=\"directory\" ng-options=\"item.id as item.name for item in directories\"></select>\r\n</div>\r\n<div class=\"form-group\">\r\n  <label>Заголовок статьи</label>\r\n  <input class=\'form-control\' ng-keyup=\'changeAlias()\'  style=\'margin:10px 0; text-align:center\' type=\'text\' ng-model=\'article.header\'></input>\r\n</div>\r\n<div class=\"form-group\">\r\n  <label>Заголовок в браузере</label>\r\n  <input class=\'form-control\' style=\'margin:10px 0; text-align:center\' type=\'text\' ng-model=\'article.title\'></input>\r\n</div>\r\n<div class=\"form-group\">\r\n  <label>Алиас</label>\r\n  <input class=\'form-control\' style=\'margin:10px 0; text-align:center\' type=\'text\' ng-model=\'article.alias\'></input>\r\n</div>\r\n<div class=\"form-group\">\r\n  <label for=\"usr\">Ключевые слова</label>\r\n  <input type=\"text\" class=\"form-control\" ng-model=\"article.keywords\" id=\"usr\">\r\n</div>\r\n<div class=\"form-group\">\r\n  <label for=\"usr\">Описание статьи</label>\r\n  <input type=\"text\" class=\"form-control\" ng-model=\"article.description\" id=\"usr\">\r\n</div>\r\n<div class=\"form-group\">\r\n  <label>Аннотация</label>\r\n  <div ckeditor=\"options\" ng-model=\"article.annotation\" ></div>\r\n</div>\r\n<div class=\"form-group\">\r\n  <label>Текст статьи</label>\r\n  <div ckeditor=\"options\" ng-model=\"article.text\" ></div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"btn-group addedit-buttons\" role=\"group\" aria-label=\"...\">\r\n    <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Отменить</button>\r\n    <button type=\"button\" class=\"btn btn-default\" ng-click=\"save()\">Добавить</button>\r\n  </div>\r\n</div>\r\n");
$templateCache.put("js/Routes/Articles/articles.html","<div class=\"articles\">\r\n  <article-template data=\"art\" is-short=\"true\" ng-repeat=\"art in articles | orderBy:\'-id\'\"></article-template>\r\n</div>\r\n");
$templateCache.put("js/Routes/Articles/singleArticle.html","<div class=\"articles\">\r\n    <article-template data=\"article\"></article-template>\r\n<div>");
$templateCache.put("js/Routes/Home/home.html","<div class=\"articles\">\r\n  <ng-md-icon icon=\"add\" size=\"45\" class=\"add-article\" ng-click=\"addArticle()\"></ng-md-icon>\r\n  <article-template data=\"art\" ng-repeat=\"art in articles | orderBy:\'-id\'\"></article-template>\r\n</div>");}]);