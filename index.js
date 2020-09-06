
'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
const Site = require('schemas/Site.js');

var app = express();

// Basic Configuration 
var port = 3000;

/** this project needs a db !! **/
mongoose.connect(process.env.DB_URI);


/** this project needs to parse POST bodies **/
// you should mount the body-parser here
var bodyParser = require('body-parser');
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.post("/api/shorturl/new", (req, res) => {
  var count = Model.count({}, function (err, count) {
    if (err) return err;
    return count;
  });

  count = count + 1;

  var url = new Site({ original_url: req.body.url, short_url: count });

  url.save(function (err, data) {
    if (err) return done(err);
    done(null, data);
  });

  res.json({ original_url: req.body.url, short_url: count });
});

app.post("/api/shorturl/:id", (req, res) => {
  Site.find({ short_url: req.params.id }, (err, data) => {
    if (err) {
      res.json({ error: "Invalid URL" })
    }
    else {
      window.location.href = data.original_url;
    }
  })
});

app.listen(port, function () {
  console.log('Node.js listening ...');
});