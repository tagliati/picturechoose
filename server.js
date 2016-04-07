var express = require('express');
var exphbs = require('express-handlebars');
var config = require("./config");
var app     = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use("/static",express.static(__dirname + '/public'));

app.get('/', function (req, res) {
	res.render("index.html",{title: "Choose a picture"});
});

app.get('/album/:slug', function(req,res) {
    var slug = req.params.slug;
    db.all("SELECT * FROM photos WHERE slug = '"+slug+"';",function(err, row) {
        res.render("album.html",{photos: row});
    })
});


app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});

