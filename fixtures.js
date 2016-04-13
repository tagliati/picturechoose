var config = require("./config")
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(config.db);

var stmt = db.prepare("INSERT INTO photos VALUES (?,?)");
for (var i = 0; i < 10; i++) {
	stmt.run("axh3Ph1","http://placehold.it/600x600");
}
stmt.finalize();

