/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false*/
/*global module */

/*
 Note: This example requires that you specify the protocol name
 (com.zebra.rawport) used by the printer in the tiapp.xml file as follows:
 
    <ios>
        <plist>
            <dict>
				<key>UISupportedExternalAccessoryProtocols</key>
				<array>
					<string>com.zebra.rawport</string>
				</array>
            </dict>
        </plist>
    </ios>    
*/

var
	EAModule = require('com.logicallabs.externalaccessories'),
	Lib = require('printer/lib'),
	PROTOCOL_STRING = 'com.zebra.rawport',
	COMMANDS = [
		{
			name: 'Turn on ZPL',
			cmd: '! U1 setvar "device.languages" "zpl"'
		},
		{
			name: 'Turn on line print',
			cmd: '! U1 setvar "device.languages" "line_print"'
		},
		{
			name: 'Query current language',
			cmd: '! U1 getvar "device.languages"'
		},
		{
			name: 'Print via ZPL #1',
			cmd:
'^XA' +

'^FX Top section with company logo, name and address.' +
'^CF0,60' +
'^FO50,50^GB100,100,100^FS' +
'^FO75,75^FR^GB100,100,100^FS' +
'^FO88,88^GB50,50,50^FS' +
'^FO220,50^FDInternational Shipping, Inc.^FS' +
'^CF0,40' +
'^FO220,100^FD1000 Shipping Lane^FS' +
'^FO220,135^FDShelbyville TN 38102^FS' +
'^FO220,170^FDUnited States (USA)^FS' +
'^FO50,250^GB700,1,3^FS' +

'^FX Second section with recipient address and permit information.' +
'^CFA,30' +
'^FO50,300^FDJohn Doe^FS' +
'^FO50,340^FD100 Main Street^FS' +
'^FO50,380^FDSpringfield TN 39021^FS' +
'^FO50,420^FDUnited States (USA)^FS' +
'^CFA,15' +
'^FO600,300^GB150,150,3^FS' +
'^FO638,340^FDPermit^FS' +
'^FO638,390^FD123456^FS' +
'^FO50,500^GB700,1,3^FS' +

'^FX Third section with barcode.' +
'^BY5,2,270' +
'^FO175,550^BC^FD1234567890^FS' +

'^FX Fourth section (the two boxes on the bottom).' +
'^FO50,900^GB700,250,3^FS' +
'^FO400,900^GB1,250,3^FS' +
'^CF0,40' +
'^FO100,950^FDShipping Ctr. X34B-1^FS' +
'^FO100,1000^FDREF1 F00B47^FS' +
'^FO100,1050^FDREF2 BL4H8^FS' +
'^CF0,190' +
'^FO485,920^FDCA^FS' +

'^XZ'
		},
		{
			name: 'Print via ZPL #2',
			cmd: '^XA' +
				'^ADI,20,20' +
				'^FDLogical Labs^FS' + 
				'^XZ'
		}

	]
;

function createCommandPicker(params) {
	var self, picker, data, properties;
	
	
	properties = params.properties;
	
	self = {};
	
	picker = Ti.UI.createTableView();
	
	Lib.addProperties(picker, properties);

	data = [];
	
	COMMANDS.forEach(function(command) {
		data.push(Ti.UI.createTableViewRow({ title:command.name }));
	});

	picker.setData(data);

	picker.addEventListener('click', function(e) {
		Ti.API.info('Command changed!');
		data.forEach(function(row) {
			row.hasCheck = false;
		});
		data[e.index].hasCheck = true;
		params.callback(e);
	});
	
	self.getView = function() {
		return picker;
	};
	
	
	return self;
}

function getAccessoryRows(protocolString) {
	var accessories, accessoryRows;
	
	accessories = EAModule.connectedAccessories;

	accessoryRows = [];
	
	if (Titanium.Platform.model === 'Simulator') {
		// For testing the sample app's GUI
		accessories = [
			Lib.createFakeAccessory({
				name: 'Fake1',
				protocolStrings: ['com.zebra.rawport']
			})
		];
	}
		
	accessories.forEach(function(accessory) {
		Lib.printAccessoryInfo(accessory);
		// We filter for those accessories that support the desired protocol
		if (accessory.protocolStrings.indexOf(protocolString) > -1) {
			accessoryRows.push(Lib.createAccessoryRow(accessory));
		}
	});
	
	return accessoryRows;	
}


function updateTable(table, accessoryRows) {
	var tableData;
	
	tableData = [];
	accessoryRows.forEach(function(accessoryRow) {
		tableData.push(accessoryRow.getView());
	});
	table.data = tableData;
}

function createAccessoryWindow(accessory) {
	var self, win, textField, openSessionButton, printButton,
		closeSessionButton, commandPicker, currentCommandIndex,
		sendCommandButton;
	
	var session;
	
	function write(buffer) {
		if (session) {
			session.write({
				data: buffer
			});
		} else {
			alert('Session is not open!');
		}
	}
	
	function writeProgressHandler(e) {
		if (e.bytesWritten > -1) {
			alert('Wrote ' + e.bytesWritten + ' bytes!');
		} else {
			alert('Write failure!');
		}
	}
	function readHandler(e) {
		var msg;
		
		if (e.errorCode) {
			msg = 'Read failed!';
		} else {
			msg = 'Received ' + e.data.length + ' bytes!';
			Ti.API.info('Received data: ' + e.data);
		}
		
		Ti.API.info(msg);
		alert(msg);
	}

	function openSession() {
		if (session) {
			session.close();
		}
		
		session = accessory.openSession({
			protocol: 'com.zebra.rawport'
		});
		
		if (session) {
			alert('Session open!');
			session.addEventListener('receivedData', readHandler);
			session.addEventListener('writeProgress', writeProgressHandler);
		} else {
			alert('Failed to open session!');
		}
	}
	
	function closeSession() {
		// You can call close() on the session if you like but setting
		// it to null will release the underlying Objective C object
		// which automatically closes the connection.
		session = null;
		alert('Session is now closed!');
	}
	
	function disconnectEventHandler(e) {
		if (e.accessory.equals(accessory)) {
			session = null;
			win.close();
			alert('Accessory disconnected!');
		}
	}
	
	self = {};
	
	win = Ti.UI.createWindow({
		backgroundColor:'#8E8E8E',
		title: accessory.name,
		layout: 'vertical'
	});
	
	win.addEventListener('open', function() {
		Ti.API.info('Opening accessory window');
		EAModule.addEventListener('accessoryDisconnected', disconnectEventHandler);
		openSession();
	});

	win.addEventListener('close', function() {
		if (session) {
			closeSession();
		}
		EAModule.removeEventListener('accessoryDisconnected', disconnectEventHandler);
	});
	
	openSessionButton = Lib.createDefaultButton({
		title: 'Open Session'
	});

	openSessionButton.addEventListener('click', openSession);
		
	textField = Ti.UI.createTextField({
		width: Lib.scale(200), height: Lib.scale(40), top: Lib.scale(10),
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED 
	});

	printButton = Lib.createDefaultButton({
		title: 'Print Text Field'
	});

	printButton.addEventListener('click', function() {
		write(Ti.createBuffer({ value: textField.value }));
	});
		
	commandPicker = createCommandPicker({
		properties: {
			top: Lib.scale(10),
			height: Lib.scale(100)
		},
		callback: function(e) {
			currentCommandIndex = e.index;
		}
	});
	
	sendCommandButton = Lib.createDefaultButton({
		title: 'Send command',
		top: Lib.scale(20)
	});
	
	sendCommandButton.addEventListener('click', function(e) {
		Ti.API.info('Current command index: ' + currentCommandIndex);
		write(Ti.createBuffer({
				value: COMMANDS[currentCommandIndex].cmd + '\r\n'
		}));
	});
	
		closeSessionButton = Lib.createDefaultButton({
		title: 'Close Session'
	});

	closeSessionButton.addEventListener('click', function() {
	});
		
	win.add(textField);
	win.add(printButton);
	win.add(commandPicker.getView());
	win.add(sendCommandButton);
	win.add(openSessionButton);
	win.add(closeSessionButton);
	
	
	self.getView = function() {
		return win;
	};
		
	return self;
}


function MainView(params) {
	// params:
	//	navigationWindow: The navigation window, root of the apps GUI.

	var self, header,
		refreshAccessoriesButton, table, pickerButton,
		accessoryRows
	;
	var open = false;
	
	function refreshAccessories() {
		accessoryRows = getAccessoryRows(PROTOCOL_STRING);
		updateTable(table, accessoryRows);
	}
	
	function shutdown() {

	}
	
	self = Ti.UI.createView({  
	    layout: 'vertical',
		backgroundColor: '#8E8E8E'
	});

	header = Ti.UI.createLabel({
		text: L('paired_accesories'),
		color: 'white',
		font: {
			fontSize: Lib.scale(12)
		}
	});

	self.add(header);
	
	table = Ti.UI.createTableView({
		width: Ti.UI.FILL,
		backgroundColor:'#8E8E8E',
		top: Lib.scale(10),
		height: Lib.scale(200)
	});
	
	table.addEventListener('click', function(e) {
		var accessory, accessoryWindow;
		
		accessory = accessoryRows[e.index].getAccessory();
		
		accessoryWindow = createAccessoryWindow(accessory);
		
		params.navigationWindow.openWindow(accessoryWindow.getView(), {animetad: true});
	});
	
	self.add(table);
	
	refreshAccessoriesButton = Lib.createDefaultButton({
		title: L('refresh_acesory_list'),
		top: Lib.scale(20)
	});
	
	refreshAccessoriesButton.addEventListener('click', refreshAccessories);
	
	self.add(refreshAccessoriesButton);
	
	pickerButton = Lib.createDefaultButton({
		title: L('pair_acesory'),
		top: Lib.scale(20)
	});
	
	pickerButton.addEventListener('click', function(e) {
		EAModule.showPicker({
			filterCallback: function(accessoryName) {
				Ti.API.info('Accessory name: '  + accessoryName);
				// We will accept anything, which is the default so you don't
				// need to prived a filterCallback if this is satisfactory.
				// You can, however, add more sophisticated logic here
				// if you wish to limit the entries shown by the picker.
				return true;
			}
		});
	});
	
	self.add(pickerButton);
	
	EAModule.addEventListener('pickerFinished', function(e) {
		if (!open) {
			return;
		}
		switch (e.errorCode) {
			case EAModule.PICKER_ERROR_ALREADY_CONNECTED:
				alert('Already connected!');
				break;
			case EAModule.PICKER_ERROR_NOT_FOUND:
				alert('Not found!');
				break;
			case EAModule.PICKER_ERROR_CANCELLED:
				alert('Picker cancelled!');
				break;
			case EAModule.PICKER_ERROR_UNKNOWN:
				alert('Unknown error!');
				break;
		}
	});
	
	var timer;
	
	EAModule.addEventListener('accessoryConnected', function(e) {
		if (!open) {
			return;
		}
		refreshAccessories();
		if (e.selected) {
			// This means the accessory connected because the user selected
			// it from the picker -- we might as well open a window for it!
			// With a little delay, to let the connection settle down...
			
			if (timer) {
				// We may get more than one accessoryConnected event in
				// quick succession, we only want one window... 
				clearTimeout(timer);
			}
			timer = setTimeout(function() {
				params.navigationWindow.openWindow(
					createAccessoryWindow(e.accessory).getView(),
					{animetad: true});
			}, 1000);
		}
	});
	
	EAModule.addEventListener('accessoryDisconnected', function(e) {
		if (!open) {
			return;
		}
		refreshAccessories();
	});
	
	refreshAccessories();
	
	self.addEventListener('opening', function() {
		open = true;
	});
	
	self.addEventListener('closing', function() {
		shutdown();
		open = false;
	});
	return self;
}

module.exports = MainView;