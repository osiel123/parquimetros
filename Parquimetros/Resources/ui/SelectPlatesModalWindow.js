function SelectPlatesModalWindow(args) {

	windowSelectPlates = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		modal : true,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});

	viewBackgroundSelectPlates = Ti.UI.createView({
		height : '100%',
		width : '100%',
		opacity : 0.3,
		backgroundColor : 'black',
		touchEnabled : true,
		bubbleParent : false,
	});

	viewContainerSelectPlates = Ti.UI.createView({
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
		bubbleParent : false,
	});

	labelSelectPlates = Titanium.UI.createLabel({
		text : L('select_plates'),
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

	pickerSelectPlates = Ti.UI.createPicker({
		selectionIndicator : true,
		color : Ti.App.labelColor,
		borderColor : Ti.App.textFieldBorderColor,
		borderRadius : 4,
		top : '10dp',
		bottom : '25dp',
		width : '90%',
		font : {
			fontSize : Ti.App.fontSize
		}
	});
	//
	(Ti.Platform.osname == 'android' ? pickerSelectPlates.height = '50dp' : pickerSelectPlates.height = '150dp');

	buttonSelectPlates = Ti.UI.createButton({
		title : L('ok'),
		width : '90%',
		height : '45dp',
		bottom : '10dp',
		top : '40dp',
		borderRadius : 4,
		backgroundColor : Ti.App.buttonColor2,
		color : Ti.App.buttonTextColor
	});

	viewContainerSelectPlates.add(labelSelectPlates);
	viewContainerSelectPlates.add(pickerSelectPlates);
	viewContainerSelectPlates.add(buttonSelectPlates);

	windowSelectPlates.add(viewBackgroundSelectPlates);
	windowSelectPlates.add(viewContainerSelectPlates);

	//
	( function fillSelectPlatesPicker() {
			var dataPlates = [];

			for (var i = 0; i < args.plates.length; i++) {
				dataPlates[i] = Ti.UI.createPickerRow({
					value : args.plates[i].id,
					title : args.plates[i].plates_number,
				});
			}

			pickerSelectPlates.add(dataPlates);

		}());

	buttonSelectPlates.addEventListener('click', function(e) {
		var currentTime = new Date();
		if (currentTime - e.source.clickTime < 1000) {
			return;
		}
		e.source.clickTime = currentTime;

		args.textField.value = pickerSelectPlates.getSelectedRow(0).title;

		windowSelectPlates.close();
	});

	buttonSelectPlates.addEventListener('touchstart', function(e) {
		e.source.backgroundColor = Ti.App.buttonPressedColor2;
	});

	buttonSelectPlates.addEventListener('touchend', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor2;
	});

	buttonSelectPlates.addEventListener('touchcancel', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor2;
	});

	windowSelectPlates.addEventListener('android:back', function(e) {

	});

	windowSelectPlates.addEventListener('open', function() {
		if (Ti.Platform.name == 'android') {
			var actionBar = windowSelectPlates.activity.actionBar;
			actionBar.hide();
		}
	});

	return windowSelectPlates;
}

module.exports = SelectPlatesModalWindow;
