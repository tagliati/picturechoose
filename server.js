var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var multer = require('multer');
var exphbs = require('express-handlebars');
var config = require("./config");
var app     = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

app.set('views', __dirname + '/views');
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

app.use("/static",express.static(__dirname + '/public'));

app.use(bodyParser.json());
var storage = multer.diskStorage({
	destination: function(req,file,callback){
		callback(null,'./uploads');
	},
	filename: function(req,file,callback){
	callback(null,file.fieldname + '-'+Date.now());}

});
var upload = multer({storage:storage}).any();

app.get('/upload',function(req,res){
	res.render("upload");
});

app.post('/album/:slug',function(req, res){
	console.log(req.body);	
});

app.post('/api/photo',function(req,res){
	upload(req,res,function(err){
		console.log(req.body);
		console.log(req.files);
		var data = req.files;
		if(err) {
			return res.end("Error uploading file");
		}
		
		var stmt = db.prepare("INSERT INTO photos VALUES (?,?)");
		for (var i in req.files) {
			console.log("save picture",data[i].originalname);
			//save images at database as base64?
			stmt.run("axh3Ph1",fs.readFileSync(data[i].path).toString('base64'));
		}
		res.end("Uploaded with success");
	});
});

app.get('/', function (req, res) {
	res.render("index",{title: "Choose a picture"});
});

app.get('/album/:slug', function(req,res) {
    var slug = req.params.slug;
    db.all("SELECT * FROM photos WHERE slug = '"+slug+"';",function(err, row) {
        res.render("album",{photos: row,slug: slug});
    })
});


app.listen(3300, function () {
	console.log('Listening on port 3300!');
});

