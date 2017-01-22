const sendJson = require("../queryHelper.js").sendJson;
function sendErrors (res, entity) {
  sendJson(res, entity);
}
const errorTypes = {
 "nonEmpty": (field, name)=> {
   if(!field || field.trim().length === 0) {
     return `Поле ${name} не может быть пустым`;
   } else {
     return false;
   }
 }
}
module.exports = {sendErrors, errorTypes};