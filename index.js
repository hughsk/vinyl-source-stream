var through2 = require('through2')
var File = require('vinyl')
var path = require('path')

module.exports = createSourceStream

function createSourceStream(filename, opts) {
  var ins = through2()
  var out = false

  var spec = {};

  // can have cwd and base overrides, and cwdbase bool to force base to cwd
  opts = opts || {};

  // populate vinyl cwd and path exactly like gulp.src() would
  spec.cwd = path.resolve(opts.cwd || process.cwd());
  spec.path = path.resolve(spec.cwd, filename);
  spec.base = opts.cwdbase ? spec.cwd : (path.resolve(opts.base || path.dirname(spec.path)));
  spec.contents = ins;

  var file = new File(spec);

  return through2({
    objectMode: true
  }, function(chunk, enc, next) {
    if (!out) {
      this.push(file)
      out = true
    }

    ins.push(chunk)
    next()
  }, function() {
    ins.push(null)
    this.push(null)
  })
}
