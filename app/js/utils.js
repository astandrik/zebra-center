import errorsCtrl from "./ErrorsHandler/ErrorsCtrl";
/*@ngInject*/
export default function utils(dialogs) {
  return {
    handleErrors: (errors) => {
      dialogs.create("views/components/errors.html", errorsCtrl,{
        errors
      },{
        windowClass: "errors-window"
      });
    }
  }
}

