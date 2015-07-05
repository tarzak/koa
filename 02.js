var serve = require('koa-static');
var koa = require('koa');
var fs = require('fs');
var app = koa();

// temporary disabled static-serving
//app.use(serve('public')); // absolute paths

app.use(function* (next) {
  if (this.path === '/') {
    this.type = 'text/html; charset=utf-8'
    this.body = fs.createReadStream('public/index.html');
  }
  
  // koa will automatically handle errors and leaks
})


app.listen(3000);