var express = require('express');
var moviesCtrl = require('./controllers/Movies');

var app = express();

// app.get('/', function (req, res) {
//   res.send('base route!');
// });
app.get('/', moviesCtrl.getMaxMovies);

app.listen(3000, function () {
  console.log('listening on port 3000!');
});