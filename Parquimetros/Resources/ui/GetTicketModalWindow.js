function GetTicketModalWindow(args) {

	var network = require('/lib/network');

	windowGetTicket = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		modal : true,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});

	viewBackgroundGetTicket = Ti.UI.createView({
		height : '100%',
		width : '100%',
		opacity : 0.3,
		backgroundColor : 'black',
		touchEnabled : true,
		bubbleParent : false,
	});

	viewContainerGetTicket = Ti.UI.createView({
		backgroundColor : Ti.App.backgroundColor,
		layout : 'vertical',
		center : {
			x : '50%',
			y : '50%'
		},
		width : '90%',
		height : Ti.UI.SIZE,
		borderRadius : 4,
		touchEnabled : true,
		bubbleParent : false
	});

	labelGetTicketModalTitle = Titanium.UI.createLabel({
		text : L('reprint'),
		top : '15dp',
		width : '90%',
		height : Ti.UI.SIZE,
		color : Ti.App.labelColor,
		font : {
			fontSize : Ti.App.fontSize
		},
		touchEnabled : true,
		bubbleParent : false
	});

	buttonCancelReprint = Ti.UI.createButton({
		title : L('cancel'),
		width : '90%',
		height : '45dp',
		bottom : '10dp',
		top : '20dp',
		borderRadius : 4,
		backgroundColor : Ti.App.buttonCancelColor2,
		color : Ti.App.buttonTextColor
	});

	/**
	 *
	 */

	viewTicketNumber = Ti.UI.createView({
		top : 0,
		height : Ti.UI.SIZE,
		width : '90%'
	});

	textFieldTicketNumber = Ti.UI.createTextField({
		autocapitalization : Ti.UI.TEXT_AUTOCAPITALIZATION_ALL,
		keyboardType : Ti.UI.KEYBOARD_NUMBER_PAD,
		value : '',
		plate_id : '',
		hintText : L('enter_fine_no'),
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

	indicatorTicketNumber = Ti.UI.createActivityIndicator({
		style : (Ti.Platform.name == 'android' ? Titanium.UI.ActivityIndicatorStyle.BIG : Titanium.UI.iPhone.ActivityIndicatorStyle.BIG),
		center : {
			x : '50%'
		}
	});

	viewButtonSearchTicketContainer = Ti.UI.createView({
		right : 0,
		width : '20%',
		height : Ti.UI.SIZE
	});

	buttonSearchTicket = Ti.UI.createView({
		width : Ti.UI.FILL,
		height : '50dp',
		borderRadius : 4,
		backgroundColor : Ti.App.buttonColor,
		color : Ti.App.buttonTextColor
	});

	imageViewSearchTicket = Ti.UI.createImageView({
		bubbleParent : true,
		touchEnabled : false,
		image : '/images/search_icon.png',
		width : '25dp',
		height : '25dp'
	});

	buttonSearchTicket.add(imageViewSearchTicket);

	viewButtonSearchTicketContainer.add(indicatorTicketNumber);
	viewButtonSearchTicketContainer.add(buttonSearchTicket);

	viewTicketNumber.add(textFieldTicketNumber);
	viewTicketNumber.add(viewButtonSearchTicketContainer);

	/**
	 *
	 */

	viewContainerGetTicket.add(labelGetTicketModalTitle);
	viewContainerGetTicket.add(viewTicketNumber);
	viewContainerGetTicket.add(buttonCancelReprint);

	windowGetTicket.add(viewBackgroundGetTicket);
	windowGetTicket.add(viewContainerGetTicket);

	function showSearchingTicketIndicator(show) {
		if (show) {
			indicatorTicketNumber.show();

			buttonSearchTicket.visible = false;
		} else {
			indicatorTicketNumber.hide();

			buttonSearchTicket.visible = true;
		}
	}


	buttonSearchTicket.addEventListener('click', function(e) {
		if (Ti.Platform.name == 'android') {
			Ti.UI.Android.hideSoftKeyboard();
		}

		var currentTime = new Date();
		if (currentTime - e.source.clickTime < 1000) {
			return;
		}
		e.source.clickTime = currentTime;

		if (textFieldTicketNumber.value.trim().length > 0) {
			showSearchingTicketIndicator(true);

			network.getTicketData({
				ticket_id : textFieldTicketNumber.value.trim()
			}, function(get_ticket_data_response) {
				if (get_ticket_data_response != false) {

					showSearchingTicketIndicator(false);

					windowGetTicket.close();

					/*********/

					PrintWindow = require('/ui/PrintWindow');
					new PrintWindow({
						ticket_data : get_ticket_data_response.ticket_info,
						reprint : false
					});

					/*********/
				} else {
					showSearchingTicketIndicator(false);

					windowGetTicket.close();

					showMessage(L('ticket_not_found'));
				}
			});
		}
	});

	buttonCancelReprint.addEventListener('click', function(e) {
		windowGetTicket.close();
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

	buttonCancelReprint.addEventListener('touchstart', function(e) {
		e.source.backgroundColor = Ti.App.buttonCancelPressedColor2;
	});

	buttonCancelReprint.addEventListener('touchend', function(e) {
		e.source.backgroundColor = Ti.App.buttonCancelColor2;
	});

	buttonCancelReprint.addEventListener('touchcancel', function(e) {
		e.source.backgroundColor = Ti.App.buttonCancelColor2;
	});

	windowGetTicket.addEventListener('android:back', function(e) {

	});

	windowGetTicket.addEventListener('open', function() {
		if (Ti.Platform.name == 'android') {
			var actionBar = windowGetTicket.activity.actionBar;
			actionBar.hide();
		}
	});

	return windowGetTicket;
}

module.exports = GetTicketModalWindow;
