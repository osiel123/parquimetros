function ConsultView() {

	var network = require('/lib/network');

	viewConsultContainer = Ti.UI.createView({
		top : 0,
		backgroundColor : Ti.App.backgroundColor
	});

	scrollViewConsultContent = Ti.UI.createScrollView({
		showVerticalScrollIndicator : true,
		scrollType : 'vertical',
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical'
	});

	/***/

	labelEnrollmentNumberConsult = Ti.UI.createLabel({
		text : L('plates_serial_number'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	viewEnrollmentNumberConsult = Ti.UI.createView({
		top : 0,
		height : Ti.UI.SIZE,
		width : '90%'
	});

	textFieldEnrollmentNumberConsult = Ti.UI.createTextField({
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_ALL,
		value : 'ASDF237',
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

	indicatorPlatesConsult = Ti.UI.createActivityIndicator({
		style : (Ti.Platform.name == 'android' ? Titanium.UI.ActivityIndicatorStyle.BIG : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG),
		center : {
			x : '50%'
		}
	});

	viewButtonPlatesContainerConsult = Ti.UI.createView({
		right : 0,
		width : '20%',
		height : Ti.UI.SIZE
	});

	buttonPlatesSerialNumberConsult = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : '50dp',
		borderRadius : 4,
		backgroundColor : Ti.App.buttonColor2,
		color : Ti.App.buttonTextColor
	});

	imageViewSearchPlatesConsult = Ti.UI.createImageView({
		bubbleParent : true,
		touchEnabled : false,
		image : '/images/search_icon.png',
		width : '25dp',
		height : '25dp'
	});

	/***/

	viewConsultDataContainer = Ti.UI.createView({
		top : 0,
		height : Ti.UI.SIZE,
		width : '90%',
		layout : 'vertical',
		visible : false
	});

	labelTitleEnrollmentConsult = Ti.UI.createLabel({
		text : L('enrollment'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : '3dp',
		width : '100%',
		font : {
			fontSize : Ti.App.titleFontSizeBig
		},
		color : Ti.App.labelTitleColor,
		backgroundColor : Ti.App.labelBackgroundColor2,
		borderColor : Ti.App.labelBorderColor
	});

	viewConsultPlateType = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	viewConsultPlateYear = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	viewConsultPlateCity = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	viewConsultPlateState = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	viewConsultPlateOwner = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});

	labelTitleVehicleConsult = Ti.UI.createLabel({
		text : L('vehicle'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : '10dp',
		width : '100%',
		font : {
			fontSize : Ti.App.titleFontSizeBig
		},
		color : Ti.App.labelTitleColor,
		backgroundColor : Ti.App.labelBackgroundColor2,
		borderColor : Ti.App.labelBorderColor
	});

	viewConsultVehicleSerialNumber = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	viewConsultVehicleBrand = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	viewConsultVehicleModel = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	viewConsultVehicleSerieLine = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	viewConsultVehicleType = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	viewConsultVehicleColor = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});
	viewConsultVehicleYear = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});

	labelTitleFineConsult = Ti.UI.createLabel({
		text : L('fines'),
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER,
		top : '10dp',
		width : '100%',
		font : {
			fontSize : Ti.App.titleFontSizeBig
		},
		color : Ti.App.labelTitleColor,
		backgroundColor : Ti.App.labelBackgroundColor2,
		borderColor : Ti.App.labelBorderColor
	});

	viewConsultDataContainer.add(labelTitleEnrollmentConsult);
	viewConsultDataContainer.add(viewConsultPlateType);
	viewConsultDataContainer.add(viewConsultPlateYear);
	viewConsultDataContainer.add(viewConsultPlateCity);
	viewConsultDataContainer.add(viewConsultPlateState);
	viewConsultDataContainer.add(viewConsultPlateOwner);

	viewConsultDataContainer.add(labelTitleVehicleConsult);
	viewConsultDataContainer.add(viewConsultVehicleSerialNumber);
	viewConsultDataContainer.add(viewConsultVehicleBrand);
	viewConsultDataContainer.add(viewConsultVehicleModel);
	viewConsultDataContainer.add(viewConsultVehicleSerieLine);
	viewConsultDataContainer.add(viewConsultVehicleType);
	viewConsultDataContainer.add(viewConsultVehicleColor);
	viewConsultDataContainer.add(viewConsultVehicleYear);

	viewConsultDataContainer.add(labelTitleFineConsult);

	/**Matricula**/

	labelEnrollmentTypeConsult = Ti.UI.createLabel({
		text : L('enrollment_type'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueEnrollmentTypeConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelEnrollmentYearConsult = Ti.UI.createLabel({
		text : L('year'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueEnrollmentYearConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelEnrollmentCityConsult = Ti.UI.createLabel({
		text : L('city'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueEnrollmentCityConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelEnrollmentStateConsult = Ti.UI.createLabel({
		text : L('state'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueEnrollmentStateConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelEnrollmentOwnerConsult = Ti.UI.createLabel({
		text : L('owner'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueEnrollmentOwnerConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	/**Vehiculo**/

	labelSerialNumberConsult = Ti.UI.createLabel({
		text : L('serie_number'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueSerialNumberConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelBrandConsult = Ti.UI.createLabel({
		text : L('brand'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueBrandConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelModelConsult = Ti.UI.createLabel({
		text : L('model'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueModelConsult = Ti.UI.createLabel({
		value : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelSeriesLineConsult = Ti.UI.createLabel({
		text : L('series_line'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueSeriesLineConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelVehicleTypeConsult = Ti.UI.createLabel({
		text : L('vehicle_type'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueVehicleTypeConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelVehicleColorConsult = Ti.UI.createLabel({
		text : L('color'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueVehicleColorConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelVehicleBrandConsult = Ti.UI.createLabel({
		text : L('color'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueVehicleBrandConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	labelVehicleYearConsult = Ti.UI.createLabel({
		text : L('year'),
		top : '3dp',
		left : 0,
		width : '45%',
		font : {
			fontSize : Ti.App.fontSize,
			fontWeight : 'bold'
		},
		color : Ti.App.labelSubColor
	});

	labelValueVehicleYearConsult = Ti.UI.createLabel({
		text : '',
		top : '3dp',
		left : '50%',
		width : '40%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	viewConsultPlateType.add(labelEnrollmentTypeConsult);
	viewConsultPlateType.add(labelValueEnrollmentTypeConsult);
	viewConsultPlateYear.add(labelEnrollmentYearConsult);
	viewConsultPlateYear.add(labelValueEnrollmentYearConsult);
	viewConsultPlateCity.add(labelEnrollmentCityConsult);
	viewConsultPlateCity.add(labelValueEnrollmentCityConsult);
	viewConsultPlateState.add(labelEnrollmentStateConsult);
	viewConsultPlateState.add(labelValueEnrollmentStateConsult);
	viewConsultPlateOwner.add(labelEnrollmentOwnerConsult);
	viewConsultPlateOwner.add(labelValueEnrollmentOwnerConsult);

	viewConsultVehicleSerialNumber.add(labelSerialNumberConsult);
	viewConsultVehicleSerialNumber.add(labelValueSerialNumberConsult);
	viewConsultVehicleBrand.add(labelBrandConsult);
	viewConsultVehicleBrand.add(labelValueBrandConsult);
	viewConsultVehicleModel.add(labelModelConsult);
	viewConsultVehicleModel.add(labelValueModelConsult);
	viewConsultVehicleSerieLine.add(labelSeriesLineConsult);
	viewConsultVehicleSerieLine.add(labelValueSeriesLineConsult);
	viewConsultVehicleType.add(labelVehicleTypeConsult);
	viewConsultVehicleType.add(labelValueVehicleTypeConsult);
	viewConsultVehicleColor.add(labelVehicleColorConsult);
	viewConsultVehicleColor.add(labelValueVehicleColorConsult);
	viewConsultVehicleYear.add(labelVehicleYearConsult);
	viewConsultVehicleYear.add(labelValueVehicleYearConsult);

	/**
	 *multasContent
	 */

	scrollableViewFinesInfo = Ti.UI.createScrollableView({
		top : '10dp',
		bottom : '15dp',
		showPagingControl : false,
		width : '100%',
		height : '42%',
		backgroundColor : Ti.App.backgroundColor2,
		borderColor : Ti.App.labelBorderColor
	});

	/**
	 * addContent
	 */

	buttonPlatesSerialNumberConsult.add(imageViewSearchPlatesConsult);

	viewButtonPlatesContainerConsult.add(indicatorPlatesConsult);
	viewButtonPlatesContainerConsult.add(buttonPlatesSerialNumberConsult);

	viewEnrollmentNumberConsult.add(textFieldEnrollmentNumberConsult);
	viewEnrollmentNumberConsult.add(viewButtonPlatesContainerConsult);

	scrollViewConsultContent.add(labelEnrollmentNumberConsult);
	scrollViewConsultContent.add(viewEnrollmentNumberConsult);

	scrollViewConsultContent.add(viewConsultDataContainer);

	viewConsultDataContainer.add(scrollableViewFinesInfo);

	viewConsultContainer.add(scrollViewConsultContent);

	/**
	 *eventListeners
	 */

	textFieldEnrollmentNumberConsult.addEventListener('return', function(e) {
		if (textFieldEnrollmentNumberConsult.value.trim().length > 0) {
			fillConsultData();
		}
	});

	buttonPlatesSerialNumberConsult.addEventListener('click', function(e) {
		if (textFieldEnrollmentNumberConsult.value.trim().length > 0) {
			fillConsultData();
		}
	});

	/**
	 *funciones
	 */

	searchPlatesSerialNumberConsult = function(callback) {
		if (Ti.Platform.name == 'android') {
			Ti.UI.Android.hideSoftKeyboard();
		}

		showSearchingPlatesConsultIndicator(true);

		network.getPlates({
			plates_serial_number : textFieldEnrollmentNumberConsult.value.trim()
		}, function(get_plates_response) {
			if (get_plates_response != false) {

				showSearchingPlatesConsultIndicator(false);
				callback(get_plates_response);
			} else {
				showSearchingPlatesConsultIndicator(false);
				callback(false);
			}
		});

	};

	function fillConsultData() {
		searchPlatesSerialNumberConsult(function(search_plates_response) {

			if (search_plates_response.length != undefined) {

				SelectPlatesModalWindow = require('/ui/SelectPlatesModalWindow');
				new SelectPlatesModalWindow({
					textField : textFieldEnrollmentNumberConsult,
					plates : search_plates_response
				}).open();

				return;
			}

			fillFinesDataConsult(search_plates_response);

			if (search_plates_response == false) {
				showMessage(L('plate_serial_ticket_not_found'));
			} else {
				//showMessage(L('plate_serial_ticket_found') + ' ' + L('please_wait_charging'));
				network.getTickets({
					plates_serial_number : textFieldEnrollmentNumberConsult.value.trim()
				}, function(get_tickets_response) {
					if (get_tickets_response != false) {
						addFines(get_tickets_response);
					}
				});
			}
		});
	}


	Ti.App.addEventListener('fill_fines_data_consult', function(e) {
		fillFinesDataConsult(false);
	});

	function fillFinesDataConsult(data) {
		try {

			if (data != false) {
				textFieldEnrollmentNumberConsult.plate_id = data.plate.id;

				if (Ti.App.Properties.getObject('userdata').plate_types != null) {
					for (var i = 0; i < Ti.App.Properties.getObject('userdata').plate_types.length; i++) {
						if (Ti.App.Properties.getObject('userdata').plate_types[i].id == data.plate_type.id) {
							labelValueEnrollmentTypeConsult.text = Ti.App.Properties.getObject('userdata').plate_types[i].name;
							break;
						}
					}
				}

				/*Matricula*/
				labelValueEnrollmentYearConsult.text = data.plate.year;
				labelValueEnrollmentCityConsult.text = data.plate.city;
				labelValueEnrollmentStateConsult.text = data.plate.state;
				labelValueEnrollmentOwnerConsult.text = data.plate.owner;

				/**Vehiculo**/
				labelValueSerialNumberConsult.text = data.vehicle.serial_number;
				labelValueBrandConsult.text = data.vehicle.brand;
				labelValueModelConsult.text = data.vehicle.model;
				labelValueSeriesLineConsult.text = data.vehicle.series;
				labelValueVehicleTypeConsult.text = data.vehicle.vehicle_type;
				labelValueVehicleColorConsult.text = data.vehicle.color;
				labelValueVehicleYearConsult.text = data.vehicle.year;

				viewConsultDataContainer.visible = true;

			} else {
				textFieldEnrollmentNumberConsult.plate_id = '';

				/**Matricula**/

				labelValueEnrollmentTypeConsult.text = '';
				labelValueEnrollmentYearConsult.text = '';
				labelValueEnrollmentCityConsult.text = '';
				labelValueEnrollmentStateConsult.text = '';
				labelValueEnrollmentOwnerConsult.text = '';

				/**Vehiculo**/

				labelValueSerialNumberConsult.text = '';
				labelValueBrandConsult.text = '';
				labelValueModelConsult.text = '';
				labelValueSeriesLineConsult.text = '';
				labelValueVehicleTypeConsult.text = '';
				labelValueVehicleColorConsult.text = '';
				labelValueVehicleYearConsult.text = '';

				viewConsultDataContainer.visible = false;
			}

		} catch(ex) {
			Ti.API.info('fillFinesDataConsult ex ' + ex);
		}
	}

	function showSearchingPlatesConsultIndicator(show) {
		if (show) {
			indicatorPlatesConsult.show();

			buttonPlatesSerialNumberConsult.visible = false;
		} else {
			indicatorPlatesConsult.hide();

			buttonPlatesSerialNumberConsult.visible = true;
		}
	}

	function addFines(data) {

		scrollableViewFinesInfo.removeAllChildren();

		/*var indicatorLoadingFines = Ti.UI.createActivityIndicator({
		 style : (Ti.Platform.name == 'android' ? Titanium.UI.ActivityIndicatorStyle.BIG : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG),
		 center : {
		 x : '50%'
		 }
		 });

		 scrollableViewFinesInfo.addView(indicatorLoadingFines);
		 indicatorLoadingFines.show();*/

		for (var i in data) {

			var viewTicketsContainer = Ti.UI.createView({
				ticket_id : data[i].id,
				ticket_type_id : data[i].ticket_type_id,
				ticket_status_id : data[i].ticket_status_id,
				ticket_discount_id : data[i].ticket_discount_id,
				parking_meter_id : data[i].parking_meter_id,
				inspector_id : data[i].inspector_id,
				plate_id : data[i].plate_id,
				inspector : '',
				date : data[i].date,
				time : data[i].time,
				detained_plates : data[i].detained_plates,
				observations : data[i].observations,
				layout : 'vertical',
				height : Ti.UI.SIZE
			});

			var viewTicketIdContainer = Ti.UI.createView({
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL
			});
			var viewTicketTypeContainer = Ti.UI.createView({
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL
			});
			var viewTicketParquimeterContainer = Ti.UI.createView({
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL
			});
			var viewTicketInspectorContainer = Ti.UI.createView({
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL
			});
			var viewTicketDatetimeContainer = Ti.UI.createView({
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL
			});
			var viewTicketDetainedContainer = Ti.UI.createView({
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL
			});
			var viewTicketCommentsContainer = Ti.UI.createView({
				top : '7dp',
				height : Ti.UI.SIZE,
				width : Ti.UI.FILL
			});

			var labelTicketId = Ti.UI.createLabel({
				text : L('ticket_id'),
				top : '3dp',
				left : '6dp',
				width : '45%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize,
					fontWeight : 'bold'
				},
				color : Ti.App.labelSubColor
			});

			var labelValueTicketId = Ti.UI.createLabel({
				text : data[i].id,
				top : '3dp',
				left : '50%',
				width : '40%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize
				},
				color : Ti.App.labelSubColor
			});

			var labelTicketType = Ti.UI.createLabel({
				text : L('fine_type'),
				top : '3dp',
				left : '6dp',
				width : '45%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize,
					fontWeight : 'bold'
				},
				color : Ti.App.labelSubColor
			});

			var ticket_type = '';

			if (Ti.App.Properties.getObject('userdata').ticket_types != null) {
				for (var j = 0; j < Ti.App.Properties.getObject('userdata').ticket_types.length; j++) {
					if (Ti.App.Properties.getObject('userdata').ticket_types[j].id === data[i].ticket_type_id) {
						ticket_type = Ti.App.Properties.getObject('userdata').ticket_types[j].name;
						break;
					}
				}
			}

			var labelValueTicketType = Ti.UI.createLabel({
				text : ticket_type,
				top : '3dp',
				left : '50%',
				width : '40%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize
				},
				color : Ti.App.labelSubColor
			});

			var labelTicketParquimeter = Ti.UI.createLabel({
				text : L('parquimeter'),
				top : '3dp',
				left : '6dp',
				width : '45%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize,
					fontWeight : 'bold'
				},
				color : Ti.App.labelSubColor
			});

			var parquimeter = '';

			if (Ti.App.Properties.getObject('userdata').parking_meters != null) {
				for (var j = 0; j < Ti.App.Properties.getObject('userdata').parking_meters.length; j++) {
					if (Ti.App.Properties.getObject('userdata').parking_meters[j].id === data[i].parking_meter_id) {
						parquimeter = Ti.App.Properties.getObject('userdata').parking_meters[j].name;
						break;
					}
				}
			}

			var labelValueTicketParquimeter = Ti.UI.createLabel({
				text : parquimeter,
				top : '3dp',
				left : '50%',
				width : '40%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize
				},
				color : Ti.App.labelSubColor
			});

			var labelTicketInspector = Ti.UI.createLabel({
				text : L('inspector'),
				top : '3dp',
				left : '6dp',
				width : '45%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize,
					fontWeight : 'bold'
				},
				color : Ti.App.labelSubColor
			});

			var labelValueInspector = Ti.UI.createLabel({
				text : '',
				top : '3dp',
				left : '50%',
				width : '40%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize
				},
				color : Ti.App.labelSubColor
			});

			var labelTicketDatetime = Ti.UI.createLabel({
				text : L('date'),
				top : '3dp',
				left : '6dp',
				width : '45%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize,
					fontWeight : 'bold'
				},
				color : Ti.App.labelSubColor
			});

			var labelValueDatetime = Ti.UI.createLabel({
				text : data[i].date,
				top : '3dp',
				left : '50%',
				width : '40%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize
				},
				color : Ti.App.labelSubColor
			});

			var labelTicketDetained = Ti.UI.createLabel({
				text : L('tuiton_detained'),
				top : '3dp',
				left : '6dp',
				width : '45%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize,
					fontWeight : 'bold'
				},
				color : Ti.App.labelSubColor
			});

			var switchTicketDetained = Ti.UI.createSwitch({
				touchEnabled : false,
				value : data[i].detained_plates,
				top : '3dp',
				width : '40%',
				height : '35dp',
				left : '50%'
			});
			if (Ti.Platform.name == "android")
				switchTicketDetained.style = Titanium.UI.Android.SWITCH_STYLE_CHECKBOX;

			var labelTicketComments = Ti.UI.createLabel({
				text : L('comments'),
				top : '7dp',
				left : '6dp',
				width : '45%',
				height : Ti.UI.SIZE,
				font : {
					fontSize : Ti.App.fontSize,
					fontWeight : 'bold'
				},
				color : Ti.App.labelSubColor
			});

			var textAreaValueTicketComments = Ti.UI.createTextArea({
				touchEnabled : false,
				value : data[i].observations,
				top : '7dp',
				left : '50%',
				width : '45%',
				height : Ti.UI.SIZE,
				backgroundColor : Ti.App.textFieldBackgroundColor,
				borderColor : Ti.App.textFieldBorderColor,
				borderRadius : 4,
				font : {
					fontSize : Ti.App.fontSize
				}
			});

			var viewPayFineContainer = Ti.UI.createView({
				top : '7dp',
				bottom : '5dp',
				width : Ti.UI.FILL,
				height : Ti.UI.FILL
			});

			var buttonPayFine = Ti.UI.createButton({
				top : '5dp',
				title : L('pay_fine'),
				width : '75%',
				height : '50dp',
				left : '6dp',
				bottom : '10dp',
				borderRadius : 4,
				backgroundColor : Ti.App.buttonColor2,
				color : Ti.App.buttonTextColor
			});

			buttonPayFine.addEventListener('click', function(e) {
				var currentTime = new Date();
				if (currentTime - e.source.clickTime < 2000) {
					return;
				}
				e.source.clickTime = currentTime;

				PayFineWindow = require('/ui/PayFineWindow');
				new PayFineWindow({
					ticket_id : e.source.getParent().getParent().ticket_id
				}).open();

			});

			buttonPayFine.addEventListener('touchstart', function(e) {
				e.source.backgroundColor = Ti.App.buttonPressedColor2;
			});

			buttonPayFine.addEventListener('touchend', function(e) {
				e.source.backgroundColor = Ti.App.buttonColor2;
			});

			buttonPayFine.addEventListener('touchcancel', function(e) {
				e.source.backgroundColor = Ti.App.buttonColor2;
			});

			viewPayFineContainer.add(buttonPayFine);

			viewTicketIdContainer.add(labelTicketId);
			viewTicketIdContainer.add(labelValueTicketId);
			viewTicketTypeContainer.add(labelTicketType);
			viewTicketTypeContainer.add(labelValueTicketType);
			viewTicketParquimeterContainer.add(labelTicketParquimeter);
			viewTicketParquimeterContainer.add(labelValueTicketParquimeter);
			viewTicketInspectorContainer.add(labelTicketInspector);
			viewTicketInspectorContainer.add(labelValueInspector);
			viewTicketDatetimeContainer.add(labelTicketDatetime);
			viewTicketDatetimeContainer.add(labelValueDatetime);
			viewTicketDetainedContainer.add(labelTicketDetained);
			viewTicketDetainedContainer.add(switchTicketDetained);
			viewTicketCommentsContainer.add(labelTicketComments);
			viewTicketCommentsContainer.add(textAreaValueTicketComments);

			viewTicketsContainer.add(viewTicketIdContainer);
			viewTicketsContainer.add(viewTicketTypeContainer);
			viewTicketsContainer.add(viewTicketParquimeterContainer);
			viewTicketsContainer.add(viewTicketInspectorContainer);
			viewTicketsContainer.add(viewTicketDatetimeContainer);
			viewTicketsContainer.add(viewTicketDetainedContainer);
			viewTicketsContainer.add(viewTicketCommentsContainer);
			viewTicketsContainer.add(viewPayFineContainer);

			scrollableViewFinesInfo.addView(viewTicketsContainer);
		};

		/*indicatorLoadingFines.hide();
		 indicatorLoadingFines = null;*/

	}


	buttonPlatesSerialNumberConsult.addEventListener('touchstart', function(e) {
		e.source.backgroundColor = Ti.App.buttonPressedColor2;
	});

	buttonPlatesSerialNumberConsult.addEventListener('touchend', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor2;
	});

	buttonPlatesSerialNumberConsult.addEventListener('touchcancel', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor2;
	});

	return viewConsultContainer;
}

module.exports = ConsultView;
