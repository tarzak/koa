var serve = require('koa-static');
var koa = require('koa');
var app = koa();

// or use absolute paths
app.use(serve('public'));

app.listen(3000);

console.log('listening on port 3000');
