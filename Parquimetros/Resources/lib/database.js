function createDatabase() {
	try {
		var db = Ti.Database.open('parquimetrosmovil');

		db.execute('CREATE TABLE IF NOT EXISTS Users(Id INTEGER, UserId INTEGER, FirstName TEXT, LastName TEXT, RoleId INTEGER, Username TEXT, Email TEXT)');

		db.close();

		return true;
	} catch(e) {
		db.close();
		Ti.API.info('createDatabase Error --------------------- ' + e);
		return false;
	}
}

exports.setUser = function(args, callback) {
	if (createDatabase()) {
		var db = Ti.Database.open('parquimetrosmovil');

		try {
			db.execute('DELETE FROM Users WHERE Id = 1;');
			db.execute("INSERT INTO Users(Id, UserId, FirstName, LastName, RoleId, Username, Email) VALUES (1, '" + args.user_id + "', '" + args.first_name + "', '" + args.last_name + "', " + args.role_id + ", '" + args.username + "', '" + args.email + "');");

			db.close();

			callback(true);
		} catch(e) {
			Ti.API.info('setUser Error --------------------- ' + e);
			db.close();
			callback(false);
		}
	}
};

exports.selectUserName = function(args, callback) {
	if (createDatabase()) {
		var db = Ti.Database.open('parquimetrosmovil');
		try {

			if (args.person == false) {
				var username = '';
				//Traer nombre de usuario
				var row = db.execute('SELECT Username FROM Users WHERE Id = 1;');

				if (row.isValidRow()) {
					username = row.fieldByName('Username');
				};
				row.close();

				db.close();

				Ti.API.info('selectUserName ---------------- ' + username);

				callback(username);

			} else {
				var person_name = '';

				var person_row = db.execute('SELECT FirstName || " " || LastName As Person FROM Users WHERE Id =  1;');

				if (person_row.isValidRow()) {
					person_name = person_row.fieldByName('Person');
				};
				person_row.close();

				db.close();

				callback(person_name);
			}

		} catch(e) {
			Ti.API.info('selectUserName Error --------------------- ' + e);
			db.close();
			callback('');
		}
	}
};

exports.deleteUser = function(callback) {
	if (createDatabase()) {

		var db = Ti.Database.open('parquimetrosmovil');

		try {
			db.execute("DELETE FROM Users WHERE Id = 1;");

			db.close();

			callback(true);
		} catch(e) {
			Ti.API.info('deleteUser Error --------------------- ' + e);
			db.close();
			callback(false);
		}
	}
};
