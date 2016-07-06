module.exports = function() {
    angular.module("dialogs.controllers",["ui.bootstrap.modal","pascalprecht.translate"]).config(["$translateProvider",function(a){a.translations("en-US",{DIALOGS_ERROR:"Error",DIALOGS_ERROR_MSG:"An unknown error has occurred.",DIALOGS_CLOSE:"Close",DIALOGS_PLEASE_WAIT:"Please Wait",DIALOGS_PLEASE_WAIT_ELIPS:"Please Wait...",DIALOGS_PLEASE_WAIT_MSG:"Waiting on operation to complete.",DIALOGS_PERCENT_COMPLETE:"% Complete",DIALOGS_NOTIFICATION:"Notification",DIALOGS_NOTIFICATION_MSG:"Unknown application notification.",DIALOGS_CONFIRMATION:"Confirmation",DIALOGS_CONFIRMATION_MSG:"Confirmation required.",DIALOGS_OK:"OK",DIALOGS_YES:"Yes",DIALOGS_NO:"No"}),a.preferredLanguage("en-US")}]).controller("errorDialogCtrl",["$scope","$uibModalInstance","$translate","header","msg",function(a,n,e,s,l){a.header=angular.isDefined(s)?s:e.instant("DIALOGS_ERROR"),a.msg=angular.isDefined(l)?l:e.instant("DIALOGS_ERROR_MSG"),a.close=function(){n.close(),a.$destroy()}}]).controller("waitDialogCtrl",["$scope","$uibModalInstance","$translate","$timeout","header","msg","progress",function(a,n,e,s,l,o,t){a.header=angular.isDefined(l)?l:e.instant("DIALOGS_PLEASE_WAIT_ELIPS"),a.msg=angular.isDefined(o)?o:e.instant("DIALOGS_PLEASE_WAIT_MSG"),a.progress=angular.isDefined(t)?t:100,a.$on("dialogs.wait.complete",function(){s(function(){n.close(),a.$destroy()})}),a.$on("dialogs.wait.message",function(n,e){a.msg=angular.isDefined(e.msg)?e.msg:a.msg}),a.$on("dialogs.wait.progress",function(n,e){a.msg=angular.isDefined(e.msg)?e.msg:a.msg,a.progress=angular.isDefined(e.progress)?e.progress:a.progress}),a.getProgress=function(){return{width:a.progress+"%"}}}]).controller("notifyDialogCtrl",["$scope","$uibModalInstance","$translate","header","msg",function(a,n,e,s,l){a.header=angular.isDefined(s)?s:e.instant("DIALOGS_NOTIFICATION"),a.msg=angular.isDefined(l)?l:e.instant("DIALOGS_NOTIFICATION_MSG"),a.close=function(){n.close(),a.$destroy()}}]).controller("confirmDialogCtrl",["$scope","$uibModalInstance","$translate","header","msg",function(a,n,e,s,l){a.header=angular.isDefined(s)?s:e.instant("DIALOGS_CONFIRMATION"),a.msg=angular.isDefined(l)?l:e.instant("DIALOGS_CONFIRMATION_MSG"),a.no=function(){n.dismiss("no")},a.yes=function(){n.close("yes")}}]),angular.module("dialogs.services",["ui.bootstrap.modal","dialogs.controllers"]).provider("dialogs",[function(){var a=!0,n=!0,e="dialogs-default",s=!0,l=null,o="lg";this.useBackdrop=function(n){angular.isDefined(n)&&(a=n)},this.useEscClose=function(a){angular.isDefined(a)&&(n=angular.equals(a,0)||angular.equals(a,"false")||angular.equals(a,"no")||angular.equals(a,null)||angular.equals(a,!1)?!1:!0)},this.useClass=function(a){angular.isDefined(a)&&(e=a)},this.useCopy=function(a){angular.isDefined(a)&&(s=angular.equals(a,0)||angular.equals(a,"false")||angular.equals(a,"no")||angular.equals(a,null)||angular.equals(a,!1)?!1:!0)},this.setWindowTmpl=function(a){angular.isDefined(a)&&(l=a)},this.setSize=function(a){angular.isDefined(a)&&(o=angular.equals(a,"sm")||angular.equals(a,"lg")?a:o)},this.$get=["$uibModal",function(l){return{error:function(s,t,r){return r=angular.isDefined(r)&&(angular.equals(r,"sm")||angular.equals(r,"lg"))?r:o,l.open({templateUrl:"/dialogs/error.html",controller:"errorDialogCtrl",backdrop:a,keyboard:n,windowClass:e,size:r,resolve:{header:function(){return angular.copy(s)},msg:function(){return angular.copy(t)}}})},wait:function(s,t,r,i){return i=angular.isDefined(i)&&(angular.equals(i,"sm")||angular.equals(i,"lg"))?i:o,l.open({templateUrl:"/dialogs/wait.html",controller:"waitDialogCtrl",backdrop:a,keyboard:n,windowClass:e,size:i,resolve:{header:function(){return angular.copy(s)},msg:function(){return angular.copy(t)},progress:function(){return angular.copy(r)}}})},notify:function(s,t,r){return r=angular.isDefined(r)&&(angular.equals(r,"sm")||angular.equals(r,"lg"))?r:o,l.open({templateUrl:"/dialogs/notify.html",controller:"notifyDialogCtrl",backdrop:a,keyboard:n,windowClass:e,size:r,resolve:{header:function(){return angular.copy(s)},msg:function(){return angular.copy(t)}}})},confirm:function(s,t,r){return r=angular.isDefined(r)&&(angular.equals(r,"sm")||angular.equals(r,"lg"))?r:o,l.open({templateUrl:"/dialogs/confirm.html",controller:"confirmDialogCtrl",backdrop:a,keyboard:n,windowClass:e,size:r,resolve:{header:function(){return angular.copy(s)},msg:function(){return angular.copy(t)}}})},create:function(t,r,i,u){return u=angular.isDefined(u)&&(angular.equals(u,"sm")||angular.equals(u,"lg"))?u:o,l.open({templateUrl:t,controller:r,keyboard:n,backdrop:a,windowClass:e,size:u,resolve:{data:function(){return s?angular.copy(i):i}}})}}}]}]),angular.module("dialogs.main",["dialogs.services","ngSanitize"]).run(["$templateCache","$interpolate",function(a,n){var e=n.startSymbol(),s=n.endSymbol();a.put("/dialogs/error.html",'<div class="modal-header dialog-header-error"><button type="button" class="close" ng-click="close()">&times;</button><h4 class="modal-title text-danger"><span class="glyphicon glyphicon-warning-sign"></span> <span ng-bind-html="header"></span></h4></div><div class="modal-body text-danger" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="close()">'+e+'"DIALOGS_CLOSE" | translate'+s+"</button></div>"),a.put("/dialogs/wait.html",'<div class="modal-header dialog-header-wait"><h4 class="modal-title"><span class="glyphicon glyphicon-time"></span> '+e+'"DIALOGS_PLEASE_WAIT" | translate'+s+'</h4></div><div class="modal-body"><p ng-bind-html="msg"></p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" ng-style="getProgress()"></div><span class="sr-only">'+e+"progress"+s+e+'"DIALOGS_PERCENT_COMPLETE" | translate'+s+"</span></div></div>"),a.put("/dialogs/notify.html",'<div class="modal-header dialog-header-notify"><button type="button" class="close" ng-click="close()" class="pull-right">&times;</button><h4 class="modal-title text-info"><span class="glyphicon glyphicon-info-sign"></span> '+e+"header"+s+'</h4></div><div class="modal-body text-info" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-primary" ng-click="close()">'+e+'"DIALOGS_OK" | translate'+s+"</button></div>"),a.put("/dialogs/confirm.html",'<div class="modal-header dialog-header-confirm"><button type="button" class="close" ng-click="no()">&times;</button><h4 class="modal-title"><span class="glyphicon glyphicon-check"></span> '+e+"header"+s+'</h4></div><div class="modal-body" ng-bind-html="msg"></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="yes()">'+e+'"DIALOGS_YES" | translate'+s+'</button><button type="button" class="btn btn-primary" ng-click="no()">'+e+'"DIALOGS_NO" | translate'+s+"</button></div>")}]);
};