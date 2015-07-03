var koa = require('koa');
var app = koa();

    // handlers here
    // app.use(handlers);

app.use(function *(next) {
	console.log('this: ', this.query);
	console.log(this.host);
      if (this.path === '/') {
        this.body = 'hello koa';
      } else if (this.path === '/404') {
        this.body = 'page not found'
      } else if (this.path === '/500') {
        this.body = 'internal server error'
      }
});


var port = process.argv[2];

app.listen(port);
