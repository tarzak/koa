var express    = require('express')
var fs = require('fs');
var path = require('path');
var app = express();
var stream = fs.createWriteStream('public/file.txt');

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
  res.sendFile(path.join(__dirname, 'public/file.txt'));
})

app.put('/file/:contents', function (req, res) {
  stream.write(req.params.contents);
});

app.listen(3000);