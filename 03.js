var express    = require('express'),
    fs   = require('fs'),
    path = require('path'),
    app  = express(),
    indexPath = 'public/index.html',
    filePath = 'public/file.txt',
    pipe = require('pipe-io');

app.get('/', function(req, res) {
  sendFileWithPipe(indexPath, res);
});

app.get('/file', function (req, res) {
  sendFileWithPipe(filePath, res);
});

app.put('/file', function (req, res) {
  pipe([req, fs.createWriteStream(file, {'flags': 'a'})], function (error) {
    console.log(error || 'done');
    if (error)
      res.status(500).end();
    else
      res.end();
  });
});

function sendFileWithPipe(filePath, responseStream) {
  var readStream = fs.createReadStream(filePath);
  pipe([readStream, responseStream], function (error) {
    console.log(error || 'file ' + filePath + ' is sent');
    if (error)
      responseStream.send(error.message).end();
  });
}

console.log('Server is listening 3000 port. Enjoy :).')
app.listen(3000);