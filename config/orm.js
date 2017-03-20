var connection = require("../config/connection.js");

function objToSql(ob) {
  var arr = [];

  for (var key in ob) {
    if (Object.hasOwnProperty.call(ob, key)) {
      arr.push(key + "=" + ob[key]);
    }
  }

  return arr.toString();
}

var orm = {
	selectAll: function(tableInput, cb){
			var queryString = "SELECT * FROM " + tableInput + ";";
			connection.query(queryString, function(err, result){
					if(err) throw err;
					cb(result);
			});
	},
	insertOne: function(table, cols, vals, cb){
		var queryString = "INSERT INTO " + table;
		queryString += " ("+cols.toString();
		queryString += ") VALUES (?)";
		 
		console.log(queryString);
		console.log(vals);

		connection.query(queryString, vals, function(err, result){
			if(err) throw err;
			cb(result);
		});
	},
	updateOne: function(table, objectColVals, condition, cb){
		var queryString = "UPDATE " + table;
		queryString += " SET ";
		queryString += objToSql(objectColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log(queryString);
		connection.query(queryString, function(err, result){
			if(err) throw err;
			cb(result);
		});
	}
}

module.exports = orm;