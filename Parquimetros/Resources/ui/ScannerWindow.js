function ScannerWindow(args) {

	// load the Scandit SDK module
	var scanditsdk = require("com.mirasense.scanditsdk");

	// disable the status bar for the camera view on the iphone and ipad
	if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
		Titanium.UI.iPhone.statusBarHidden = true;
	}

	var picker;
	// Create a window to add the picker to and display it.
	var windowScanner = Titanium.UI.createWindow({
		navBarHidden : true
	});

	// Sets up the scanner and starts it in a new window.
	var openScanner = function() {
		Ti.API.info('open scanner');
		// Instantiate the Scandit SDK Barcode Picker view
		picker = scanditsdk.createView({
			width : "100%",
			height : "100%",
			//visible : false
		});
		// Initialize the barcode picker, remember to paste your own app key here.
		picker.init("7ozd1couyJ5dzzOFZAYc4R3UmWjM5V87hYBfxFUadZM", 0);

		picker.showSearchBar(true);
		// add a tool bar at the bottom of the scan view with a cancel button (iphone/ipad only)
		picker.showToolBar(true);

		// Set callback functions for when scanning succeedes and for when the
		// scanning is canceled.
		picker.setSuccessCallback(function(e) {
			var readed_code = e.barcode;
			
			//Es código EAN-13 (Código permitido para la aplicación)
			if(readed_code.length == 12){
				readed_code = readed_code.replace(/^0+/,'');
				readed_code = readed_code.substring(0, readed_code.length - 1);
			}
			
			showMessage(L("readed_code") + ": " + readed_code);
			args.textfield.value = readed_code;
			closeScanner();
		});
		picker.setCancelCallback(function(e) {
			closeScanner();
		});

		windowScanner.add(picker);
		windowScanner.addEventListener('open', function(e) {
			// Adjust to the current orientation.
			// since window.orientation returns 'undefined' on ios devices
			// we are using Ti.UI.orientation (which is deprecated and no longer
			// working on Android devices.)
			if (Ti.Platform.osname == 'iphone' || Ti.Platform.osname == 'ipad') {
				picker.setOrientation(Ti.UI.orientation);
			} else {
				picker.setOrientation(windowScanner.orientation);
			}

			picker.setSize(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight);
			picker.startScanning();
			// startScanning() has to be called after the window is opened.
		});
		windowScanner.open();
	};

	// Stops the scanner, removes it from the window and closes the latter.
	var closeScanner = function() {
		if (picker != null) {
			picker.stopScanning();
			windowScanner.remove(picker);
		}
		windowScanner.close();
	};

	// Changes the picker dimensions and the video feed orientation when the
	// orientation of the device changes.
	Ti.Gesture.addEventListener('orientationchange', function(e) {
		windowScanner.orientationModes = [Titanium.UI.PORTRAIT, Titanium.UI.UPSIDE_PORTRAIT, Titanium.UI.LANDSCAPE_LEFT, Titanium.UI.LANDSCAPE_RIGHT];
		if (picker != null) {
			picker.setOrientation(e.orientation);
			picker.setSize(Ti.Platform.displayCaps.platformWidth, Ti.Platform.displayCaps.platformHeight);
			// You can also adjust the interface here if landscape should look
			// different than portrait.
		}
	});

	openScanner();

	return windowScanner;
}

module.exports = ScannerWindow;
