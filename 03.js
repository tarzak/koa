var express    = require('express'),
    fs = require('fs')
    path = require('path'),
    app = express(),
    //file = 'public/file.txt',
    pipe        = require('pipe-io');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'), function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent');
      res.status(200);
    }
  });  
});

app.get('/file', function (req, res) {
  //res.sendFile(path.join(__dirname, 'public/file.txt'));
  var file = new fs.ReadStream('public/file.txt');
  sendFile(file, res);
})

function sendFile(file, res) {
  file.pipe(res);
}

app.put('/file/:contents', function (req, res) {
  var file = new fs.WriteStream('public/file.txt');
  file.write(req.params.contents);
});
function writeFile(file, req) {
  file.pipe(req);
}

app.listen(3000);