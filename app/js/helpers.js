var mapPromise = function(func) {
  return Promise.all(this.map(func));
}


module.exports = {mapPromise};
