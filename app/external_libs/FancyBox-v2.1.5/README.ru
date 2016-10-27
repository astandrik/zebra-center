fancyBox является инструментом, который предлагает красивый и элегантный способ добавить функциональность масштабирования изображений, HTML-контента и мультимедиа на веб-страницах.

More information and examples: http://www.fancyapps.com/fancybox/

License: http://www.fancyapps.com/fancybox/#license

Copyright (c) 2012 Janis Skarnelis - janis@fancyapps.com

Как использовать
----------------

Для начала скачайте плагин, разархивируйте его и скопируйте файлы на ваш сайт/каталог приложения.
Загрузите файлы в разделе <head> вашего HTML документа. Убедитесь, что вы также добавили библиотеку jQuery.

  <head>
     <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.7/jquery.min.js"></script>
     <link rel="stylesheet" href="/fancybox/jquery.fancybox.css" type="text/css" media="screen" />
     <script type="text/javascript" src="/fancybox/jquery.fancybox.pack.js"></script>
  </head>

Создайте ссылки с `title` если вы хотите показать заголовок и добавьте класс:

<a href="large_image.jpg" class="fancybox" title="Sample title"><img src="small_image.jpg" /></a>

Если у вас есть набор связанных тем, которые вы хотели бы сгруппировать,
дополнительно включите имя группы в атрибут `rel` (или `data-fancybox-group`) атрибут:

<a href="large_1.jpg" class="fancybox" rel="gallery" title="Sample title 1"><img src="small_1.jpg" /></a>
<a href="large_2.jpg" class="fancybox" rel="gallery" title="Sample title 1"><img src="small_2.jpg" /></a>

Инициализируйте скрипт:

    <script>
        $(document).ready(function() {
            $('.fancybox').fancybox();
        });
    </script>

Также могуть быть приняты дополнительные опции объекта, расширяющие значения по умолчанию, например:

    <script>
        $(document).ready(function() {
            $('.fancybox').fancybox({
                padding : 0,
                openEffect  : 'elastic'
            });
        });
    </script>

Совет: автоматическое группировка и применение fancyBox для всех изображений:

    $("a[href$='.jpg'],a[href$='.jpeg'],a[href$='.png'],a[href$='.gif']").attr('rel', 'gallery').fancybox();

Скрипт использует атрибут `href` совпадающих элементов, чтобы получить локацию контента и выяснить Тип Контента, который вы хотите отобразить.
Вы можете указать тип напрямую, добавляя имя класса (fancybox.image, fancybox.iframe, и т.д.) или атрибут `data-fancybox-type`:

    //Ajax:
    <a href="/example.html" class="fancybox fancybox.ajax">Example</a>
    //or
    <a href="/example.html" class="fancybox" data-fancybox-type="ajax">Example</a>

    //Iframe:
    <a href="example.html" class="fancybox fancybox.iframe">Example</a>

    //Inline (will display an element with `id="example"`)
    <a href="#example" class="fancybox">Example</a>

    //SWF:
    <a href="example.swf" class="fancybox">Example</a>

    //Image:
    <a href="example.jpg" class="fancybox">Example</a>

Обратите внимание, AJAX запрашивает с учетом [той же политики происхождения] (http://en.wikipedia.org/wiki/Same_origin_policy).
Если fancyBox не сможет получить Тип содержимого, он попытается угадать, основываясь на 'href' и тихо закончит, если безуспешно.
(это отличается от предыдущих версий, где 'ajax' был использован в качестве типа по умолчанию или появилось сообщение об ошибке)

Advanced
--------

### Helpers

Помощники обеспечивают простой механизм для расширения возможностей fancyBox. Есть два встроенных помощника - 'overlay' (наложение) и 'title' (заглавие).
Вы можете отключить их, установить пользовательские параметры или включить другие помощники. Примеры:

    //Disable title helper
    $(".fancybox").fancybox({
        helpers:  {
            title:  null
        }
    });

    //Disable overlay helper
    $(".fancybox").fancybox({
        helpers:  {
            overlay : null
        }
    });

    //Change title position and overlay color
    $(".fancybox").fancybox({
        helpers:  {
            title : {
                type : 'inside'
            },
            overlay : {
                css : {
                    'background' : 'rgba(255,255,255,0.5)'
                }
            }
        }
    });

    //Enable thumbnail helper and set custom options
    $(".fancybox").fancybox({
        helpers:  {
            thumbs : {
                width: 50,
                height: 50
            }
        }
    });


### API

Также доступны событийно-ориентированные методы обратного вызова. Ключевое слово `this` относится к текущему или предстоящему объекту (зависит от метода обратного вызова). Вот как вы можете изменить название:

    $(".fancybox").fancybox({
        beforeLoad : function() {
            this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');

            /*
                "this.element" refers to current element, so you can, for example, use the "alt" attribute of the image to store the title:
                this.title = $(this.element).find('img').attr('alt');
            */
        }
    });

Можно открыть fancyBox программно различными способами:

    //HTML content:
    $.fancybox( '<div><h1>Lorem Lipsum</h1><p>Lorem lipsum</p></div>', {
        title : 'Custom Title'
    });

    //DOM element:
    $.fancybox( $("#inline"), {
        title : 'Custom Title'
    });

    //Custom object:
    $.fancybox({
        href: 'example.jpg',
        title : 'Custom Title'
    });

    //Array of objects:
    $.fancybox([
        {
            href: 'example1.jpg',
            title : 'Custom Title 1'
        },
        {
            href: 'example2.jpg',
            title : 'Custom Title 2'
        }
    ], {
        padding: 0
    });

Существует несколько методов, которые позволяют вам взаимодействовать и управлять fancyBox, пример:

    //Close fancybox:
    $.fancybox.close();

Есть простой способ доступа к обертке элементов с помощью JS:

    $.fancybox.wrap
    $.fancybox.skin
    $.fancybox.outer
    $.fancybox.inner

Вы можете переопределить CSS для настройки внешнего вида. Например, сделать стрелки навигации всегда видимыми, изменить ширину и переместить их за пределы района (используйте этот snippet (фрагмент кода) после включения fancybox.css):

.fancybox-nav span { visibility: visible; }

.fancybox-nav { width: 80px; }

.fancybox-prev { left: -80px; }

.fancybox-next { right: -80px; }

В таком случае, вы могли бы увеличить пространство вокруг box:

    $(".fancybox").fancybox({
        margin : [20, 60, 20, 60]
    });

Баг-трекер
----------

Есть ошибка? Пожалуйста, создайте вопрос issue на GitHub: https://github.com/fancyapps/fancyBox/issues