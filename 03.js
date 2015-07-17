var express    = require('express'),
    fs = require('fs')
    path = require('path'),
    app = express(),
    file = 'public/file.txt',
    readStream  = fs.createReadStream(file),
    writeStream = fs.createWriteStream(file),
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
  res.sendFile(path.join(__dirname, 'public/file.txt'));
})

app.put('/file/:contents', function (req, res) {
  //stream.write(req.params.contents);
  pipe([readStream, writeStream], function(error) {
    console.log(error || 'done');
  });
});

app.listen(3000);