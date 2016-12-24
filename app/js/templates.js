angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("index.html","<!doctype html>\n<html class=\"no-js\">\n  <head>\n      <base href=\"/\" />\n      <meta charset=\"utf-8\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge,chrome=1\">\n      <meta name=\"fragment\" content=\"!\"> \n      <title ng-bind=\"pageTitle\"></title>\n      <meta name=\"description\" content=\"\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n      <!--[if lt IE 9]>\n         <script src=\"http://html5shiv.googlecode.com/svn/trunk/html5.js\"></script>\n      <![endif]-->\n      <link rel=\"stylesheet\" href=\"vendors/angular-gridster.min.css\">\n      <link rel=\"stylesheet\" href=\"vendors/angular-ui-tree.min.css\">\n      <link rel=\"stylesheet\" href=\"css/styles/main.css\">\n  </head>\n  <body>\n      <div class=\"global\">\n        <header-directive></header-directive>\n        <navbar-directive enable-editing=\"enableEditing\"></navbar-directive>\n        <section id=\"page\">\n            <sidebar-directive enable-editing=\"enableEditing\"></sidebar-directive>\n            <div ui-view=\"content\" class=\"content\"></div>\n        </section>\n      </div>\n      <script src=\"http://code.jquery.com/jquery-1.12.4.min.js\"></script>\n      <script src=\"//cdn.ckeditor.com/4.5.9/full/ckeditor.js\"></script>\n      <script src=\"http://use.fontawesome.com/1e4fa77add.js\"></script>\n      <script src=\"vendors/jquery.resize.js\"></script>\n      <script src=\"vendors/jquery.mousewheel-3.0.6.pack.js\"></script>\n      <script src=\"vendors/jquery.fancybox.pack.js\"></script>\n      <script src=\"vendors/jquery.fancybox-buttons.js\"></script>\n      <script src=\"vendors/jquery.fancybox-media.js\"></script>\n      <script src=\"vendors/jquery.fancybox-thumbs.js\"></script>\n      <script src=\"js/main.js\"></script>\n  </body>\n</html>\n");
$templateCache.put("views/components/adminLogin.html","<div class=\"form-group\" style=\"display: flex; flex-direction:row\">\n  <label for=\"usr\" class=\"col-sm-2\">Логин</label>\n  <input type=\"text\" class=\"form-control col-sm-8 col-sm-offset-1\"   ng-model=\"name\" id=\"usr\">\n</div>\n<div class=\"form-group\" style=\"display: flex; flex-direction:row\">\n  <label for=\"usr\"  class=\"col-sm-2\">Пароль</label>\n  <input type=\"password\" class=\"form-control col-sm-8 col-sm-offset-1\" ng-model=\"password\" id=\"usr\">\n</div>\n<div class=\"row\">\n  <div class=\"btn-group addedit-buttons\" role=\"group\" aria-label=\"...\">\n    <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Отменить</button>\n    <button type=\"button\" class=\"btn btn-primary\" ng-click=\"login()\">Войти</button>\n  </div>\n</div>");
$templateCache.put("views/components/footer.html","<footer>\n<!-- нижнее меню - дубль верхнего -->\n	<ul class=\"bottom_menu\">\n<li><a href=# >Главная</a></li>\n<li><a href=# >Команда</a></li>\n<li><a href=# >Благодарности</a></li>\n<li><a href=# >Сотрудничество</a></li>\n<li><a href=# >Книги</a></li>\n<li><a href=# >Карта сайта</a></li>\n<li><a href=# >Финансирование</a></li>\n<li><a href=# >Контакты</a></li>\n	</ul>\n\n<p><br />© Реабилитационный благотворительный фонд «Зебра и К».<br />\n При цитировании и копировании материалов сайта ссылка на первоисточник обязательна.<br />\n Отзывы, замечания и предложения по сайту <u>пишите админу</u> сайта</p>\n	  </footer>\n");
$templateCache.put("views/components/header.html","<header>\n  <div class=\"logo\">\n    <a href=\"#\" title=\"Перейти на Главную\"><img src=\"images/logo07f2.png\" width=\"580\" height=\"150\" alt=\"images/logo07.png\"></a>\n  </div>\n</header>\n");
$templateCache.put("views/components/navbar.html","<nav class=\"clearfix navbar\">\n		<ul class=\"clearfix\">\n            <li><a ng-click=\"addArticle()\" ng-show=\"$ctrl.enableEditing\">Добавить статью</a></li>\n			<li><a href=\"/\">Главная</a></li>\n            <li><a href=\"/Structure\" ng-show=\"$ctrl.enableEditing\">Структура сайта</a></li>\n			<!--<li><a href=\"#\">Команда</a></li>\n			<li><a href=\"#\">Благодарности</a></li>\n			<li><a href=\"#\">Книги</a></li>\n            	<li><a href=\"#\">Сотрудничество</a></li>\n			<li><a href=\"#\">Карта сайта</a></li>\n			<li><a href=\"#\">Финансирование</a></li>-->\n      <li style=\"float:right;border-left: 1px solid #7CBC0A;\" ng-show=\"!$ctrl.enableEditing\"><a ng-click=\"adminLogin()\">Вход для администратора</a></li>\n			<li style=\"float:right;border-left: 1px solid #7CBC0A;\" ng-show=\"$ctrl.enableEditing\"><a ng-click=\"adminLogout()\">Выход</a></li>\n		</ul>\n		<a href=\"#\" id=\"pull\">Меню</a>\n</nav>\n");
$templateCache.put("views/components/sidebar.html","<!DOCTYPE html>\n<html>\n<head>\n    <title></title>\n</head>\n<body>\n    <aside>\n        <div class=\"search\" title=\"Имитатор модуля поиска\">\n            <i>Поиск по сайту...</i>\n        </div>\n        <div class=\"accordion\">\n\n            <script type=\"text/ng-template\" id=\"section_renderer.html\">\n                <div ng-if=\"node.nodes.length == 0\">\n                    <a ng-href=\"/section/{{node.alias}}\"><h3 class=\"title_block no_children_block\" >{{node.title}}</h3></a>\n                </div>\n                <div ng-if=\"node.nodes.length > 0\">\n                    <h3 class=\"title_block\" >{{node.title}}</h3>\n                    <div class=\"info\">\n                        <ul>\n                            <li>\n                                <a ng-repeat=\"subnode in node.nodes\" ng-href=\"/section/{{subnode.alias}}\">{{subnode.title}}</a>\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </script>\n            <section class=\"accordion_item\" ng-repeat=\"node in nodes\" ng-include=\"\'section_renderer.html\'\">\n            </section>\n            <section class=\"accordion_item\" ng-show=\"$ctrl.enableEditing\">\n                <a href=\'/Drafts\'><h3 class=\"title_block no_children_block\">Черновики</h3></a>\n                <!--<h3 class=\"title_block\">Проблема и решение</h3>\n                <div class=\"info\">\n                    <p class=\"info_item\">Комментарий к рубрике</p>\n                    <ul>\n                        <li>\n                            <a href=\"#\">Наркомания и алкоголизм</a>\n                        </li>\n                        <li>\n                            <a href=\"#\">Концепция болезни</a>\n                        </li>\n                        <li>\n                            <a href=\"#\">Выздоровление</a>\n                        </li>\n                        <li>\n                            <a href=\"#\">Программа «12 шагов»</a>\n                        </li>\n                    </ul>\n                </div>-->\n            </section>\n            <!--<section class=\"accordion_item\">\n                <h3 class=\"title_block\">Центр «Зебра»</h3>\n                <div class=\"info\">\n                    <ul>\n                        <li>\n                            <a href=\"#\">{{title}}</a>\n                        </li>\n                    </ul>\n                </div>\n            </section>-->\n            <section class=\"accordion_item\">\n                <h3 class=\"title_block\">Координаты</h3>\n                <div class=\"info\">\n                    <b>Адрес центра:</b><br>\n                    Москва, 117186, ул.Нагорная, д.9, корп.2.<br>\n                    <br>\n                    <b>Проезд:</b><br>\n                    <span style=\"font-size: 11px;\">ст. м. Нагорная, далее\n                    пешком или маршрутка №746;<br>\n                    ст. м. Профсоюзная, автобус №44 или маршрутки №414, 698 до\n                    ост. &laquo;Колледж МЧС (№38)&raquo;</span><br>\n                    <!-- Всплывающая карта района!!! -->\n                    <a href=\"javascript:void(0)\" onclick=\n                    \"document.getElementById(\'parent_popup_click\').style.display=\'block\';\"\n                    title=\"Посмотреть карту\">Карта района</a>\n                    <div id=\"parent_popup_click\">\n                        <div id=\"popup_click\">\n                            <img height=\"746\" src=\"images/map4.png\" title=\n                            \"От метро Нагорная до \'Зебры\' ходу минут 15-20\"\n                            width=\"890\"> <a class=\"close\" onclick=\n                            \"document.getElementById(\'parent_popup_click\').style.display=\'none\';\"\n                            title=\"Закрыть\">X</a>\n                        </div>\n                    </div><br>\n                    <br>\n                    <b>Телефоны:</b><br>\n                    8 (925) 545-7236<br>\n                    8 (499) 127-3988<br>\n                    <br>\n                    Директор Фонда и руководитель Центра: Савина Екатерина\n                    Алексеевна<br>\n                    <b>E-mail:</b> <a href=\n                    \"mailto:katjasavina@mail.ru\">katjasavina@mail.ru</a>\n                </div>\n            </section><!-- конец координат -->\n            <section class=\"accordion_item\">\n                <h3 class=\"title_block\">Наши друзья</h3>\n                <div class=\"info\">\n                    <p class=\"info_item\"></p><!--  код баннеров -->\n                    <div style=\"text-align:center;\">\n                        <a href=\"http://alter-ekb.ru/\" target=\n                        \"_blank\"><img height=\"67\" src=\n                        \"../images/logo-grey2.png\" style=\n                        \"border: 1px solid #E2E2E2; padding: 4px;\" title=\n                        \"Центр социальной адаптации Альтернатива\" width=\n                        \"180\"></a> <a href=\n                        \"http://www.%D1%86%D0%B5%D0%BD%D1%82%D1%80-%D0%BC%D0%BE%D1%81%D1%82.%D1%80%D1%84/\"\n                        target=\"_blank\" title=\n                        \"Реабилитация наркоманов, алкоголиков и игроманов...\"><img height=\"20\"\n                        src=\"../images/logo-most_180x20.png\" style=\n                        \"border: 1px solid #E2E2E2; padding: 4px;\" width=\n                        \"180\"></a> <a href=\"http://www.metanoia.msdm.ru/\"\n                        target=\"_blank\"><img alt=\"баннер Метанойи\" height=\"31\"\n                        src=\"../images/metanoia_banner.jpg\" style=\n                        \"margin-top: 4px;\" title=\n                        \"Православный центр помощи Метанойя\" width=\"88\"></a>\n                    </div>\n                </div>\n            </section>\n            <section class=\"accordion_item\">\n                <h3 class=\"title_block\">Сертификат</h3>\n                <div class=\"info\" style=\n                \"display: block; text-align: center; padding: 5px;\"><img alt=\"\"\n                src=\"images/Sertificat.jpg\" style=\n                \"max-width: 100%; height: auto;\" title=\n                \"Сертификат Москвы\"></div>\n            </section>\n        </div><!-- конец блока аккордеон -->\n        <!-- Имитация счётчика, ТИЦ и соц - заменится статическим кодом -->\n        <div style=\"text-align:center; margin-top: 1em;\"><img alt=\"\" height=\n        \"76\" src=\"images/Zebra-banner.jpg\" style=\n        \"display: block; margin: 1em auto;\" title=\"Давайте меняться баннерами!\"\n        width=\"190\"> <img alt=\"metrics.png\" height=\"105\" src=\n        \"images/metrics.png\" title=\"Имитация счётчика посещений\" width=\n        \"106\"></div><!-- Если на странице используется галерея, то здесь скрипт отключить! -->\n        <!--    <script src=\"FancyBox-v2.1.5/lib/jquery-1.10.1.min.js\"></script> -->\n    </aside>\n</body>\n</html>");
$templateCache.put("views/directives/content.html","\n			<!--     статьи       -->\n<div id=\"articles\">\n\n\n</div> <!-- articles end -->\n");
$templateCache.put("views/directives/example.html","<div class=\"example-directive\">\n  <h1>Directive title: {{title}}</h1>\n  <p>This is an example of a directive, click me!</p>\n</div>\n");
$templateCache.put("external_libs/FancyBox-v2.1.5/demo/iframe.html","<!DOCTYPE html>\n<html>\n<head>\n	<title>fancyBox - iframe demo</title>\n	<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n</head>\n<body>\n	<h1>fancyBox - iframe demo</h1>\n\n	<p>\n		<a href=\"javascript:parent.jQuery.fancybox.close();\">Close iframe parent</a>\n\n		|\n\n		<a href=\"javascript:parent.jQuery.fancybox.open({href : \'1_b.jpg\', title : \'My title\'});\">Change content</a>\n	</p>\n\n	<p>\n		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam scelerisque justo ac eros consectetur bibendum. In hac habitasse platea dictumst. Nulla aliquam turpis et tellus elementum luctus. Duis sit amet rhoncus velit. Duis nisl ligula, mattis interdum blandit laoreet, mattis id ante. Cras pulvinar lacus vitae nisi egestas non euismod neque bibendum. Vestibulum faucibus libero id ante molestie ultricies. Vestibulum quis nibh felis. Vestibulum libero nisl, vehicula vel ullamcorper sit amet, tristique sit amet augue. Etiam urna neque, porttitor sed sodales lacinia, posuere a nisl. Vestibulum blandit neque in sapien volutpat ac condimentum sapien auctor. Ut imperdiet venenatis ultricies. Phasellus accumsan, sem eu placerat commodo, felis purus commodo ipsum, sit amet vulputate orci est viverra est.\n	</p>\n\n	<p>\n		Aenean velit est, condimentum ut iaculis ut, accumsan at mi. Maecenas velit mi, venenatis ut condimentum at, ultrices vel tortor. Curabitur pharetra ornare dapibus. Ut volutpat cursus semper. In hac habitasse platea dictumst. Donec eu iaculis ipsum. Morbi eu dolor velit, a semper nunc.\n	</p>\n</body>\n</html>");
$templateCache.put("external_libs/FancyBox-v2.1.5/demo/index.html","<!DOCTYPE html>\n<html>\n<head>\n	<title>fancyBox - Fancy jQuery Lightbox Alternative | Demonstration</title>\n	<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\" />\n\n	<!-- Add jQuery library -->\n	<script type=\"text/javascript\" src=\"../lib/jquery-1.10.1.min.js\"></script>\n\n	<!-- Add mousewheel plugin (this is optional) -->\n	<script type=\"text/javascript\" src=\"../lib/jquery.mousewheel-3.0.6.pack.js\"></script>\n\n	<!-- Add fancyBox main JS and CSS files -->\n	<script type=\"text/javascript\" src=\"../source/jquery.fancybox.js?v=2.1.5\"></script>\n	<link rel=\"stylesheet\" type=\"text/css\" href=\"../source/jquery.fancybox.css?v=2.1.5\" media=\"screen\" />\n\n	<!-- Add Button helper (this is optional) -->\n	<link rel=\"stylesheet\" type=\"text/css\" href=\"../source/helpers/jquery.fancybox-buttons.css?v=1.0.5\" />\n	<script type=\"text/javascript\" src=\"../source/helpers/jquery.fancybox-buttons.js?v=1.0.5\"></script>\n\n	<!-- Add Thumbnail helper (this is optional) -->\n	<link rel=\"stylesheet\" type=\"text/css\" href=\"../source/helpers/jquery.fancybox-thumbs.css?v=1.0.7\" />\n	<script type=\"text/javascript\" src=\"../source/helpers/jquery.fancybox-thumbs.js?v=1.0.7\"></script>\n\n	<!-- Add Media helper (this is optional) -->\n	<script type=\"text/javascript\" src=\"../source/helpers/jquery.fancybox-media.js?v=1.0.6\"></script>\n\n	<script type=\"text/javascript\">\n		$(document).ready(function() {\n			/*\n			 *  Simple image gallery. Uses default settings\n			 */\n\n			$(\'.fancybox\').fancybox();\n\n			/*\n			 *  Different effects\n			 */\n\n			// Change title type, overlay closing speed\n			$(\".fancybox-effects-a\").fancybox({\n				helpers: {\n					title : {\n						type : \'outside\'\n					},\n					overlay : {\n						speedOut : 0\n					}\n				}\n			});\n\n			// Disable opening and closing animations, change title type\n			$(\".fancybox-effects-b\").fancybox({\n				openEffect  : \'none\',\n				closeEffect	: \'none\',\n\n				helpers : {\n					title : {\n						type : \'over\'\n					}\n				}\n			});\n\n			// Set custom style, close if clicked, change title type and overlay color\n			$(\".fancybox-effects-c\").fancybox({\n				wrapCSS    : \'fancybox-custom\',\n				closeClick : true,\n\n				openEffect : \'none\',\n\n				helpers : {\n					title : {\n						type : \'inside\'\n					},\n					overlay : {\n						css : {\n							\'background\' : \'rgba(238,238,238,0.85)\'\n						}\n					}\n				}\n			});\n\n			// Remove padding, set opening and closing animations, close if clicked and disable overlay\n			$(\".fancybox-effects-d\").fancybox({\n				padding: 0,\n\n				openEffect : \'elastic\',\n				openSpeed  : 150,\n\n				closeEffect : \'elastic\',\n				closeSpeed  : 150,\n\n				closeClick : true,\n\n				helpers : {\n					overlay : null\n				}\n			});\n\n			/*\n			 *  Button helper. Disable animations, hide close button, change title type and content\n			 */\n\n			$(\'.fancybox-buttons\').fancybox({\n				openEffect  : \'none\',\n				closeEffect : \'none\',\n\n				prevEffect : \'none\',\n				nextEffect : \'none\',\n\n				closeBtn  : false,\n\n				helpers : {\n					title : {\n						type : \'inside\'\n					},\n					buttons	: {}\n				},\n\n				afterLoad : function() {\n					this.title = \'Image \' + (this.index + 1) + \' of \' + this.group.length + (this.title ? \' - \' + this.title : \'\');\n				}\n			});\n\n\n			/*\n			 *  Thumbnail helper. Disable animations, hide close button, arrows and slide to next gallery item if clicked\n			 */\n\n			$(\'.fancybox-thumbs\').fancybox({\n				prevEffect : \'none\',\n				nextEffect : \'none\',\n\n				closeBtn  : false,\n				arrows    : false,\n				nextClick : true,\n\n				helpers : {\n					thumbs : {\n						width  : 50,\n						height : 50\n					}\n				}\n			});\n\n			/*\n			 *  Media helper. Group items, disable animations, hide arrows, enable media and button helpers.\n			*/\n			$(\'.fancybox-media\')\n				.attr(\'rel\', \'media-gallery\')\n				.fancybox({\n					openEffect : \'none\',\n					closeEffect : \'none\',\n					prevEffect : \'none\',\n					nextEffect : \'none\',\n\n					arrows : false,\n					helpers : {\n						media : {},\n						buttons : {}\n					}\n				});\n\n			/*\n			 *  Open manually\n			 */\n\n			$(\"#fancybox-manual-a\").click(function() {\n				$.fancybox.open(\'1_b.jpg\');\n			});\n\n			$(\"#fancybox-manual-b\").click(function() {\n				$.fancybox.open({\n					href : \'iframe.html\',\n					type : \'iframe\',\n					padding : 5\n				});\n			});\n\n			$(\"#fancybox-manual-c\").click(function() {\n				$.fancybox.open([\n					{\n						href : \'1_b.jpg\',\n						title : \'My title\'\n					}, {\n						href : \'2_b.jpg\',\n						title : \'2nd title\'\n					}, {\n						href : \'3_b.jpg\'\n					}\n				], {\n					helpers : {\n						thumbs : {\n							width: 75,\n							height: 50\n						}\n					}\n				});\n			});\n\n\n		});\n	</script>\n	<style type=\"text/css\">\n		.fancybox-custom .fancybox-skin {\n			box-shadow: 0 0 50px #222;\n		}\n\n		body {\n			max-width: 700px;\n			margin: 0 auto;\n		}\n	</style>\n</head>\n<body>\n	<h1>fancyBox</h1>\n\n	<p>This is a demonstration. More information and examples: <a href=\"http://fancyapps.com/fancybox/\">www.fancyapps.com/fancybox/</a></p>\n\n	<h3>Simple image gallery</h3>\n	<p>\n		<a class=\"fancybox\" href=\"1_b.jpg\" data-fancybox-group=\"gallery\" title=\"Lorem ipsum dolor sit amet\"><img src=\"1_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox\" href=\"2_b.jpg\" data-fancybox-group=\"gallery\" title=\"Etiam quis mi eu elit temp\"><img src=\"2_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox\" href=\"3_b.jpg\" data-fancybox-group=\"gallery\" title=\"Cras neque mi, semper leon\"><img src=\"3_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox\" href=\"4_b.jpg\" data-fancybox-group=\"gallery\" title=\"Sed vel sapien vel sem uno\"><img src=\"4_s.jpg\" alt=\"\" /></a>\n	</p>\n\n	<h3>Different effects</h3>\n	<p>\n		<a class=\"fancybox-effects-a\" href=\"5_b.jpg\" title=\"Lorem ipsum dolor sit amet, consectetur adipiscing elit\"><img src=\"5_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox-effects-b\" href=\"5_b.jpg\" title=\"Lorem ipsum dolor sit amet, consectetur adipiscing elit\"><img src=\"5_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox-effects-c\" href=\"5_b.jpg\" title=\"Lorem ipsum dolor sit amet, consectetur adipiscing elit\"><img src=\"5_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox-effects-d\" href=\"5_b.jpg\" title=\"Lorem ipsum dolor sit amet, consectetur adipiscing elit\"><img src=\"5_s.jpg\" alt=\"\" /></a>\n	</p>\n\n	<h3>Various types</h3>\n	<p>\n		fancyBox will try to guess content type from href attribute but you can specify it directly by adding classname (fancybox.image, fancybox.iframe, etc).\n	</p>\n	<ul>\n		<li><a class=\"fancybox\" href=\"#inline1\" title=\"Lorem ipsum dolor sit amet\">Inline</a></li>\n		<li><a class=\"fancybox fancybox.ajax\" href=\"ajax.txt\">Ajax</a></li>\n		<li><a class=\"fancybox fancybox.iframe\" href=\"iframe.html\">Iframe</a></li>\n		<li><a class=\"fancybox\" href=\"http://www.adobe.com/jp/events/cs3_web_edition_tour/swfs/perform.swf\">Swf</a></li>\n	</ul>\n\n	<div id=\"inline1\" style=\"width:400px;display: none;\">\n		<h3>Etiam quis mi eu elit</h3>\n		<p>\n			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis mi eu elit tempor facilisis id et neque. Nulla sit amet sem sapien. Vestibulum imperdiet porta ante ac ornare. Nulla et lorem eu nibh adipiscing ultricies nec at lacus. Cras laoreet ultricies sem, at blandit mi eleifend aliquam. Nunc enim ipsum, vehicula non pretium varius, cursus ac tortor. Vivamus fringilla congue laoreet. Quisque ultrices sodales orci, quis rhoncus justo auctor in. Phasellus dui eros, bibendum eu feugiat ornare, faucibus eu mi. Nunc aliquet tempus sem, id aliquam diam varius ac. Maecenas nisl nunc, molestie vitae eleifend vel, iaculis sed magna. Aenean tempus lacus vitae orci posuere porttitor eget non felis. Donec lectus elit, aliquam nec eleifend sit amet, vestibulum sed nunc.\n		</p>\n	</div>\n\n	<p>\n		Ajax example will not run from your local computer and requires a server to run.\n	</p>\n\n	<h3>Button helper</h3>\n	<p>\n		<a class=\"fancybox-buttons\" data-fancybox-group=\"button\" href=\"1_b.jpg\"><img src=\"1_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox-buttons\" data-fancybox-group=\"button\" href=\"2_b.jpg\"><img src=\"2_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox-buttons\" data-fancybox-group=\"button\" href=\"3_b.jpg\"><img src=\"3_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox-buttons\" data-fancybox-group=\"button\" href=\"4_b.jpg\"><img src=\"4_s.jpg\" alt=\"\" /></a>\n	</p>\n\n	<h3>Thumbnail helper</h3>\n	<p>\n		<a class=\"fancybox-thumbs\" data-fancybox-group=\"thumb\" href=\"4_b.jpg\"><img src=\"4_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox-thumbs\" data-fancybox-group=\"thumb\" href=\"3_b.jpg\"><img src=\"3_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox-thumbs\" data-fancybox-group=\"thumb\" href=\"2_b.jpg\"><img src=\"2_s.jpg\" alt=\"\" /></a>\n\n		<a class=\"fancybox-thumbs\" data-fancybox-group=\"thumb\" href=\"1_b.jpg\"><img src=\"1_s.jpg\" alt=\"\" /></a>\n	</p>\n\n	<h3>Media helper</h3>\n	<p>\n		Will not run from your local computer, requires a server to run.\n	</p>\n\n	<ul>\n		<li><a class=\"fancybox-media\" href=\"http://www.youtube.com/watch?v=opj24KnzrWo\">Youtube</a></li>\n		<li><a class=\"fancybox-media\" href=\"http://vimeo.com/47480346\">Vimeo</a></li>\n		<li><a class=\"fancybox-media\" href=\"http://www.metacafe.com/watch/7635964/\">Metacafe</a></li>\n		<li><a class=\"fancybox-media\" href=\"http://www.dailymotion.com/video/xoeylt_electric-guest-this-head-i-hold_music\">Dailymotion</a></li>\n		<li><a class=\"fancybox-media\" href=\"http://twitvid.com/QY7MD\">Twitvid</a></li>\n		<li><a class=\"fancybox-media\" href=\"http://twitpic.com/7p93st\">Twitpic</a></li>\n		<li><a class=\"fancybox-media\" href=\"http://instagr.am/p/IejkuUGxQn\">Instagram</a></li>\n	</ul>\n\n	<h3>Open manually</h3>\n	<ul>\n		<li><a id=\"fancybox-manual-a\" href=\"javascript:;\">Open single item</a></li>\n		<li><a id=\"fancybox-manual-b\" href=\"javascript:;\">Open single item, custom options</a></li>\n		<li><a id=\"fancybox-manual-c\" href=\"javascript:;\">Open gallery</a></li>\n	</ul>\n\n	<p>\n		Photo Credit: Instagrammer @whitjohns\n	</p>\n</body>\n</html>");
$templateCache.put("js/Routes/Articles/addArticle.html","<ng-md-icon icon=\"close\" size=30 style=\"float:right\" ng-click=\"close()\"></ng-md-icon>\n<div class=\"form-group\">\n    <label>Раздел</label>\n    <select style=\" background-color: white;border: 1px solid black;border-radius: 2px;\" ng-model=\"article.viewid\" ng-options=\"item.viewid as item.title for item in directories\"></select>\n</div>\n<div class=\"form-group\">\n  <label>Заголовок статьи</label>\n  <input class=\'form-control\' ng-keyup=\'changeAlias()\'  style=\'margin:10px 0; text-align:center\' type=\'text\' ng-model=\'article.header\'></input>\n</div>\n<div class=\"form-group\">\n  <label>Заголовок в браузере</label>\n  <input class=\'form-control\' style=\'margin:10px 0; text-align:center\' type=\'text\' ng-model=\'article.title\'></input>\n</div>\n<div class=\"form-group\">\n  <label>Алиас</label>\n  <input class=\'form-control\' style=\'margin:10px 0; text-align:center\' type=\'text\' ng-model=\'article.alias\'></input>\n</div>\n<div class=\"form-group\">\n  <label for=\"usr\">Ключевые слова</label>\n  <input type=\"text\" class=\"form-control\" ng-model=\"article.keywords\" id=\"usr\">\n</div>\n<div class=\"form-group\">\n  <label for=\"usr\">Описание статьи</label>\n  <input type=\"text\" class=\"form-control\" ng-model=\"article.description\" id=\"usr\">\n</div>\n<div class=\"form-group\">\n  <label>Аннотация</label>\n  <div ckeditor=\"options\" ng-model=\"article.annotation\" ></div>\n</div>\n<div class=\"form-group\">\n  <label>Текст статьи</label>\n  <div ckeditor=\"options\" ng-model=\"article.text\" ></div>\n</div>\n<div class=\"row\">\n  <div class=\"btn-group addedit-buttons\" role=\"group\" aria-label=\"...\">\n    <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Отменить</button>\n    <button type=\"button\" class=\"btn btn-default\" ng-click=\"save()\">{{isEditing?\"Сохранить\":\"Добавить\"}}</button>\n  </div>\n</div>\n");
$templateCache.put("js/Routes/Articles/articles.html","<div class=\"articles\">\n  <article-template data=\"art\" is-short=\"true\" ng-repeat=\"art in articles | orderBy:\'-id\'\"></article-template>\n</div>\n");
$templateCache.put("js/Routes/Articles/singleArticle.html","<div class=\"articles\">\n    <article-template enable-editing=\"enableEditing\" data=\"article\"></article-template>\n<div>");
$templateCache.put("js/Routes/Home/home.html","<div class=\"articles\">\n  <div gridster=\"gridsterOpts\">\n      <ul>\n          <li gridster-item row=\"item.position[0]\"  id={{item.tagid}} col=\"item.position[1]\" size-x=\"item.size.x\"\n          size-y=\"item.size.y\" ng-repeat=\"item in articles\" ng-class={\"user-admin\":enableEditing}>\n            <ng-md-icon icon= \"shuffle\" size =30 class=\"dragger shuffle\"></ng-md-icon>\n            <article-template enable-editing=\"enableEditing\" gridster-dynamic-height data=item is-short=\"true\"></article-template>\n          </li>\n      </ul>\n  </div>\n</div>\n");
$templateCache.put("js/Routes/Section/articles.html","<div class=\"articles\">\n  <div gridster=\"gridsterOpts\">\n      <ul>\n          <li gridster-item row=\"item.position[0]\"  id={{item.tagid}} col=\"item.position[1]\" size-x=\"item.size.x\"\n          size-y=\"item.size.y\" ng-repeat=\"item in articles\" ng-class={\"user-admin\":enableEditing}>\n            <ng-md-icon icon= \"shuffle\" size =30 class=\"dragger shuffle\"></ng-md-icon>\n            <article-template enable-editing=\"enableEditing\" gridster-dynamic-height data=item is-short=\"true\"></article-template>\n          </li>\n      </ul>\n  </div>\n</div>\n");
$templateCache.put("js/Routes/Structure/structure.html","<!-- Nested node template -->\n<script type=\"text/ng-template\" id=\"nodes_renderer.html\">\n  <div ui-tree-handle class=\"tree-node-content tree-node\" style=\"display:flex; flex-direction:row; justify-content:space-between\">\n    <div style=\"width:80%;display:flex; flex-direction:row\">\n        <input type=\"text\" class=\"form-control\" style=\"width:70%\" ng-model=\"node.title\" aria-describedby=\"basic-addon1\">\n        <input type=\"text\" class=\"form-control\" style=\"width:30%;margin-left:10px\" ng-model=\"node.alias\" aria-describedby=\"basic-addon1\">\n    </div>\n    <div>\n        <a class=\"pull-right btn btn-danger btn-xs\" data-nodrag=\"\" style=\"height:25px\" ng-click=\"removeSubItem(node)\"><span class=\"glyphicon glyphicon-remove\"></span></a>\n        <a class=\"pull-right btn btn-primary btn-xs\" data-nodrag=\"\" ng-click=\"newSubItem(node)\" style=\"margin-right: 8px;height:25px\"><span class=\"glyphicon glyphicon-plus\"></span></a>\n    </div>\n  </div>\n  <ol ui-tree-nodes=\"\" ng-model=\"node.nodes\">\n    <li ng-repeat=\"node in node.nodes\" ui-tree-node ng-include=\"\'nodes_renderer.html\'\">\n    </li>\n  </ol>\n</script>\n<a class=\"btn btn-default\" href=\"#\" role=\"button\" style=\"margin:10px\" ng-click=\"addDir()\">Добавить раздел</a>\n<div class=\"col-xs-12\">\n    <div ui-tree class=\"ui-tree\">\n      <ol ui-tree-nodes=\"\" ng-model=\"nodes\" id=\"tree-root\">\n        <li ng-repeat=\"node in nodes\" data-nodrag  ui-tree-node ng-include=\"\'nodes_renderer.html\'\"></li>\n      </ol>\n    </div>\n</div>\n<div class=\"row\" style=\"margin:10px\">\n  <div class=\"btn-group addedit-buttons\" role=\"group\" aria-label=\"...\">\n    <button type=\"button\" class=\"btn btn-default\" ng-click=\"cancel()\">Отменить</button>\n    <button type=\"button\" class=\"btn btn-default\" ng-click=\"save()\">Сохранить</button>\n  </div>\n</div>\n");}]);