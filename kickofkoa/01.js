var koa = require('koa');
var app = koa();
    
    // handlers here
    // app.use(handlers);

app.use(function *() {
      // you can set the response body in handler like this
      this.body = 'hello koa';
});


var port = process.argv[2];

app.listen(port);
