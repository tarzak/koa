var express    = require('express'),
    fs   = require('fs'),
    path = require('path'),
    app  = express(),
    file = 'public/file.txt',
    pipe = require('pipe-io');

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
  var readStream = fs.createReadStream(file);
  readStream.on('open', function () {
    // This just pipes the read stream to the response object (which goes to the client)
    readStream.pipe(res);
  });
})

app.put('/file', function (req, res) {
  req.pipe(fs.createWriteStream(file, {'flags': 'a'}));
  req.on('end', console.log.bind(console, 'done'));
  res.end()

});
console.log('Server is listeting 3000 port. Enjoy :).')
app.listen(3000);