var express    = require('express'),
    fs   = require('fs'),
    path = require('path'),
    app  = express(),
    file = 'public/file.txt',
    pipe = require('pipe-io');

app.get('/', function(req, res) {
  var readStream = fs.createReadStream('public/index.html');
  pipe([readStream, res], function (error) {
    console.log(error || 'sent');
    if (error)
      res.status(error.status).end();
    else
      res.end();
  });
});

app.get('/file', function (req, res) {
  var readStream = fs.createReadStream(file);
  pipe([readStream, res], function (error) {
    console.log(error || 'done');
    if (error)
      res.status(error.status).end();
    else
      res.end();
  });
});

app.put('/file', function (req, res) {
  pipe([req, fs.createWriteStream(file, {'flags': 'a'})], function (error) {
    console.log(error || 'done');
    if (error)
      res.status(error.status).end();
    else
      res.end();
  });
});

console.log('Server is listening 3000 port. Enjoy :).')
app.listen(3000);