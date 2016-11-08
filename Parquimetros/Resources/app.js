//Ti.App.hostname = 'http://parquimetros.railstogo.com';
Ti.App.hostname = 'http://108.174.146.68';

require('lib/style').loadStyles();
Titanium.include('/lib/global.js');

var network = require('/lib/network');
var database = require('/lib/database');

database.selectUserName({
	person : false
}, function(username_response) {

	LoginWindow = Ti.UI.createWindow({
		exitOnClose : true,
		backgroundColor : Ti.App.backgroundColor,
		layout : 'vertical'
	});

	viewBarLogin = Titanium.UI.createView({
		backgroundColor : Ti.App.appColor,
		width : '100%',
		layout : 'horizontal',
		height : '60dp'
	});

	imageViewLogo = Titanium.UI.createImageView({
		image : '/images/logo.png'
	});

	labelVersion = Ti.UI.createLabel({
		text : L('version') + ' ' + Titanium.App.version,
		top : 1,
		right : '5dp',
		verticalAlign : 'right',
		font : {
			fontSize : Ti.App.fontSizeSmall
		},
		color : Ti.App.labelColor
	});

	textFieldLogin = Ti.UI.createTextField({
		value : username_response,
		hintText : L('username'),
		width : '90%',
		top : 0,
		textAlign : 'center',
		paddingLeft : 10,
		borderRadius : 2
	});

	textFieldPassword = Ti.UI.createTextField({
		value : 'Password1',
		hintText : L('password'),
		width : '90%',
		top : '1dp',
		textAlign : 'center',
		borderRadius : 2,
		paddingLeft : 10,
		passwordMask : true
	});

	viewShowPassword = Ti.UI.createView({
		height : Ti.UI.SIZE,
		width : Ti.UI.SIZE,
		layout : 'horizontal'
	});

	labelShowPasssword = Ti.UI.createLabel({
		text : L('show_password'),
		font : {
			fontSize : Ti.App.fontSizeSmall
		},
		color : Ti.App.labelColor
	});

	switchShowPassword = Titanium.UI.createSwitch({
		touchEnabled : false
	});

	if (Ti.Platform.name == 'android') {
		switchShowPassword.style = Titanium.UI.Android.SWITCH_STYLE_CHECKBOX;
	}

	buttonLogin = Ti.UI.createButton({
		title : L('login'),
		width : '90%',
		height : '45dp',
		top : '10dp',
		borderRadius : 4,
		backgroundColor : Ti.App.appColor,
		color : Ti.App.buttonTextColor
	});

	indicatorLogin = Ti.UI.createActivityIndicator({
		top : 0,
		style : (Ti.Platform.name == 'android' ? Ti.UI.ActivityIndicatorStyle.BIG : Ti.UI.ActivityIndicatorStyle.BIG),
		center : {
			x : '50%'
		}
	});

	labelRights = Ti.UI.createLabel({
		text : L('rights_value'),
		width : '90%',
		textAlign : 'center',
		font : {
			fontSize : Ti.App.fontSizeSmall
		},
		color : Ti.App.labelColor,
		bottom : '15dp'
	});

	viewTopLogin = Ti.UI.createView({
		color : 'transparent',
		width : '100%',
		height : '88%',
		layout : 'vertical'
	});

	viewBottomLogin = Ti.UI.createView({
		color : 'transparent',
		width : '100%',
		height : '12%'
	});

	viewShowPassword.add(switchShowPassword);
	viewShowPassword.add(labelShowPasssword);
	viewTopLogin.add(viewBarLogin);
	viewTopLogin.add(labelVersion);
	viewTopLogin.add(imageViewLogo);
	viewTopLogin.add(textFieldLogin);
	viewTopLogin.add(textFieldPassword);
	viewTopLogin.add(viewShowPassword);
	viewTopLogin.add(buttonLogin);
	viewTopLogin.add(indicatorLogin);

	//viewBottomLogin.add(labelRights);

	LoginWindow.add(viewTopLogin);
	LoginWindow.add(viewBottomLogin);

	orientarionChanged();

	/**
	 **Eventlisteners
	 */

	viewShowPassword.addEventListener('click', function(e) {
		if (switchShowPassword.value == true) {
			switchShowPassword.value = false;
			textFieldPassword.passwordMask = true;
		} else {
			switchShowPassword.value = true;
			textFieldPassword.passwordMask = false;
		}

	});

	buttonLogin.addEventListener('click', function(e) {

		var currentTime = new Date();

		if (currentTime - e.source.clickTime < 2000) {
			return;
		}

		e.source.clickTime = currentTime;

		if (textFieldLogin.value.trim().length == 0 || textFieldPassword.value.trim().length == 0) {
			showMessage(L('valid_user'));
		} else {
			showLoginIndicator(true);
			network.login({
				username : textFieldLogin.value,
				password : textFieldPassword.value
			}, function(login_response) {
				if (login_response != false) {
					network.getData(function(getdata_response) {
						if (getdata_response != false) {
							database.setUser({
								user_id : getdata_response.user.id,
								first_name : getdata_response.user.first_name,
								last_name : getdata_response.user.last_name,
								role_id : getdata_response.user.role_id,
								username : getdata_response.user.username,
								email : getdata_response.user.email
							}, function(user_response) {
								if (user_response != false) {
									Ti.App.Properties.setObject('userdata', getdata_response);

									AplicationWindow = require('ui/ApplicationWindow');
									new AplicationWindow().open();

									LoginWindow.close();

									setTimeout(function() {
										showLoginIndicator(false);
									}, 1500);

								} else {
									showLoginIndicator(false);
								}
							});

						} else {
							showLoginIndicator(false);
						}

					});

				} else {
					showLoginIndicator(false);
				}

			});

		}

	});

	buttonLogin.addEventListener('touchstart', function(e) {
		e.source.backgroundColor = Ti.App.selectedColor;
	});

	buttonLogin.addEventListener('touchend', function(e) {
		e.source.backgroundColor = Ti.App.appColor;
	});

	buttonLogin.addEventListener('touchcancel', function(e) {
		e.source.backgroundColor = Ti.App.appColor;
	});

	Ti.Gesture.addEventListener('orientationchange', function(e) {
		orientarionChanged();
	});

	/**
	 * Funciones
	 */

	function orientarionChanged() {
		Ti.API.info('Ti.Platform.name ' + Ti.Platform.name);
		var platformWidth = Ti.Platform.displayCaps.platformWidth;
		var platformHeight = Ti.Platform.displayCaps.platformHeight;

		if (platformWidth > platformHeight) {
			//Landscape
			//No esconder icono si es ipad
			if (Ti.Platform.name != 'ipad') {
				imageViewLogo.height = '0dp';
				imageViewLogo.width = '0dp';
				imageViewLogo.top = '5dp';
			} else {
				imageViewLogo.height = '120dp';
				imageViewLogo.width = '120dp';
				imageViewLogo.top = '5dp';
			}
		} else {
			//Portrait
			imageViewLogo.height = '120dp';
			imageViewLogo.width = '120dp';
			imageViewLogo.top = '5dp';
		}

	};

	function showLoginIndicator(show) {
		if (show) {
			indicatorLogin.show();
			textFieldLogin.visible = false;
			textFieldPassword.visible = false;
			textFieldPassword.visible = false;
			viewShowPassword.visible = false;
			buttonLogin.height = 0;
		} else {
			indicatorLogin.hide();
			textFieldLogin.visible = true;
			textFieldPassword.visible = true;
			viewShowPassword.visible = true;
			buttonLogin.height = '45dp';
		}

	}

	if (Ti.Platform.osname == 'ipad') {
		textFieldLogin.top = '20dp';
		textFieldPassword.top = '20dp';
		viewShowPassword.top = '20dp';
		buttonLogin.top = '50dp';
	}

	LoginWindow.open();
});
