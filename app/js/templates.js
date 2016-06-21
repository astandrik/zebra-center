angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!doctype html>\r\n<html class=\"no-js\">\r\n  <head>\r\n      <base href=\"/\" />\r\n      <meta charset=\"utf-8\">\r\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\r\n      <title ng-bind=\"pageTitle\"></title>\r\n      <meta name=\"description\" content=\"\">\r\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\r\n      <!--[if lt IE 9]>\r\n         <script src=\"http://html5shiv.googlecode.com/svn/trunk/html5.js\"></script>\r\n      <![endif]-->\r\n      <script src=\"https://code.jquery.com/jquery-1.12.4.min.js\"></script>\r\n      <link rel=\"stylesheet\" href=\"css/styles/main.css\">\r\n  </head>\r\n  <body>\r\n      <div class=\"global\">\r\n        <header-directive></header-directive>\r\n        <navbar-directive></navbar-directive>\r\n        <section id=\"page\">\r\n            <sidebar-directive></sidebar-directive>\r\n            <div ui-view=\"content\"></div>\r\n        </section>\r\n      </div>\r\n      <script src=\"js/main.js\"></script>\r\n  </body>\r\n</html>\r\n");
$templateCache.put("views/components/footer.html","<footer>\r\n<!-- нижнее меню - дубль верхнего -->\r\n	<ul class=\"bottom_menu\">\r\n<li><a href=# >Главная</a></li>\r\n<li><a href=# >Команда</a></li>\r\n<li><a href=# >Благодарности</a></li>\r\n<li><a href=# >Сотрудничество</a></li>\r\n<li><a href=# >Книги</a></li>\r\n<li><a href=# >Карта сайта</a></li>\r\n<li><a href=# >Финансирование</a></li>\r\n<li><a href=# >Контакты</a></li>\r\n	</ul>\r\n\r\n<p><br />© Реабилитационный благотворительный фонд «Зебра и К».<br />\r\n При цитировании и копировании материалов сайта ссылка на первоисточник обязательна.<br />\r\n Отзывы, замечания и предложения по сайту <u>пишите админу</u> сайта</p>\r\n	  </footer>\r\n");
$templateCache.put("views/components/header.html","<header>\r\n  <div class=\"logo\">\r\n    <a href=\"#\" title=\"Перейти на Главную\"><img src=\"images/logo07f2.png\" width=\"580\" height=\"150\" alt=\"images/logo07.png\"></a>\r\n  </div>\r\n</header>\r\n");
$templateCache.put("views/components/navbar.html","<nav class=\"clearfix\">\r\n		<ul class=\"clearfix\">\r\n			<li><a href=\"#\">Главная</a></li>\r\n			<li><a href=\"#\">Команда</a></li>\r\n			<li><a href=\"#\">Благодарности</a></li>\r\n			<li><a href=\"#\">Книги</a></li>\r\n            	<li><a href=\"#\">Сотрудничество</a></li>\r\n			<li><a href=\"#\">Карта сайта</a></li>\r\n			<li><a href=\"#\">Финансирование</a></li>\r\n			<li><a href=\"#\">Контакты</a></li>\r\n		</ul>\r\n		<a href=\"#\" id=\"pull\">Меню</a>\r\n</nav>\r\n");
$templateCache.put("views/components/sidebar.html","		<aside>\r\n<div class=\"search\" title=\"Имитатор модуля поиска\"><i>Поиdsfdsfск по сайту...</i></div>\r\n\r\n<!-- ************* блок аккордеон ******************* -->\r\n\r\n<!-- Если нужно чтобы рубрика не закрывалась, надо: -->\r\n<!-- div class=\"info\" style=\"display: block;\" -->\r\n\r\n		<div class=\"accordion\">\r\n   <section class=\"accordion_item\">\r\n      <h3 class=\"title_block\">Проблема и решение</h3>\r\n        <div class=\"info\">\r\n          <p class=\"info_item\">Комментарий к рубрике</p>\r\n<ul>\r\n	<li><a href=# >Наркомания и алкоголизм</a></li>\r\n	<li><a href=# >Концепция болезни</a></li>\r\n	<li><a href=# >Выздоровление</a></li>\r\n	<li><a href=# >Программа «12 шагов»</a></li>\r\n</ul>\r\n		</div>\r\n			</section>\r\n\r\n    <section class=\"accordion_item\">\r\n       <h3 class=\"title_block\">Центр «Зебра»</h3>\r\n		<div class=\"info\">\r\n<ul>\r\n	<li ng-repeat=\"title in zebraCenter\"><a href=# >{{title}}</a></li>\r\n</ul>\r\n		</div>\r\n	</section>\r\n\r\n		<section class=\"accordion_item\">\r\n  <h3 class=\"title_block\">Координаты</h3>\r\n	<div class=\"info\">\r\n\r\n<b>Адрес центра:</b><br>\r\n  Москва, 117186, ул.Нагорная, д.9, корп.2.<br>\r\n  <br>\r\n  <b>Проезд:</b><br>\r\n  <span style=\"font-size: 11px;\">ст. м. Нагорная, далее пешком или маршрутка №746;<br>\r\n  ст. м. Профсоюзная, автобус №44 или маршрутки №414, 698 до ост. &laquo;Колледж МЧС (№38)&raquo;</span><br>\r\n\r\n<!-- Всплывающая карта района!!! -->\r\n<a href=\"javascript:void(0)\" title=\"Посмотреть карту\"  onclick=\"document.getElementById(\'parent_popup_click\').style.display=\'block\';\">Карта района</a>\r\n\r\n	<div id=\"parent_popup_click\">\r\n<div id=\"popup_click\">\r\n<img src=\"images/map4.png\" width=\"890\" height=\"746\" title=\"От метро Нагорная до \'Зебры\' ходу минут 15-20\">\r\n    <a class=\"close\" title=\"Закрыть\" onclick=\"document.getElementById(\'parent_popup_click\').style.display=\'none\';\">X</a>\r\n</div>\r\n	</div>\r\n\r\n<br><br>\r\n<b>Телефоны:</b><br>\r\n  8 (925) 545-7236<br>\r\n  8 (499) 127-3988<br><br>\r\n\r\nДиректор Фонда и руководитель Центра: Савина Екатерина Алексеевна<br>\r\n  <b>E-mail:</b> <a href=\"mailto:katjasavina@mail.ru\">katjasavina@mail.ru</a>\r\n\r\n\r\n	</div>\r\n		</section><!-- конец координат -->\r\n\r\n		<section class=\"accordion_item\">\r\n    <h3 class=\"title_block\">Наши друзья</h3>\r\n     <div class=\"info\">\r\n          <p class=\"info_item\"></p>\r\n<!--  код баннеров -->\r\n	<div style=\"text-align:center;\">\r\n<a href=\"http://alter-ekb.ru/\" target=\"_blank\"><img src=\"../images/logo-grey2.png\" title=\"Центр социальной адаптации Альтернатива\" width=\"180\" height=\"67\" style=\"border: 1px solid #E2E2E2; padding: 4px;\"></a>\r\n\r\n<a href=\"http://www.центр-мост.рф/\" target=\"_blank\" title=\"Реабилитация наркоманов, алкоголиков и игроманов...\"><img src=\"../images/logo-most_180x20.png\" width=\"180\" height=\"20\" style=\"border: 1px solid #E2E2E2; padding: 4px;\"></a>\r\n\r\n<a href=\"http://www.metanoia.msdm.ru/\" mce_href=\"http://www.metanoia.msdm.ru/\" target=\"_blank\"><img src=\"../images/metanoia_banner.jpg\" alt=\"баннер Метанойи\" title=\"Православный центр помощи Метанойя\" width=\"88\" height=\"31\" style=\"margin-top: 4px;\"></a>\r\n	</div>\r\n      </div>\r\n		</section>\r\n\r\n		<section class=\"accordion_item\">\r\n    <h3 class=\"title_block\">Сертификат</h3>\r\n     <div class=\"info\" style=\"display: block; text-align: center; padding: 5px;\">\r\n<img src=\"images/Sertificat.jpg\" alt=\"\" title=\"Сертификат Москвы\" style=\"max-width: 100%; height: auto;\">\r\n      </div>\r\n		</section>\r\n\r\n	</div>    <!-- конец блока аккордеон -->\r\n\r\n<!-- Имитация счётчика, ТИЦ и соц - заменится статическим кодом -->\r\n	<div style=\"text-align:center; margin-top: 1em;\">\r\n\r\n\r\n<img src=\"images/Zebra-banner.jpg\" width=\"190\" height=\"76\" alt=\"\" title=\"Давайте меняться баннерами!\" style=\"display: block; margin: 1em auto;\">\r\n<img src=\"images/metrics.png\" width=\"106\" height=\"105\" alt=\"metrics.png\" title=\"Имитация счётчика посещений\">\r\n	</div>\r\n\r\n    <!-- Если на странице используется галерея, то здесь скрипт отключить! -->\r\n    <!--	<script src=\"FancyBox-v2.1.5/lib/jquery-1.10.1.min.js\"></script> -->\r\n\r\n\r\n\r\n			</aside>\r\n");
$templateCache.put("views/directives/content.html","\r\n			<!--     статьи       -->\r\n<div id=\"articles\">\r\n\r\n\r\n</div> <!-- articles end -->\r\n");
$templateCache.put("views/directives/example.html","<div class=\"example-directive\">\r\n  <h1>Directive title: {{title}}</h1>\r\n  <p>This is an example of a directive, click me!</p>\r\n</div>\r\n");
$templateCache.put("js/Routes/Articles/articles.html","<div class=\"articles\">\r\n  <article-template data=\"art\" ng-repeat=\"art in articles\"></article-template>\r\n</div>\r\n");}]);