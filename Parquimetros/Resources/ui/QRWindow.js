function QRWindow(args) {

	var sound = Titanium.Media.createSound({
		url : "/raw/beep.wav"
	});

	var windowQRReader = Ti.UI.createWindow({
		navBarHidden : true,
		tabBarHidden : true,
		modal : true,
		backgroundColor : 'transparent'
	});

	if (Ti.Platform.osname == 'android') {
		var titaniumBarcode = require('com.mwaysolutions.barcode');

		titaniumBarcode.scan({
			success : function(data) {
				try {
					setTimeout(function() {
						sound.play();
					}, 300);
				} catch(ex) {
					Ti.API.info('sound exception  ------------- ' + ex.toString());
				}

				if (data && data.barcode) {
					Ti.Media.vibrate();

					var toast_qr_code = Ti.UI.createNotification({
						message : data.barcode,
						duration : Ti.UI.NOTIFICATION_DURATION_SHORT
					}).show();

					args.textfield.value = data.barcode;
					windowQRReader.close();

				} else {
					Ti.Media.vibrate();

					windowQRReader.close();
					showMessage(L('error_qr_code'));

				}
			},
			error : function(err) {
				Ti.Media.vibrate();

				windowQRReader.close();
				showMessage(L('error_qr_code'));

			},
			cancel : function() {
				windowQRReader.close();
			}
		});

		windowQRReader.addEventListener('open', function() {
			windowQRReader.close();
		});

	} else {
		windowQRReader.close();
		showMessage(L('qr_unavailable'));
	}

	return windowQRReader;
}

module.exports = QRWindow;

