var config = require("./config")
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

db.serialize(function(){
	db.run("CREATE TABLE if not exists photos (slug TEXT,image TEXT)");
});
db.close();
