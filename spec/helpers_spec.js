require('../app/js/helpers.js')

describe("Testing helper functions", function(){
  var newArr = [333];
  beforeEach(function(done) {
    var square = x =>
                  new Promise((resolve, reject) => {
                    setTimeout(() => resolve(x*x), 500);
                  });
    var arr = [1,2,3];
    arr.mapPromise(square).then((arr) => newArr = arr);
    setTimeout(
      () => {
          done();
        }
    , 700);
  });
  it('mapPromise should work', function() {
    expect(JSON.stringify([1,4,9])).toEqual(JSON.stringify(newArr));
  })
});
