var koa = require('koa');
var app = koa();
    
    // handlers here
    // app.use(handlers);

app.use(function *() {
      // you can set the response body in handler like this
      this.body = 'Hello world';
});


var port = 3000;

app.listen(port);
