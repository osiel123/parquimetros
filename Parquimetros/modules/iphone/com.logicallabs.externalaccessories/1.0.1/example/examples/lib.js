/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false bitwise:true*/

var centralErrorCallback, centralOffCallback,
centralOnCallback;
var centralStateChangeCallbackAdded;

function isAndroid() {
	return Ti.Platform.osname === 'android';
}
exports.isAndroid = isAndroid;

function isIOS() {
	return Ti.Platform.osname === 'iphone' || Ti.Platform.osname === 'ipad';
}
exports.isIOS = isIOS;

function log(text) {
	Ti.API.info(text);
}
exports.log = log;	

function addProperties(view, params) {
	var prop;
	
	for (prop in params) {
		if (params.hasOwnProperty(prop)) {
			view[prop] = params[prop];
		}
	}
}
exports.addProperties = addProperties;

function scale(dimension) {
	return Math.round(dimension * Ti.Platform.displayCaps.platformWidth / 320);
}
exports.scale = scale;

exports.createStatusLabel = function(params) {
	var result;
	
	result = Ti.UI.createLabel({
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP,
		height: scale(30), left: scale(10),
		right: scale(10), top: scale(10),
		color: 'white',
		font: {
			fontSize: scale(12)
		}
	});
	
	addProperties(result, params);

	return result;
};

exports.createDescriptionLabel = function(params) {
	var result;
	
	result = Ti.UI.createLabel({
		top: scale(10),
		left: scale(10), right: scale(10),
		font: {
			fontSize: scale(10)
		},
		color: 'white',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_TOP
	});

	addProperties(result, params);

	return result;
};

exports.createDefaultButton = function(params) {
	var result, prop;
	
	result = Ti.UI.createButton({
		width: scale(200), height: scale(40), top: scale(10),
		color: 'white',
		backgroundImage: '/images/button.png',
		backgroundLeftCap: 7,
		backgroundSelectedColor: '#8C92AC',
		font: {
			fontSize: scale(12)
		}
	});

	addProperties(result, params);
		
	return result;
};

exports.printAccessoryInfo = function(accessory) {
	var protocolStrings;
	
	Ti.API.info('Name: ' + accessory.name);
	Ti.API.info('Manufacturer: ' + accessory.manufacturer);

	protocolStrings = '';
	
	accessory.protocolStrings.forEach(function(str) {
		protocolStrings += str + ', ';
	});
	
	Ti.API.info('Protocols: ' + protocolStrings);
};

exports.createAccessoryRow = function(accessory) {
	var self, view;

	self = {};
	
	view = Ti.UI.createTableViewRow({
		title: accessory.name,
		backgroundColor:'#8E8E8E',
		color: 'white',
		font: {
			fontSize: scale(12)
		}
	});
	
	self.getView = function() {
		return view;
	};
	
	self.getAccessory = function() {
		return accessory;
	};
	return self;
};

exports.printErrorInfo = function(accessory) {
	Ti.API.info('Error Code: ' + accessory.errorCode);
	Ti.API.info('Error Domain: ' + accessory.errorDomain);
	Ti.API.info('Error Description: ' + accessory.errorDescription);
};

exports.createFakeAccessory = function(params) {
	// For testing the sample app UI...
	
	var self;
	
	self = {};
	
	addProperties(self, params);
	
	self.openSession = function() {
		alert('This is a fake accessory, cannot open session!');
	};
	
	return self;
};
