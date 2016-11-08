function PickerModalWindow(args) {

	windowPicker = Ti.UI.createWindow({
		backgroundColor : 'transparent',
		modal : true,
		width : Ti.UI.FILL,
		height : Ti.UI.FILL
	});

	viewBackgroundPicker = Ti.UI.createView({
		height : '100%',
		width : '100%',
		opacity : 0.3,
		backgroundColor : 'black',
		touchEnabled : true,
		bubbleParent : false,
	});

	viewContainerPicker = Ti.UI.createView({
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

	labelPickerModalTitle = Titanium.UI.createLabel({
		text : args.title,
		top : '1dp',
		width : '90%',
		height : Ti.UI.SIZE,
		color : Ti.App.labelColor,
		font : {
			fontSize : Ti.App.fontSize
		},
		touchEnabled : true,
		bubbleParent : false
	});

	buttonAcceptPicker = Ti.UI.createButton({
		title : L('ok'),
		width : '90%',
		height : '45dp',
		bottom : '10dp',
		top : '40dp',
		borderRadius : 4,
		backgroundColor : Ti.App.buttonColor2,
		color : Ti.App.buttonTextColor
	});

	viewContainerPicker.add(labelPickerModalTitle);
	viewContainerPicker.add(args.picker);
	viewContainerPicker.add(buttonAcceptPicker);

	windowPicker.add(viewBackgroundPicker);
	windowPicker.add(viewContainerPicker);

	buttonAcceptPicker.addEventListener('click', function(e) {
		var currentTime = new Date();
		if (currentTime - e.source.clickTime < 1000) {
			return;
		}
		e.source.clickTime = currentTime;
		
		if(args.picker.getSelectedRow(0).value != -1) {
			args.textField.selectedId = args.picker.getSelectedRow(0).value;
			args.textField.value = args.picker.getSelectedRow(0).title;
	
			windowPicker.close();
		}else{
			showMessage(L('please_select'));
		}
	});

	buttonAcceptPicker.addEventListener('touchstart', function(e) {
		e.source.backgroundColor = Ti.App.buttonPressedColor2;
	});

	buttonAcceptPicker.addEventListener('touchend', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor2;
	});

	buttonAcceptPicker.addEventListener('touchcancel', function(e) {
		e.source.backgroundColor = Ti.App.buttonColor2;
	});

	windowPicker.addEventListener('android:back', function(e) {

	});

	windowPicker.addEventListener('open', function() {
		if (Ti.Platform.name == 'android') {
			var actionBar = windowPicker.activity.actionBar;
			actionBar.hide();
		}
	});

	return windowPicker;
}

module.exports = PickerModalWindow;
