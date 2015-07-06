var koa = require('koa');
var fs = require('fs');
var app = koa();

app.use(function* (next) {
  if (this.path === '/') {
    try {      
      this.type = 'text/html; charset=utf-8';
      this.body = fs.createReadStream('public/index.html');
      
      yield next;
    } catch (err) {
      
      this.status = 404;
      this.body = '404 - page not found';
      this.app.emit('error', err, this);
    }
  }
  else {
    this.status = 404;
    this.type = 'text/plain; charset=utf-8';
    this.body = '404 - page not found';
  }
});

app.listen(3000);