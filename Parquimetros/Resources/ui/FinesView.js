function FinesView() {

	var network = require('/lib/network');

	var enabledTtextField = false;

	if (Ti.Platform.name == 'android') {
		enabledTtextField = true;
	}

	viewFinesContainer = Ti.UI.createView({
		top : 0,
		backgroundColor : Ti.App.backgroundColor
	});

	scrollViewFinesContent = Ti.UI.createScrollView({
		showVerticalScrollIndicator : true,
		scrollType : 'vertical',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical'
	});

	/***/

	labelTitleEnrollment = Ti.UI.createLabel({
		text : L('enrollment'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : '3dp',
		width : '95%',
		font : {
			fontSize : Ti.App.titleFontSizeBig
		},
		color : Ti.App.labelTitleColor,
		backgroundColor : Ti.App.labelBackgroundColor,
		borderColor : Ti.App.labelBorderColor
	});

	labelEnrollmentNumber = Ti.UI.createLabel({
		text : L('enrollment_number'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	viewEnrollmentNumber = Ti.UI.createView({
		top : 0,
		height : Ti.UI.SIZE,
		width : '90%'
	});

	textFieldEnrollmentNumber = Ti.UI.createTextField({
		//autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_ALL,
		value : '',
		plate_id : '',
		hintText : L('plates_serial_number'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '78%',
		font : {
			fontSize : Ti.App.fontSize
		},
		left : 0
	});

	indicatorPlates = Ti.UI.createActivityIndicator({
		style : (Ti.Platform.name == 'android' ? Titanium.UI.ActivityIndicatorStyle.BIG : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG),
		center : {
			x : '50%'
		}
	});

	viewButtonPlatesContainer = Ti.UI.createView({
		right : 0,
		width : '20%',
		height : Ti.UI.SIZE
	});

	buttonPlatesSerialNumber = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : '50dp',
		borderRadius : 4,
		backgroundColor : Ti.App.buttonColor,
		color : Ti.App.buttonTextColor
	});

	imageViewSearchPlates = Ti.UI.createImageView({
		bubbleParent : true,
		touchEnabled : false,
		image : '/images/search_icon.png',
		width : '25dp',
		height : '25dp'
	});

	labelEnrollmentType = Ti.UI.createLabel({
		text : L('enrollment_type'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	pickerEnrollmentType = Ti.UI.createPicker({
		selectionIndicator : true,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		width : '90%',
		top : '10dp',
		bottom : '25dp',
		font : {
			fontSize : Ti.App.fontSize
		}
	});
	//
	(Ti.Platform.osname == 'android' ? pickerEnrollmentType.height = '50dp' : pickerEnrollmentType.height = '150dp');

	viewEnrollmentType = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});

	textFieldEnrollmentType = Ti.UI.createTextField({
		enabled : enabledTtextField,
		selectedId : -1,
		value : '',
		hintText : L('please_select'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelEnrollmentYear = Ti.UI.createLabel({
		text : L('year'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldEnrollmentYear = Ti.UI.createTextField({
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		maxLength : 4,
		value : '',
		hintText : L('optional'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelEnrollmentCity = Ti.UI.createLabel({
		text : L('city'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldEnrollmentCity = Ti.UI.createTextField({
		//autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
		value : 'Delicias',
		hintText : L('optional'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelEnrollmentState = Ti.UI.createLabel({
		text : L('state'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldEnrollmentState = Ti.UI.createTextField({
		//autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
		value : 'Chihuahua',
		hintText : L('mandatory'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelEnrollmentOwner = Ti.UI.createLabel({
		text : L('owner'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldEnrollmentOwner = Ti.UI.createTextField({
		//autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
		value : '',
		hintText : L('optional'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	/***/

	labelTitleVehicle = Ti.UI.createLabel({
		text : L('vehicle'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : '10dp',
		width : '95%',
		font : {
			fontSize : Ti.App.titleFontSizeBig
		},
		color : Ti.App.labelTitleColor,
		backgroundColor : Ti.App.labelBackgroundColor,
		borderColor : Ti.App.labelBorderColor
	});

	labelSerieNumber = Ti.UI.createLabel({
		text : L('serie_number'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldSerialNumber = Ti.UI.createTextField({
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		value : '',
		hintText : L('optional'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelBrand = Ti.UI.createLabel({
		text : L('brand'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldBrand = Ti.UI.createTextField({
		//autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
		value : '',
		hintText : L('mandatory'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelModel = Ti.UI.createLabel({
		text : L('model'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldModel = Ti.UI.createTextField({
		//autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
		value : '',
		hintText : L('mandatory'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelSeriesLine = Ti.UI.createLabel({
		text : L('series_line'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldSeriesLine = Ti.UI.createTextField({
		//autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_ALL,
		value : '',
		hintText : L('optional'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelVehicleType = Ti.UI.createLabel({
		text : L('vehicle_type'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldVehicleType = Ti.UI.createTextField({
		//autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
		value : '',
		hintText : L('optional'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelVehicleColor = Ti.UI.createLabel({
		text : L('color'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldVehicleColor = Ti.UI.createTextField({
		//autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
		value : '',
		hintText : L('optional'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelVehicleYear = Ti.UI.createLabel({
		text : L('year'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldVehicleYear = Ti.UI.createTextField({
		keyboardType : Ti.UI.KEYBOARD_DECIMAL_PAD,
		maxLength : 4,
		value : '',
		hintText : L('optional'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	/***/

	labelTitleFine = Ti.UI.createLabel({
		text : L('fine'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : '10dp',
		width : '95%',
		font : {
			fontSize : Ti.App.titleFontSizeBig
		},
		color : Ti.App.labelTitleColor,
		backgroundColor : Ti.App.labelBackgroundColor,
		borderColor : Ti.App.labelBorderColor
	});

	labelFineType = Ti.UI.createLabel({
		text : L('fine_type'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	pickerFineType = Ti.UI.createPicker({
		selectionIndicator : true,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		width : '90%',
		top : '10dp',
		bottom : '25dp',
		font : {
			fontSize : Ti.App.fontSize
		}
	});
	//
	(Ti.Platform.osname == 'android' ? pickerFineType.height = '50dp' : pickerFineType.height = '150dp');

	viewFineType = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});

	textFieldFineType = Ti.UI.createTextField({
		enabled : enabledTtextField,
		selectedId : -1,
		value : '',
		hintText : L('please_select'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	labelParquimeter = Ti.UI.createLabel({
		text : L('parquimeter'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	pickerParquimeter = Ti.UI.createPicker({
		selectionIndicator : true,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		width : '90%',
		top : '10dp',
		bottom : '25dp',
		font : {
			fontSize : Ti.App.fontSize
		}
	});
	//
	(Ti.Platform.osname == 'android' ? pickerParquimeter.height = '50dp' : pickerParquimeter.height = '150dp');

	viewParquimeter = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});

	textFieldParquimeter = Ti.UI.createTextField({
		enabled : enabledTtextField,
		selectedId : -1,
		value : '',
		hintText : L('please_select'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	viewTuitionDetained = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : '90%',
		layout : 'horizontal'
	});

	labelComments = Ti.UI.createLabel({
		text : L('comments'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textAreaComments = Ti.UI.createTextArea({
		//autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_SENTENCES,
		hintText : L('optional'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		height : '80dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});

	switchTuitionDetained = Ti.UI.createSwitch({
		touchEnabled : false
	});

	if (Ti.Platform.name == "android")
		switchTuitionDetained.style = Titanium.UI.Android.SWITCH_STYLE_CHECKBOX;

	labelTuitionDetained = Ti.UI.createLabel({
		text : L('tuiton_detained'),
		width : Ti.UI.SIZE,
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	scrollViewMediaContainer = Ti.UI.createScrollView({
		scrollType : 'horizontal',
		layout : 'horizontal',
		width : '90%',
		height : Ti.UI.SIZE,
		top : '15dp',
		bottom : '15dp'
	});

	/***/

	viewCreateFineContainer = Ti.UI.createView({
		width : '70%',
		height : '50dp',
		left : '2.5%',
		bottom : '10dp',
		top : '10dp',
	});

	indicatorCreateFine = Ti.UI.createActivityIndicator({
		style : (Ti.Platform.name == 'android' ? Titanium.UI.ActivityIndicatorStyle.BIG : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG),
		center : {
			x : '50%'
		}
	});

	buttonCreateFine = Ti.UI.createButton({
		title : L('create_fine'),
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		left : 0,
		top : 0,
		bottom : 0,
		borderRadius : 4,
		backgroundColor : Ti.App.buttonColor,
		color : Ti.App.buttonTextColor
	});

	/**
	 * addContent
	 */

	/*Matricula*/
	buttonPlatesSerialNumber.add(imageViewSearchPlates);

	viewButtonPlatesContainer.add(indicatorPlates);
	viewButtonPlatesContainer.add(buttonPlatesSerialNumber);

	viewEnrollmentNumber.add(textFieldEnrollmentNumber);
	viewEnrollmentNumber.add(viewButtonPlatesContainer);

	viewEnrollmentType.add(textFieldEnrollmentType);

	scrollViewFinesContent.add(labelTitleEnrollment);
	scrollViewFinesContent.add(labelEnrollmentNumber);
	scrollViewFinesContent.add(viewEnrollmentNumber);
	scrollViewFinesContent.add(labelEnrollmentType);
	scrollViewFinesContent.add(viewEnrollmentType);
	scrollViewFinesContent.add(labelEnrollmentYear);
	scrollViewFinesContent.add(textFieldEnrollmentYear);
	scrollViewFinesContent.add(labelEnrollmentCity);
	scrollViewFinesContent.add(textFieldEnrollmentCity);
	scrollViewFinesContent.add(labelEnrollmentState);
	scrollViewFinesContent.add(textFieldEnrollmentState);
	scrollViewFinesContent.add(labelEnrollmentOwner);
	scrollViewFinesContent.add(textFieldEnrollmentOwner);

	/*Vehiculo*/
	scrollViewFinesContent.add(labelTitleVehicle);
	scrollViewFinesContent.add(labelSerieNumber);
	scrollViewFinesContent.add(textFieldSerialNumber);
	scrollViewFinesContent.add(labelBrand);
	scrollViewFinesContent.add(textFieldBrand);
	scrollViewFinesContent.add(labelModel);
	scrollViewFinesContent.add(textFieldModel);
	scrollViewFinesContent.add(labelSeriesLine);
	scrollViewFinesContent.add(textFieldSeriesLine);
	scrollViewFinesContent.add(labelVehicleType);
	scrollViewFinesContent.add(textFieldVehicleType);
	scrollViewFinesContent.add(labelVehicleColor);
	scrollViewFinesContent.add(textFieldVehicleColor);
	scrollViewFinesContent.add(labelVehicleYear);
	scrollViewFinesContent.add(textFieldVehicleYear);

	/*Multa*/
	viewTuitionDetained.add(switchTuitionDetained);
	viewTuitionDetained.add(labelTuitionDetained);

	viewFineType.add(textFieldFineType);

	viewParquimeter.add(textFieldParquimeter);

	scrollViewFinesContent.add(labelTitleFine);
	scrollViewFinesContent.add(labelFineType);
	scrollViewFinesContent.add(viewFineType);
	scrollViewFinesContent.add(labelParquimeter);
	scrollViewFinesContent.add(viewParquimeter);
	scrollViewFinesContent.add(labelComments);
	scrollViewFinesContent.add(textAreaComments);
	scrollViewFinesContent.add(viewTuitionDetained);
	scrollViewFinesContent.add(scrollViewMediaContainer);

	viewCreateFineContainer.add(indicatorCreateFine);
	viewCreateFineContainer.add(buttonCreateFine);

	scrollViewFinesContent.add(viewCreateFineContainer);

	viewFinesContainer.add(scrollViewFinesContent);

	/**
	 *eventListeners
	 */

	textFieldEnrollmentNumber.addEventListener('return', function(e) {
		if (textFieldEnrollmentNumber.value.trim().length > 0) {
			searchPlatesSerialNumber(function(search_plates_response) {
				fillFinesData(search_plates_response);
			});
		}
	});

	buttonPlatesSerialNumber.addEventListener('click', function(e) {
		if (textFieldEnrollmentNumber.value.trim().length > 0) {
			searchPlatesSerialNumber(function(search_plates_response) {
				fillFinesData(search_plates_response);
				if (search_plates_response == false) {
					showMessage(L('plate_serial_not_found'));
				} else {
					showMessage(L('plate_serial_found'));
				}
			});
		}
	});

	buttonCreateFine.addEventListener('click', function(e) {
		showCreatingIndicator(true);

		if (validFinesData()) {

			network.createTicket({
				/**plate_attributes**/
				plate_id : textFieldEnrollmentNumber.plate_id,
				plates_number : textFieldEnrollmentNumber.value.trim(),
				plate_type_id : textFieldEnrollmentType.selectedId, //pickerEnrollmentType.getSelectedRow(0).value,
				plates_year : textFieldEnrollmentYear.value.trim(),
				city : textFieldEnrollmentCity.value.trim(),
				state : textFieldEnrollmentState.value.trim(),
				owner : textFieldEnrollmentOwner.value.trim(),
				/**vehicle_attributes**/
				serial_number : textFieldSerialNumber.value.trim(),
				brand : textFieldBrand.value.trim(),
				model : textFieldModel.value.trim(),
				series : textFieldSeriesLine.value.trim(),
				vehicle_type : textFieldVehicleType.value.trim(),
				color : textFieldVehicleColor.value.trim(),
				vehicle_year : textFieldVehicleYear.value.trim(),
				/**ticket_attributes**/
				ticket_type_id : textFieldFineType.selectedId, //pickerFineType.getSelectedRow(0).value,
				parking_meter_id : textFieldParquimeter.selectedId, //pickerParquimeter.getSelectedRow(0).value,
				detained_plates : switchTuitionDetained.value,
				observations : textAreaComments.value.trim()
			}, function(create_ticket_response) {
				if (create_ticket_response != false) {

					showMessage(L('ticket_created') + '\n' + L('fine_no') + ' ' + create_ticket_response.ticket.id);
					clearFinesData();
					showCreatingIndicator(false);

					/**Proceso de Impresión (Solo ios)**/
					if (Ti.Platform.name !== 'android') {

						/*********/

						PrintWindow = require('/ui/PrintWindow');
						new PrintWindow({
							ticket_data : create_ticket_response.ticket_info,
							reprint : false
						});

						/*********/

					}
				} else {
					showCreatingIndicator(false);
				}
			});
		} else {
			showCreatingIndicator(false);
			//scrollViewFinesContent.scrollTo(0, 0);
		}
	});

	viewTuitionDetained.addEventListener('click', function(e) {
		if (switchTuitionDetained.value == true) {
			switchTuitionDetained.value = false;
		} else {
			switchTuitionDetained.value = true;
		}
	});

	/**
	 *funciones
	 */

	searchPlatesSerialNumber = function(callback) {
		if (Ti.Platform.name == 'android') {
			Ti.UI.Android.hideSoftKeyboard();
		}

		showSearchingPlatesIndicator(true);

		network.getPlates({
			plates_serial_number : textFieldEnrollmentNumber.value.trim()
		}, function(get_plates_response) {
			if (get_plates_response != false) {

				showSearchingPlatesIndicator(false);
				callback(get_plates_response);
			} else {
				showSearchingPlatesIndicator(false);
				callback(false);
			}
		});
	};

	function fillFinesData(data) {
		try {

			if (data != false) {

				if (data.length != undefined) {

					SelectPlatesModalWindow = require('ui/SelectPlatesModalWindow');
					new SelectPlatesModalWindow({
						textField : textFieldEnrollmentNumber,
						plates : data
					}).open();
					return;
				}

				textFieldEnrollmentNumber.plate_id = data.plate.id;

				/*Matricula*/
				/*if (pickerEnrollmentType.columns[0]) {
				 for (var i = 0; i < pickerEnrollmentType.columns[0].rows.length; i++) {
				 if (pickerEnrollmentType.columns[0].rows[i].value == data.plate_type.id) {
				 pickerEnrollmentType.setSelectedRow(0, i, true);
				 }
				 }
				 }*/
				textFieldEnrollmentType.selectedId = data.plate_type.id;
				textFieldEnrollmentType.value = data.plate_type.name;

				textFieldEnrollmentYear.value = data.plate.year;
				textFieldEnrollmentCity.value = data.plate.city;
				textFieldEnrollmentState.value = data.plate.state;
				textFieldEnrollmentOwner.value = data.plate.owner;

				/*Vehiculo*/
				textFieldSerialNumber.value = data.vehicle.serial_number;
				textFieldBrand.value = data.vehicle.brand;
				textFieldModel.value = data.vehicle.model;
				textFieldSeriesLine.value = data.vehicle.series;
				textFieldVehicleType.value = data.vehicle.vehicle_type;
				textFieldVehicleColor.value = data.vehicle.color;
				textFieldVehicleYear.value = data.vehicle.year;

				pickerEnrollmentType.enabled = false;
				textFieldEnrollmentYear.setTouchEnabled(false);
				textFieldEnrollmentCity.setTouchEnabled(false);
				textFieldEnrollmentState.setTouchEnabled(false);
				textFieldEnrollmentOwner.setTouchEnabled(false);

				textFieldSerialNumber.setTouchEnabled(false);
				textFieldBrand.setTouchEnabled(false);
				textFieldModel.setTouchEnabled(false);
				textFieldSeriesLine.setTouchEnabled(false);
				textFieldVehicleType.setTouchEnabled(false);
				textFieldVehicleColor.setTouchEnabled(false);
				textFieldVehicleYear.setTouchEnabled(false);

			} else {
				textFieldEnrollmentNumber.plate_id = '';

				/*Matricula*/
				//pickerEnrollmentType.setSelectedRow(0, 0, true);
				textFieldEnrollmentType.selectedId = -1;
				textFieldEnrollmentType.value = '';
				textFieldEnrollmentYear.value = '';
				textFieldEnrollmentCity.value = 'Delicias';
				textFieldEnrollmentState.value = 'Chihuahua';
				textFieldEnrollmentOwner.value = '';

				/*Vehiculo*/
				textFieldSerialNumber.value = '';
				textFieldBrand.value = '';
				textFieldModel.value = '';
				textFieldSeriesLine.value = '';
				textFieldVehicleType.value = '';
				textFieldVehicleColor.value = '';
				textFieldVehicleYear.value = '';

				/*Media*/
				removeChildrens(scrollViewMediaContainer);

				pickerEnrollmentType.enabled = true;
				textFieldEnrollmentYear.setTouchEnabled(true);
				textFieldEnrollmentCity.setTouchEnabled(true);
				textFieldEnrollmentState.setTouchEnabled(true);
				textFieldEnrollmentOwner.setTouchEnabled(true);

				textFieldSerialNumber.setTouchEnabled(true);
				textFieldBrand.setTouchEnabled(true);
				textFieldModel.setTouchEnabled(true);
				textFieldSeriesLine.setTouchEnabled(true);
				textFieldVehicleType.setTouchEnabled(true);
				textFieldVehicleColor.setTouchEnabled(true);
				textFieldVehicleYear.setTouchEnabled(true);
			}

		} catch(ex) {
			Ti.API.info('fillFinesData ex ' + ex);
		}
	}

	function clearFinesData() {

		textFieldEnrollmentNumber.plate_id = '';

		/*Matricula*/
		//pickerEnrollmentType.setSelectedRow(0, 0, false);
		textFieldEnrollmentType.selectedId = -1;
		textFieldEnrollmentType.value = '';
		textFieldEnrollmentNumber.value = '';
		textFieldEnrollmentYear.value = '';
		textFieldEnrollmentCity.value = 'Delicias';
		textFieldEnrollmentState.value = 'Chihuahua';
		textFieldEnrollmentOwner.value = '';

		/*Vehiculo*/
		textFieldSerialNumber.value = '';
		textFieldBrand.value = '';
		textFieldModel.value = '';
		textFieldSeriesLine.value = '';
		textFieldVehicleType.value = '';
		textFieldVehicleColor.value = '';
		textFieldVehicleYear.value = '';

		/*Multas*/
		//pickerFineType.setSelectedRow(0, 0, false);
		textFieldFineType.selectedId = -1;
		textFieldFineType.value = '';
		//pickerParquimeter.setSelectedRow(0, 0, false);
		textFieldParquimeter.selectedId = -1;
		textFieldParquimeter.value = '';

		/*Media*/
		removeChildrens(scrollViewMediaContainer);

		pickerEnrollmentType.enabled = true;
		textFieldEnrollmentYear.setTouchEnabled(true);
		textFieldEnrollmentCity.setTouchEnabled(true);
		textFieldEnrollmentState.setTouchEnabled(true);
		textFieldEnrollmentOwner.setTouchEnabled(true);

		textFieldSerialNumber.setTouchEnabled(true);
		textFieldBrand.setTouchEnabled(true);
		textFieldModel.setTouchEnabled(true);
		textFieldSeriesLine.setTouchEnabled(true);
		textFieldVehicleType.setTouchEnabled(true);
		textFieldVehicleColor.setTouchEnabled(true);
		textFieldVehicleYear.setTouchEnabled(true);

		//textFieldEnrollmentNumber.focus();
	}

	function validFinesData() {

		if (textFieldEnrollmentNumber.value.trim().length == 0) {
			showMessage(L('enter_enrollment_number'));
			textFieldEnrollmentNumber.focus();
			return false;
		}
		if (textFieldEnrollmentType.selectedId == -1) {
			showMessage(L('select_enrollment_type'));
			textFieldEnrollmentType.focus();
			return false;
		}
		if (textFieldEnrollmentYear.value.trim().length != 0) {
			if (!isInt(textFieldEnrollmentYear.value.trim())) {
				showMessage(L('enter_year_correctly'));
				textFieldEnrollmentYear.focus();
				return false;
			}
		}
		if (textFieldEnrollmentState.value.trim().length == 0) {
			showMessage(L('enter_state'));
			textFieldEnrollmentState.focus();
			return false;
		}
		if (textFieldBrand.value.trim().length == 0) {
			showMessage(L('enter_brand'));
			textFieldBrand.focus();
			return false;
		}
		if (textFieldModel.value.trim().length == 0) {
			showMessage(L('enter_model'));
			textFieldModel.focus();
			return false;
		}
		if (textFieldVehicleYear.value.trim().length != 0) {
			if (!isInt(textFieldVehicleYear.value.trim())) {
				showMessage(L('enter_year_correctly'));
				textFieldVehicleYear.focus();
				return false;
			}
		}
		if (textFieldFineType.selectedId == -1) {
			showMessage(L('select_fine_type'));
			textFieldFineType.focus();
			return false;
		}
		if (textFieldParquimeter.selectedId == -1) {
			showMessage(L('select_parquimeter'));
			textFieldParquimeter.focus();
			return false;
		}

		return true;

	}

	function showSearchingPlatesIndicator(show) {
		if (show) {
			indicatorPlates.show();

			buttonPlatesSerialNumber.visible = false;
		} else {
			indicatorPlates.hide();

			buttonPlatesSerialNumber.visible = true;
		}
	}

	function showCreatingIndicator(show) {
		if (show) {
			indicatorCreateFine.show();

			buttonCreateFine.visible = false;
		} else {
			indicatorCreateFine.hide();

			buttonCreateFine.visible = true;
		}
	}

	//
	( function fillEnrollmentTypesPicker() {
			var plateTypes;
			var dataEnrollmentTypes = [];

			if (Ti.App.Properties.getObject('userdata').plate_types != null) {
				plateTypes = Ti.App.Properties.getObject('userdata').plate_types;
			}

			plateTypes.unshift({
				id : -1,
				name : L('please_select'),
				code : '',
				description : ''
			});

			for (var i = 0; i < plateTypes.length; i++) {
				dataEnrollmentTypes[i] = Ti.UI.createPickerRow({
					value : plateTypes[i].id,
					title : plateTypes[i].name,
				});
			}

			pickerEnrollmentType.add(dataEnrollmentTypes);

			plateTypes = null;

		}());

	//
	( function fillFinesTypePicker() {
			var ticketTypes;
			var dataFinesType = [];

			if (Ti.App.Properties.getObject('userdata').ticket_types != null) {
				ticketTypes = Ti.App.Properties.getObject('userdata').ticket_types;
			}

			ticketTypes.unshift({
				id : -1,
				name : L('please_select'),
				code : '',
				description : ''
			});

			for (var i = 0; i < ticketTypes.length; i++) {
				dataFinesType[i] = Ti.UI.createPickerRow({
					value : ticketTypes[i].id,
					title : ticketTypes[i].name,
				});
			}

			pickerFineType.add(dataFinesType);

			ticketTypes = null;
		}());

	//
	( function fillParquimetersPicker() {
			var parkingMeters;
			var dataParquimeters = [];

			if (Ti.App.Properties.getObject('userdata').parking_meters != null) {
				parkingMeters = Ti.App.Properties.getObject('userdata').parking_meters;
			}

			parkingMeters.unshift({
				id : -1,
				name : L('please_select'),
				code : '',
				description : ''
			});

			for (var i = 0; i < parkingMeters.length; i++) {
				dataParquimeters[i] = Ti.UI.createPickerRow({
					value : parkingMeters[i].id,
					title : parkingMeters[i].name,
				});
			}

			pickerParquimeter.add(dataParquimeters);

			parkingMeters = null;
		}());

	textFieldEnrollmentType.addEventListener('click', function(e) {
		var currentTime = new Date();
		if (currentTime - e.source.clickTime < 1000) {
			return;
		}
		e.source.clickTime = currentTime;

		PickerModalWindow = require('ui/PickerModalWindow');
		new PickerModalWindow({
			title : L('select_enrollment_type'),
			textField : textFieldEnrollmentType,
			picker : pickerEnrollmentType
		}).open();
	});

	textFieldFineType.addEventListener('click', function(e) {
		var currentTime = new Date();
		if (currentTime - e.source.clickTime < 1000) {
			return;
		}
		e.source.clickTime = currentTime;

		PickerModalWindow = require('ui/PickerModalWindow');
		new PickerModalWindow({
			title : L('select_fine_type'),
			textField : textFieldFineType,
			picker : pickerFineType
		}).open();
	});

	textFieldParquimeter.addEventListener('click', function(e) {
		var currentTime = new Date();
		if (currentTime - e.source.clickTime < 1000) {
			return;
		}
		e.source.clickTime = currentTime;

		PickerModalWindow = require('ui/PickerModalWindow');
		new PickerModalWindow({
			title : L('select_parquimeter'),
			textField : textFieldParquimeter,
			picker : pickerParquimeter
		}).open();
	});

	buttonCreateFine.addEventListener('touchstart', function(e) {
		e.source.backgroundColor = Ti.App.buttonPressedColor;
	});

	buttonCreateFine.addEventListener('touchend', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor;
	});

	buttonCreateFine.addEventListener('touchcancel', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor;
	});

	buttonPlatesSerialNumber.addEventListener('touchstart', function(e) {
		e.source.backgroundColor = Ti.App.buttonPressedColor;
	});

	buttonPlatesSerialNumber.addEventListener('touchend', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor;
	});

	buttonPlatesSerialNumber.addEventListener('touchcancel', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor;
	});

	return viewFinesContainer;
}

module.exports = FinesView;
