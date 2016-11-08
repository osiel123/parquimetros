function PrintWindow(args) {

	windowPrint = Ti.UI.createWindow({
		backgroundColor : Ti.App.backgroundColor,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical'
	});

	if (Ti.Platform.name == 'android') {
		windowPrint.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN;
	}

	viewBarPrint = Titanium.UI.createView({
		backgroundColor : Ti.App.appColor,
		width : Ti.UI.FILL,
		layout : 'horizontal',
		height : '60dp',
		top : 0
	});

	viewBackPrint = Ti.UI.createView({
		backgroundColor : 'transparent',
		width : '60dp',
		height : '100%',
		left : 0
	});

	imageViewBackIcon = Ti.UI.createImageView({
		bubbleParent : true,
		image : '/images/back_icon.png',
		height : '40dp',
		width : '40dp',
		bottom : '5dp'
	});

	labePayPrintTitle = Ti.UI.createLabel({
		text : L('select_printer'),
		font : {
			fontSize : Ti.App.titleFontSizeBig
		},
		color : Ti.App.labelTitleColor,
		bottom : '8dp',
		left : '5dp'
	});

	/**
	 *
	 */

	buttonRefresh = Ti.UI.createButton({
		title : L('refresh_device_list'),
		width : "60%",
		top : '20dp'
	});

	tableViewDevice = Ti.UI.createTableView({
		top : '20dp',
		height : "30%",
		backgroundColor : "white"
	});

	buttonToggleConnection = Ti.UI.createButton({
		title : L('connect'),
		width : "60%",
		top : '20dp'
	});

	buttonPrintFine = Ti.UI.createButton({
		title : L('print'),
		width : "60%",
		top : '50dp'
	});

	/**
	 *
	 */

	viewBackPrint.add(imageViewBackIcon);

	viewBarPrint.add(viewBackPrint);
	viewBarPrint.add(labePayPrintTitle);

	windowPrint.add(viewBarPrint);

	windowPrint.add(buttonRefresh);
	windowPrint.add(tableViewDevice);
	windowPrint.add(buttonToggleConnection);
	windowPrint.add(buttonPrintFine);

	windowPrint.open();

	/**
	 *
	 */

	PrinterUtils = require('/lib/print_utils_ios');
	var devices,
	    selectedDeviceIndex,
	    selectedRow;

	function refreshDeviceList() {
		var tableData;

		tableData = [];
		devices = [];

		PrinterUtils.getDeviceList().forEach(function(entry) {
			devices.push(entry.device);
			tableData.push({
				title : entry.name
			});
		});

		tableViewDevice.setData(tableData);

		selectedDeviceIndex = -1;
	}

	function tableClick(e) {
		if (selectedRow) {
			selectedRow.hasCheck = false;
		}

		selectedDeviceIndex = e.index;
		selectedRow = e.row;
		selectedRow.hasCheck = true;
	}


	tableViewDevice.addEventListener('click', function(e) {
		tableClick(e);
	});

	function toggleConnection() {
		if (PrinterUtils.isConnected()) {
			PrinterUtils.disconnect();
			return;
		}

		if (selectedDeviceIndex === -1) {
			showMessage(L('select_device'));
			return;
		}
		PrinterUtils.connect(devices[selectedDeviceIndex]);
	}


	buttonToggleConnection.addEventListener('click', function(e) {
		toggleConnection();
	});

	function printText() {
		var parking_meter = args.ticket_data.parking_meter;
		var parking_meter1 = parking_meter.substring(0, 35);
		var parking_meter2 = parking_meter.substring(35, parking_meter.length);

		var vehicle = args.ticket_data.vehicle;
		var vehicle1 = vehicle.substring(0, 35);
		var vehicle2 = vehicle.substring(35, vehicle.length);

/*
		PrinterUtils.print('! U1 setvar "media.tof" "0"' +
		//
		'"! U1 JOURNAL\r\n! U1 SETFF 50 2\r\n"' +
		//
		'^XA' +
		//
		'^FO5,600^GFA,750,750,10,,:::::O0FFJ03F8,O0FFJ07F8,O0FF8I07F8,:O0FFCI0FF8,L0200FFC001FF8,L0700IF003FF8,K01FC0IF80IF8,K03FE0NF8,K07FF0NF8,K07FF8NF8,K03FFCNF8,K01FFCNF8,::L0FFCNF8,:K01FFCNF8,::K03FFCNF8,K07FFCNF8,00C00IFCNF8,03E03IFCNF8,07LFCNF8,0MFCNF8,1MFCNF8,:0MFCNF8,07LFCNF8,03LFCNF8,00LFCNF8,007KFCNF8,003KFCNF8,001KFCNF8,I0KFCNF8,I07JFCNF8,I03JFCNF8,I01JFCNF8,J0JFCNF8,J07IFCNF8,J03IFCNF8,J01IFCNF8,K0IFCNF8,K07FFCNF8,K03FFCNF8,K01FFCNF8,L07FCNF8,L03FCNF8,L01FCNF8,M0FCNF8,M07CNF8,M03CNF8,M01CNF8,N0C,N04,N03JF8,N01JF,O0IFE,O07FF8,O03FF,O01FE,P07C,P038,P01,,:::' +
		//
		'^FS' +
		//
		'^CFA,20' +
		//
		'^AOB^FO10,5^FD' + args.ticket_data.date + '^FS' +
		//
		'^AOB^FO35,5^FDParquimetro: ' + parking_meter1 + '^FS' +
		//
		'^AOB^FO60,5^FD' + parking_meter2 + '^FS' +
		//
		'^AOB^FO85,5^FDTipo Multa: ' + args.ticket_data.ticket_type + '^FS' +
		//
		'^AOB^FO110,5^FDNo. Multa: ' + args.ticket_data.ticket_id + ' Numero de Matricula: ' + args.ticket_data.plates_number + '^FS' +
		//
		'^AOB^FO135,5^FDVehiculo: ' + vehicle1 + '^FS' +
		//
		'^AOB^FO160,5^FD' + vehicle2 + '^FS' +
		//
		'^AOB^FO185,5^FDInspector: ' + args.ticket_data.inpector + '^FS' +
		//
		'^FO210,5^GB1,650,3^FS' +
		//
		'^AOB^FO220,5^FDImporte: ' + args.ticket_data.cost + '^FS' +
		//
		'^AOB^FO245,5^FDImporte pagado: ' + args.ticket_data.total_payment + '^FS' +
		//
		'^AOB^FO270,5^FDEstado de Pago: ' + args.ticket_data.ticket_status + '^FS' +
		//
		'^AOB^FO295,5^FD' + args.ticket_data.discount_type + '^FS' +
		//
		'^AOB^FO320,5^FDMatriculas Detenidas: ' + args.ticket_data.detained_plates + '^FS' +
		//
		'^FO250,380^BY3^BEB,100,N,N^FD' + args.ticket_data.ticket_id + '^FS' +
		//
		'^XZ' + '\r\n');*/
		
		Ti.API.info('! U1 setvar "media.tof" "0"' +
		//
		'"! U1 JOURNAL\r\n! U1 SETFF 50 2\r\n"' +
		//
		'^XA' +
		//
		'^FO5,600^GFA,750,750,10,,:::::O0FFJ03F8,O0FFJ07F8,O0FF8I07F8,:O0FFCI0FF8,L0200FFC001FF8,L0700IF003FF8,K01FC0IF80IF8,K03FE0NF8,K07FF0NF8,K07FF8NF8,K03FFCNF8,K01FFCNF8,::L0FFCNF8,:K01FFCNF8,::K03FFCNF8,K07FFCNF8,00C00IFCNF8,03E03IFCNF8,07LFCNF8,0MFCNF8,1MFCNF8,:0MFCNF8,07LFCNF8,03LFCNF8,00LFCNF8,007KFCNF8,003KFCNF8,001KFCNF8,I0KFCNF8,I07JFCNF8,I03JFCNF8,I01JFCNF8,J0JFCNF8,J07IFCNF8,J03IFCNF8,J01IFCNF8,K0IFCNF8,K07FFCNF8,K03FFCNF8,K01FFCNF8,L07FCNF8,L03FCNF8,L01FCNF8,M0FCNF8,M07CNF8,M03CNF8,M01CNF8,N0C,N04,N03JF8,N01JF,O0IFE,O07FF8,O03FF,O01FE,P07C,P038,P01,,:::' +
		//
		'^FS' +
		//
		'^CFA,20' +
		//
		'^AOB^FO10,5^FD' + args.ticket_data.date + '^FS' +
		//
		'^AOB^FO35,5^FDParquimetro: ' + parking_meter1 + '^FS' +
		//
		'^AOB^FO60,5^FD' + parking_meter2 + '^FS' +
		//
		'^AOB^FO85,5^FDTipo Multa: ' + args.ticket_data.ticket_type + '^FS' +
		//
		'^AOB^FO110,5^FDNo. Multa: ' + args.ticket_data.ticket_id + ' Numero de Matricula: ' + args.ticket_data.plates_number + '^FS' +
		//
		'^AOB^FO135,5^FDVehiculo: ' + vehicle1 + '^FS' +
		//
		'^AOB^FO160,5^FD' + vehicle2 + '^FS' +
		//
		'^AOB^FO185,5^FDInspector: ' + args.ticket_data.inpector + '^FS' +
		//
		'^FO210,5^GB1,650,3^FS' +
		//
		'^AOB^FO220,5^FDImporte: ' + args.ticket_data.cost + '^FS' +
		//
		'^AOB^FO245,5^FDImporte pagado: ' + args.ticket_data.total_payment + '^FS' +
		//
		'^AOB^FO270,5^FDEstado de Pago: ' + args.ticket_data.ticket_status + '^FS' +
		//
		'^AOB^FO295,5^FD' + args.ticket_data.discount_type + '^FS' +
		//
		'^AOB^FO320,5^FDMatriculas Detenidas: ' + args.ticket_data.detained_plates + '^FS' +
		//
		'^FO250,380^BY3^BEB,100,N,N^FD' + args.ticket_data.ticket_id + '^FS' +
		//
		'^XZ' + '\r\n');

	}


	buttonPrintFine.addEventListener('click', function(e) {
		if (PrinterUtils.isConnected()) {
			printText();
			windowPrint.close();
		} else {
			showMessage(L('session_not_open'));
		}
	});

	windowPrint.addEventListener('close', function(e) {
		if (args.reprint == false) {
			Ti.App.fireEvent('fill_fines_data_consult');
		}
	});

	function updateGui() {
		if (PrinterUtils.isConnected()) {
			buttonToggleConnection.title = L('disconnect');
		} else {
			buttonToggleConnection.title = L('connect');
		}
	}


	Ti.App.addEventListener('printerConnected', updateGui);
	Ti.App.addEventListener('printerDisconnected', updateGui);
	Ti.App.addEventListener('printerError', function(e) {
		Ti.API.info('print error');
		showMessage(e.message.toString());
	});

	refreshDeviceList();
	updateGui();

	viewBackPrint.addEventListener('click', function(e) {
		windowPrint.close();
	});

	viewBackPrint.addEventListener('touchstart', function(e) {
		viewBackPrint.backgroundColor = Ti.App.selectedColor;
	});

	viewBackPrint.addEventListener('touchend', function(e) {
		viewBackPrint.backgroundColor = 'transparent';
	});

	viewBackPrint.addEventListener('touchcancel', function(e) {
		viewBackPrint.backgroundColor = 'transparent';
	});
}

module.exports = PrintWindow;
