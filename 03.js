var express    = require('express')
var bodyParser = require('body-parser')
var fs = require('fs');
var path = require('path');
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }))

/*var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express()*/

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/index.html'));
  res.status(200);
});

app.get('/file', function (req, res) {
  res.sendFile(path.join(__dirname, 'public/file.txt'));
})

app.put('/file/:contents', function (req, res) {
  

var path = '/public/file.txt',
buffer = new Buffer("some content\n");

fs.open(path, 'w', function(err, fd) {
    if (err) {
        throw 'error opening file: ' + err;
    }

    fs.write(fd, req.params.contents, 0, buffer.length, null, function(err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function() {
            console.log('file written');
        })
    });
});


  console.log('put', req.params);
});

app.listen(3000);