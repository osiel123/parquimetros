exports.login = function(args, callback) {
	if (checkInternetConnection()) {

		var credentials = '{"user" : {"login" : "' + args.username + '", "password" : "' + args.password + '" }, "commit": "Sign in"}';

		var network = Titanium.Network.createHTTPClient();
		var url = Ti.App.hostname + '/users/sign_in.json';

		Ti.API.info('signIn url --------------------- ' + url);
		Ti.API.info('signIn credentials --------------------- ' + credentials);

		network.open('POST', url);
		network.setRequestHeader('Content-Type', 'application/json');
		network.send(credentials);

		network.setTimeout(7000);

		network.onerror = function(e) {
			Ti.API.info('Error signIn ------------ ' + JSON.stringify(e));
			showMessageError(L('error') + ' ' + L('try_again'));
			callback(false);
		};

		network.onload = function() {
			var response;

			try {
				response = JSON.parse(this.responseText);

				Ti.API.info('signIn response ------------------- ' + JSON.stringify(response));

				if (response.id == undefined) {
					callback(false);
				} else {
					callback(response);
				}

			} catch(ex) {
				Ti.API.info('login ex ' + ex.toString());
				callback(false);
			}

		};
	} else {
		callback(false);
	}
};

exports.signOut = function(callback) {
	var network = Titanium.Network.createHTTPClient();

	var url = Ti.App.hostname + '/users/sign_out.json';

	network.open('DELETE', url);
	network.setRequestHeader('Content-Type', 'application/json');
	network.send();

	network.setTimeout(7000);

	network.onerror = function(e) {
		Ti.API.info("Error signOut");
		callback(true);
	};

	network.onload = function() {
		callback(true);
	};
};

exports.getData = function(callback) {
	if (checkInternetConnection()) {

		var network = Titanium.Network.createHTTPClient();
		var url = Ti.App.hostname + '/mobile_services/get_data.json';

		Ti.API.info('getData url --------------------- ' + url);

		network.open('GET', url);
		network.setRequestHeader('Content-Type', 'application/json');
		network.send();

		network.setTimeout(7000);

		network.onerror = function(e) {
			Ti.API.info('Error getData ------------ ' + JSON.stringify(e));
			showMessageError(L('error') + ' ' + L('try_again'));
			callback(false);
		};

		network.onload = function() {
			var response;

			try {
				response = JSON.parse(this.responseText);

				Ti.API.info('getData response ------------------- ' + JSON.stringify(response));

				if (response.error != undefined) {
					showMessageError(response.error);
					callback(false);
				} else {
					callback(response);
				}

			} catch(ex) {
				Ti.API.info('getData ex ' + ex.toString());
				callback(false);
			}

		};
	} else {
		callback(false);
	}
};

exports.getPlates = function(args, callback) {
	if (checkInternetConnection()) {

		var network = Titanium.Network.createHTTPClient();
		var url = Ti.App.hostname + '/mobile_services/get_plates.json?plates_serial_number=' + args.plates_serial_number;

		Ti.API.info('getPlates url --------------------- ' + url);

		network.open('GET', url);
		network.setRequestHeader('Content-Type', 'application/json');
		network.send();

		network.setTimeout(7000);

		network.onerror = function(e) {
			Ti.API.info('Error getPlates ------------ ' + JSON.stringify(e));
			showMessageError(L('error') + ' ' + L('try_again'));
			callback(false);
		};

		network.onload = function() {
			var response;

			try {
				response = JSON.parse(this.responseText);

				Ti.API.info('getPlates response ------------------- ' + JSON.stringify(response));

				if (response.error != undefined) {
					showMessageError(response.error);
					callback(false);
				} else {
					callback(response);
				}

			} catch(ex) {
				Ti.API.info('getPlates ex ' + ex.toString());
				callback(false);
			}

		};
	} else {
		callback(false);
	}
};

exports.getTicketData = function(args, callback) {
	if (checkInternetConnection()) {

		var network = Titanium.Network.createHTTPClient();
		var url = Ti.App.hostname + '/mobile_services/get_ticket.json?ticket_id=' + args.ticket_id;

		Ti.API.info('getPlatesByTicket url --------------------- ' + url);

		network.open('GET', url);
		network.setRequestHeader('Content-Type', 'application/json');
		network.send();

		network.setTimeout(7000);

		network.onerror = function(e) {
			Ti.API.info('Error getTicketData ------------ ' + JSON.stringify(e));
			showMessageError(L('error') + ' ' + L('try_again'));
			callback(false);
		};

		network.onload = function() {
			var response;

			try {
				response = JSON.parse(this.responseText);

				Ti.API.info('getTicketData response ------------------- ' + JSON.stringify(response));

				if (response.error != undefined) {
					showMessageError(response.error);
					callback(false);
				} else {
					callback(response);
				}

			} catch(ex) {
				Ti.API.info('getTicketData ex ' + ex.toString());
				callback(false);
			}

		};
	} else {
		callback(false);
	}
};

exports.getTickets = function(args, callback) {
	if (checkInternetConnection()) {

		var network = Titanium.Network.createHTTPClient();
		var url = Ti.App.hostname + '/mobile_services/get_tickets.json?plates_serial_number=' + args.plates_serial_number;

		Ti.API.info('getTickets url --------------------- ' + url);

		network.open('GET', url);
		network.setRequestHeader('Content-Type', 'application/json');
		network.send();

		network.setTimeout(7000);

		network.onerror = function(e) {
			Ti.API.info('Error getTickets ------------ ' + JSON.stringify(e));
			callback(false);
		};

		network.onload = function() {
			var response;

			try {
				response = JSON.parse(this.responseText);

				Ti.API.info('getTickets response ------------------- ' + JSON.stringify(response));

				if (response.error != undefined) {
					showMessageError(response.error);
					callback(false);
				} else {
					callback(response);
				}

			} catch(ex) {
				Ti.API.info('getTickets ex ' + ex.toString());
				callback(false);
			}

		};
	} else {
		callback(false);
	}
};

exports.createTicket = function(args, callback) {
	if (checkInternetConnection()) {

		var data = '{"utf8":"✓", "latitude" : "' + Ti.App.Properties.getString('latitude') + '", "longitude" : "' + Ti.App.Properties.getString('longitude') + '", "ticket":{"plate_id":"' + args.plate_id + '", "plate_attributes":{"plates_number":"' + args.plates_number + '", "plate_type_id":"' + args.plate_type_id + '", "year":"' + args.plates_year + '", "city":"' + args.city + '", "state":"' + args.state + '", "owner":"' + args.owner + '", "vehicle_attributes":{"serial_number":"' + args.serial_number + '", "brand":"' + args.brand + '", "model":"' + args.model + '", "series":"' + args.series + '", "vehicle_type":"' + args.vehicle_type + '", "color":"' + args.color + '", "year":"' + args.vehicle_year + '"}}, "ticket_type_id":"' + args.ticket_type_id + '", "parking_meter_id":"' + args.parking_meter_id + '", "detained_plates":"' + args.detained_plates + '", "observations":"' + args.observations + '"}, "commit":"Crear Multa"}';

		var network = Titanium.Network.createHTTPClient();
		var url = Ti.App.hostname + '/mobile_services/create_ticket.json';

		Ti.API.info('createTicket url --------------------- ' + url);
		Ti.API.info('createTicket data --------------------- ' + data);

		network.open('POST', url);
		network.setRequestHeader('Content-Type', 'application/json');
		network.send(data);

		network.setTimeout(7000);

		network.onerror = function(e) {
			Ti.API.info('Error createTicket ------------ ' + JSON.stringify(e));
			showMessageError(L('error') + ' ' + L('try_again'));
			callback(false);
		};

		network.onload = function() {
			var response;

			try {
				response = JSON.parse(this.responseText);

				Ti.API.info('createTicket response ------------------- ' + JSON.stringify(response));

				if (response.error != undefined) {
					showMessageError(response.error);
					callback(false);
				} else {
					if (response.ticket == undefined) {
						var message = '';
						for (var i in response) {
							message += response[i] + '\n';
						}
						showMessage(message);
						callback(false);
					} else {
						callback(response);
					}
				}

			} catch(ex) {
				Ti.API.info('createTicket ex ' + ex.toString());
				callback(false);
			}

		};
	} else {
		callback(false);
	}
};

exports.makePayment = function(args, callback) {
	if (checkInternetConnection()) {

		var data = '{"utf8":"✓", "payment":{  "ticket_id":"' + args.ticket_id + '", "payment_type_id":"' + args.payment_type_id + '", "bill_id":"", "bill_attributes":{  "rfc":"' + args.rfc + '", "name":"' + args.name + '", "email":"' + args.email + '", "phone":"' + args.phone + '", "address1":"' + args.address1 + '", "address2":"' + args.address2 + '", "city":"' + args.city + '", "state":"' + args.state + '", "zip":"' + args.zip + '"}}, "commit":"Crear Pago"}';

		var network = Titanium.Network.createHTTPClient();
		var url = Ti.App.hostname + '/mobile_services/create_payment.json';

		Ti.API.info('makePayment url --------------------- ' + url);
		Ti.API.info('makePayment data --------------------- ' + data);

		network.open('POST', url);
		network.setRequestHeader('Content-Type', 'application/json');
		network.send(data);

		network.setTimeout(7000);

		network.onerror = function(e) {
			Ti.API.info('Error makePayment ------------ ' + JSON.stringify(e));
			showMessageError(L('error') + ' ' + L('try_again'));
			callback(false);
		};

		network.onload = function() {
			var response;

			try {
				response = JSON.parse(this.responseText);

				Ti.API.info('makePayment response ------------------- ' + JSON.stringify(response));

				if (response.error != undefined) {
					showMessageError(response.error);
					callback(false);
				} else {
					if (response.payment.ticket_id == undefined) {
						var message = '';
						for (var i in response) {
							message += response[i] + '\n';
						}
						showMessage(JSON.stringify(message));
						callback(false);
					} else {
						callback(response);
					}
				}

			} catch(ex) {
				Ti.API.info('makePayment ex ' + ex.toString());
				callback(false);
			}

		};
	} else {
		callback(false);
	}
};

exports.createTrack = function(callback) {
	var data = '{"utf8":"✓", "track":{"latitude" : "' + Ti.App.Properties.getString('latitude') + '", "longitude" : "' + Ti.App.Properties.getString('longitude') + '"}, "commit":"Crear Localizador"}';

	var network = Titanium.Network.createHTTPClient();
	var url = Ti.App.hostname + '/mobile_services/create_track.json';

	Ti.API.info('createTrack url --------------------- ' + url);
	Ti.API.info('createTrack data --------------------- ' + data);

	network.open('POST', url);
	network.setRequestHeader('Content-Type', 'application/json');
	network.send(data);

	network.setTimeout(7000);

	network.onerror = function(e) {
		Ti.API.info('Error createTrack ------------ ' + JSON.stringify(e));
		callback(true);
	};

	network.onload = function() {
		callback(true);
	};
};

function checkInternetConnection() {
	if (Ti.Network.online) {
		return true;
	} else {
		showInternetError();
		return false;
	}
};

function showInternetError() {
	var internetErrorDialog = Ti.UI.createAlertDialog({
		title : L('connection_error_title'),
		message : L('connection_error'),
		buttonNames : [L('cancel'), L('settings')]
	});

	internetErrorDialog.show();

	internetErrorDialog.addEventListener('click', function(evt) {
		if (evt.index == 1) {
			if (Ti.Platform.name == 'android') {
				var internetIntent = Titanium.Android.createIntent({
					action : 'android.settings.SETTINGS'
				});
				Ti.Android.currentActivity.startActivity(internetIntent);
			}
		}
	});
}

function reportPosition(e) {
	try {
		if (!e.success || e.error) {
		} else {
			latitude = e.coords.latitude;
			longitude = e.coords.longitude;

			Ti.App.Properties.setString('latitude', latitude);
			Ti.App.Properties.setString('longitude', longitude);

		}
	} catch (ex) {
		Ti.API.info('location error --------------- ' + ex);
	}
}

// this fires once
Titanium.Geolocation.getCurrentPosition(reportPosition);

// this fires whenever the distance filter is surpassed
Titanium.Geolocation.addEventListener('location', reportPosition);
