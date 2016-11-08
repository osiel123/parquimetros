/*jslint white:true plusplus:true nomen:true vars:true sloppy:true undef:false*/

var
	MODULE_NAME = 'Logical Labs External Accessories',
	Menu = require('menu'),
	Lib = require('examples/lib'),
	win, navWin, menu, warningText, warningLabel
;

Ti.API.info('Entering app.js of ' + MODULE_NAME + ' sample app.');

win = Ti.UI.createWindow({
	title: MODULE_NAME,
	exitOnClose:true,
	backgroundColor:'#8E8E8E',
	orientationModes: [ Ti.UI.PORTRAIT ]
});


if (Lib.isIOS()) {
	Menu = require('menu');

	if (Lib.isIOS()) {
		navWin = Titanium.UI.iOS.createNavigationWindow({
		   window: win
		});
	}
	
	menu = new Menu(navWin);
	win.add(menu.getView());
	
		if (navWin) {
			navWin.open();
		} else {
			win.open();
		}

} else {
	warningText = 'This module provides access to functionality that is only ' +
				'present in iOS.';
	Ti.API.error(warningText);
	warningLabel = Ti.UI.createLabel({
		width: '90%',
		color: 'red',
		font: {
			fontSize: Math.round(16 * Ti.Platform.displayCaps.platformWidth / 320)
		},
		text: warningText,
		backgroundColor: 'white'
	});
	
	win.add(warningLabel);
	win.open();
}

Ti.API.info('Exiting app.js of ' + MODULE_NAME + ' sample app.');

