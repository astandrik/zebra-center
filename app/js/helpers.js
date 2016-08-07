Array.prototype.mapPromise = function(func) {
  return Promise.all(this.map(func));
}
