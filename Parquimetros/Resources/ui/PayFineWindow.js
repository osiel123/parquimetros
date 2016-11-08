function PayFineWindow(args) {

	var network = require('/lib/network');

	var enabledTtextField = false;

	if (Ti.Platform.name == 'android') {
		enabledTtextField = true;
	}

	windowPayFine = Ti.UI.createWindow({
		backgroundColor : Ti.App.backgroundColor,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical'
	});

	if (Ti.Platform.name == 'android') {
		windowPayFine.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN;
	}

	viewBarPayFine = Titanium.UI.createView({
		backgroundColor : Ti.App.appColor,
		width : Ti.UI.FILL,
		layout : 'horizontal',
		height : '60dp',
		top : 0
	});

	viewBackPayFine = Ti.UI.createView({
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

	labePayFineTitle = Ti.UI.createLabel({
		text : L('make_payment'),
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

	scrollViewPayFineContainer = Ti.UI.createScrollView({
		width : Ti.UI.FILL,
		height : Ti.UI.FILL,
		layout : 'vertical'
	});

	labelPaymentType = Ti.UI.createLabel({
		text : L('payment_type'),
		top : '20dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	pickerPaymentType = Ti.UI.createPicker({
		selectionIndicator : true,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});
	//
	(Ti.Platform.osname == 'android' ? pickerPaymentType.height = '50dp' : pickerPaymentType.height = '150dp');

	viewPaymentType = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.FILL
	});

	textFieldPaymentType = Ti.UI.createTextField({
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

	labelName = Ti.UI.createLabel({
		text : L('name'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldName = Ti.UI.createTextField({
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
		},
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS
	});

	labelRFC = Ti.UI.createLabel({
		text : L('rfc'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldRFC = Ti.UI.createTextField({
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
		},
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_ALL
	});

	labelEmail = Ti.UI.createLabel({
		text : L('email'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldEmail = Ti.UI.createTextField({
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
		},
		keyboardType : Ti.UI.KEYBOARD_EMAIL
	});

	labelPhone = Ti.UI.createLabel({
		text : L('phone'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldPhone = Ti.UI.createTextField({
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
		},
		keyboardType : Ti.UI.KEYBOARD_PHONE_PAD
	});

	labelAddress = Ti.UI.createLabel({
		text : L('address'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldAddress = Ti.UI.createTextField({
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
		},
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS
	});

	labelAddress2 = Ti.UI.createLabel({
		text : L('address2'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldAddress2 = Ti.UI.createTextField({
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
		},
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS
	});

	labelCity = Ti.UI.createLabel({
		text : L('city'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldCity = Ti.UI.createTextField({
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
		},
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS
	});

	labelState = Ti.UI.createLabel({
		text : L('state'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldState = Ti.UI.createTextField({
		value : 'Chihuahua',
		hintText : L('optional'),
		backgroundColor : Ti.App.textFieldBackgroundColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		paddingLeft : 10,
		height : '50dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_WORDS
	});

	labelZip = Ti.UI.createLabel({
		text : L('zip'),
		top : '3dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		},
		color : Ti.App.labelSubColor
	});

	textFieldZip = Ti.UI.createTextField({
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
		},
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD
	});

	viewButtonMakePaymentContainer = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE
	});

	indicatorMakePayment = Ti.UI.createActivityIndicator({
		style : (Ti.Platform.name == 'android' ? Titanium.UI.ActivityIndicatorStyle.BIG : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG),
		center : {
			x : '50%'
		}
	});

	buttonMakePayment = Ti.UI.createButton({
		title : L('make_payment'),
		width : '90%',
		height : '50dp',
		top : '15dp',
		bottom : '15dp',
		borderRadius : 4,
		backgroundColor : Ti.App.buttonColor2,
		color : Ti.App.buttonTextColor
	});

	/**
	 *addContent
	 */

	viewButtonMakePaymentContainer.add(buttonMakePayment);
	viewButtonMakePaymentContainer.add(indicatorMakePayment);

	viewPaymentType.add(textFieldPaymentType);

	scrollViewPayFineContainer.add(labelPaymentType);
	scrollViewPayFineContainer.add(viewPaymentType);
	scrollViewPayFineContainer.add(labelName);
	scrollViewPayFineContainer.add(textFieldName);
	scrollViewPayFineContainer.add(labelRFC);
	scrollViewPayFineContainer.add(textFieldRFC);
	scrollViewPayFineContainer.add(labelEmail);
	scrollViewPayFineContainer.add(textFieldEmail);
	scrollViewPayFineContainer.add(labelPhone);
	scrollViewPayFineContainer.add(textFieldPhone);
	scrollViewPayFineContainer.add(labelAddress);
	scrollViewPayFineContainer.add(textFieldAddress);
	scrollViewPayFineContainer.add(labelAddress2);
	scrollViewPayFineContainer.add(textFieldAddress2);
	scrollViewPayFineContainer.add(labelCity);
	scrollViewPayFineContainer.add(textFieldCity);
	scrollViewPayFineContainer.add(labelState);
	scrollViewPayFineContainer.add(textFieldState);
	scrollViewPayFineContainer.add(labelZip);
	scrollViewPayFineContainer.add(textFieldZip);
	scrollViewPayFineContainer.add(viewButtonMakePaymentContainer);

	viewBackPayFine.add(imageViewBackIcon);

	viewBarPayFine.add(viewBackPayFine);
	viewBarPayFine.add(labePayFineTitle);

	windowPayFine.add(viewBarPayFine);
	windowPayFine.add(scrollViewPayFineContainer);

	/**
	 *funciones
	 */

	function validPaymentData() {

		if (textFieldPaymentType.selectedId == -1) {
			showMessage(L('select_payment_type'));
			textFieldPaymentType.focus();
			return false;
		}

		if (textFieldName.value.trim().length == 0) {
			showMessage(L('enter_name'));
			textFieldName.focus();
			return false;
		}

		if (textFieldRFC.value.trim().length > 0) {
			if (!validateRFC(textFieldRFC.value)) {
				showMessage(L('valid_rfc'));
				textFieldRFC.focus();
				return false;
			}
		}

		if (textFieldEmail.value.trim().length > 0) {
			if (!validateEmail(textFieldEmail.value)) {
				showMessage(L('valid_email'));
				textFieldEmail.focus();
				return false;
			}
		}

		if (textFieldPhone.value.trim().length > 0) {
			if (!isInt(textFieldPhone.value)) {
				showMessage(L('valid_phone'));
				textFieldPhone.focus();
				return false;
			}
		}

		if (textFieldZip.value.trim().length > 0) {
			if (!isInt(textFieldZip.value)) {
				showMessage(L('valid_zip'));
				textZip.focus();
				return false;
			}
		}

		return true;
	}

	function showMakePaymentIndicator(show) {
		if (show) {
			indicatorMakePayment.show();

			buttonMakePayment.visible = false;
		} else {
			indicatorMakePayment.hide();

			buttonMakePayment.visible = true;
		}
	}

	//
	( function fillPaymentTypesPicker() {
			var paymentTypes;
			var dataPaymentTypes = [];

			if (Ti.App.Properties.getObject('userdata').payment_types != null) {
				paymentTypes = Ti.App.Properties.getObject('userdata').payment_types;
			}

			paymentTypes.unshift({
				id : -1,
				name : L('please_select'),
				code : '',
				description : ''
			});

			for (var i = 0; i < paymentTypes.length; i++) {
				dataPaymentTypes[i] = Ti.UI.createPickerRow({
					value : paymentTypes[i].id,
					title : paymentTypes[i].name,
				});
			}

			pickerPaymentType.add(dataPaymentTypes);

			paymentTypes = null;

		}());

	/**
	 *eventListeners
	 */

	buttonMakePayment.addEventListener('click', function(e) {
		var currentTime = new Date();
		if (currentTime - e.source.clickTime < 1500) {
			return;
		}
		e.source.clickTime = currentTime;

		showMakePaymentIndicator(true);

		if (validPaymentData()) {

			network.makePayment({
				ticket_id : args.ticket_id,
				payment_type_id : textFieldPaymentType.selectedId,
				rfc : textFieldRFC.value.trim(),
				name : textFieldName.value.trim(),
				email : textFieldEmail.value.trim(),
				phone : textFieldPhone.value.trim(),
				address1 : textFieldAddress.value.trim(),
				address2 : textFieldAddress2.value.trim(),
				city : textFieldCity.value.trim(),
				state : textFieldState.value.trim(),
				zip : textFieldZip.value.trim()
			}, function(make_payment_response) {
				if (make_payment_response != false) {
					showMakePaymentIndicator(false);
					windowPayFine.close();

					showMessage(L('payment_created'));

					/**Proceso de Impresión (Solo ios)**/
					if (Ti.Platform.name !== 'android') {
						/*********/

						PrintWindow = require('/ui/PrintWindow');
						new PrintWindow({
							ticket_data : make_payment_response.ticket_info,
							reprint : false
						});

						/*********/
					}

				} else {
					showMakePaymentIndicator(false);
				}
			});
		} else {
			showMakePaymentIndicator(false);
		}
	});

	textFieldPaymentType.addEventListener('click', function(e) {
		var currentTime = new Date();
		if (currentTime - e.source.clickTime < 1000) {
			return;
		}
		e.source.clickTime = currentTime;

		PickerModalWindow = require('ui/PickerModalWindow');
		new PickerModalWindow({
			title : L('select_payment_type'),
			textField : textFieldPaymentType,
			picker : pickerPaymentType
		}).open();
	});

	buttonMakePayment.addEventListener('touchstart', function(e) {
		e.source.backgroundColor = Ti.App.buttonPressedColor2;
	});

	buttonMakePayment.addEventListener('touchend', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor2;
	});

	buttonMakePayment.addEventListener('touchcancel', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor2;
	});

	viewBackPayFine.addEventListener('click', function(e) {
		windowPayFine.close();
	});

	viewBackPayFine.addEventListener('touchstart', function(e) {
		viewBackPayFine.backgroundColor = Ti.App.selectedColor;
	});

	viewBackPayFine.addEventListener('touchend', function(e) {
		viewBackPayFine.backgroundColor = 'transparent';
	});

	viewBackPayFine.addEventListener('touchcancel', function(e) {
		viewBackPayFine.backgroundColor = 'transparent';
	});

	return windowPayFine;
}

module.exports = PayFineWindow;
