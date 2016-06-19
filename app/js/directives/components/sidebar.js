var sidebar = {
  templateUrl: 'views/components/sidebar.html',
  controller: ['$timeout','$scope',function($timeout, $scope) {
    $scope.zebraCenter = [	'Раз два три',
	'Три четыре пять',
	'Православное просвещение',
	'Обучение специалистов',
	'Рабочие тетради',
	'Иные виды помощи',
	'Семья и близкие',
	'Разное о выздоровлении']
    $timeout(()=> 
             {
     (function(i) {
        var o, n;
        i(".title_block").on("click", function() {
          o = i(this).parents(".accordion_item"), n = o.find(".info"),
            o.hasClass("active_block") ? (o.removeClass("active_block"),
              n.slideUp()) : (o.addClass("active_block"), n.stop(!0, !0).slideDown(),
              o.siblings(".active_block").removeClass("active_block").children(
                ".info").stop(!0, !0).slideUp())
        })
      })($);
    })
  }]
}

module.exports = {
  name: 'sidebarDirective',
  type: 'component',
  component: sidebar
}
