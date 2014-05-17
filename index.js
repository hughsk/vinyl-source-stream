/**
 * Module dependencies
 */

var through2 = require('through2');
var File = require('vinyl');
var path = require('path');

/**
 * Exports
 */

module.exports = createSourceStream

/**
 * Create a source stream
 *
 * @param {String} filename
 * @return {Object}
 * @api public
 */

function createSourceStream(filename) {
  var ins = through2()
  var out = false

  if (filename) filename = path.resolve(filename);

  var file = new File(filename 
    ? {path: filename, contents: ins}
    : {contents: ins}
  );

  // create the stream
  return through2({objectMode: true}, 

    function(chunk, enc, next) {
      if (!out) {
        this.push(file);
        out = true;
      }
      ins.push(chunk);
      next();
    }, 

    function() {
      ins.push(null);
      this.push(null);
    }
  );
};
