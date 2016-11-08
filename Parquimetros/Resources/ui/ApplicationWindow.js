function ApplicationWindow() {

	var network = require('/lib/network');

	Titanium.include('/lib/global.js');

	MenuView = require('ui/MenuView');

	ApplicationWindow = Ti.UI.createWindow({
		exitOnClose : false,
		backgroundColor : Ti.App.backgroundColor,
	}),
	ActionBarView = require('lib/ActionBarView'),
	actionBar = new ActionBarView({
		tabs : [{
			text : L('fines'),
			id : 1,
			image : '/images/fine_icon.png',
			selectedImage : '/images/fine_icon_selected.png',
			selected : true
		}, {
			text : L('consults'),
			image : '/images/consult_icon.png',
			selectedImage : '/images/consult_icon_selected.png',
			id : 2
		}]
	});

	if (Ti.Platform.name == 'android') {
		ApplicationWindow.windowSoftInputMode = Titanium.UI.Android.SOFT_INPUT_STATE_HIDDEN;
	}

	viewBarApp = Titanium.UI.createView({
		backgroundColor : Ti.App.appColor,
		width : '100%',
		layout : 'horizontal',
		height : '60dp',
		top : 0
	});

	viewBarAppLeft = Titanium.UI.createView({
		backgroundColor : 'transparent',
		width : '55%',
		height : Ti.UI.FILL
	});

	viewBarAppRight = Titanium.UI.createView({
		backgroundColor : 'transparent',
		width : '45%',
		height : Ti.UI.FILL
	});

	viewMenu = new MenuView();

	FinesView = require('ui/FinesView');
	viewFines = new FinesView();

	ConsultView = require('ui/ConsultView');
	viewConsult = new ConsultView();

	imageViewList = Titanium.UI.createImageView({
		bubbleParent : true,
		touchEnabled : false,
		image : '/images/list.png',
		left : 0,
		width : '25dp',
		height : '25dp',
		center : {
			y : '63%'
		}
	});

	labelAppTitle = Ti.UI.createLabel({
		bubbleParent : true,
		touchEnabled : false,
		text : L('fines'),
		font : {
			fontSize : Ti.App.titleFontSizeBig
		},
		color : Ti.App.labelTitleColor,
		bottom : '8dp',
		left : '35dp',
		right : '5dp'
	});

	viewCameraContainer = Titanium.UI.createView({
		backgroundColor : 'transparent',
		width : '55dp',
		height : Ti.UI.FILL,
		right : 0
	});

	imageViewCamera = Titanium.UI.createImageView({
		bubbleParent : true,
		image : '/images/camera_icon.png',
		width : '45dp',
		height : '45dp',
		bottom : '2dp'
	});

	scrollableView = Ti.UI.createScrollableView({
		top : '110dp',
		views : [viewFines, viewConsult],
		showPagingControl : false
	});

	imageViewQr = Ti.UI.createImageView({
		image : '/images/qr_icon.png',
		bubbleParent : false,
		width : '70dp',
		height : '70dp',
		bottom : '5dp',
		right : '5dp'
	});

	viewBarAppLeft.add(imageViewList);
	viewBarAppLeft.add(labelAppTitle);

	viewCameraContainer.add(imageViewCamera);

	viewBarAppRight.add(viewCameraContainer);

	viewBarApp.add(viewBarAppLeft);
	viewBarApp.add(viewBarAppRight);

	ApplicationWindow.add(viewBarApp);
	ApplicationWindow.add(scrollableView);
	ApplicationWindow.add(imageViewQr);
	ApplicationWindow.add(actionBar);
	ApplicationWindow.add(viewMenu);

	Ti.App.Properties.setInt('current_page', scrollableView.currentPage);

	/**
	 **Eventlisteners
	 */

	imageViewQr.addEventListener('click', function(e) {
		var currentTime = new Date();
		if (currentTime - e.source.clickTime < 3000) {
			return;
		}
		e.source.clickTime = currentTime;

		if (Ti.Platform.osname === 'android') {
			QRWindow = require('/ui/QRWindow');

			try {
				if (Ti.App.Properties.getInt('current_page') == 0) {
					new QRWindow({
						textfield : textFieldEnrollmentNumber
					});
				} else if (Ti.App.Properties.getInt('current_page') == 1) {
					new QRWindow({
						textfield : textFieldEnrollmentNumberConsult
					});
				}
			} catch(ex) {
				Ti.API.info('OpenQR ex ' + ex);
			}
		} else {
			ScannerWindow = require('/ui/ScannerWindow');

			try {
				if (Ti.App.Properties.getInt('current_page') == 0) {
					new ScannerWindow({
						textfield : textFieldEnrollmentNumber
					});
				} else if (Ti.App.Properties.getInt('current_page') == 1) {
					new ScannerWindow({
						textfield : textFieldEnrollmentNumberConsult
					});
				}
			} catch(ex) {
				Ti.API.info('ScannerWindow ex ' + ex);
			}
		}
	});

	scrollableView.addEventListener('scrollend', function(e) {
		Ti.App.Properties.setInt('current_page', e.currentPage);

		if (e.currentPage == 0) {
			Ti.App.Properties.fireEvent('selectedTab', {
				id : 1
			});

			viewCameraContainer.visible = true;
		} else if (e.currentPage == 1) {
			Ti.App.Properties.fireEvent('selectedTab', {
				id : 2
			});

			viewCameraContainer.visible = false;
		}
	});

	Ti.App.Properties.addEventListener('startScrolling', function(e) {
		if (e.id == 1) {
			scrollableView.scrollToView(viewFines);
		} else if (e.id == 2) {
			scrollableView.scrollToView(viewConsult);
		}
	});

	viewBarAppLeft.addEventListener('click', function(e) {
		if (viewMenu.isvisible) {
			Ti.App.fireEvent('hide_menu');
		} else {
			showMenu();
		}
	});

	viewCameraContainer.addEventListener('click', function(e) {
		var currentTime = new Date();
		if (currentTime - e.source.clickTime < 2000) {
			return;
		}
		e.source.clickTime = currentTime;

		showCamera();
	});

	Ti.App.addEventListener('hide_menu', function() {
		imageViewList.left = 0;
		viewMenu.animate({
			left : '-200%',
			duration : 500
		});
		viewMenu.children[0].animate({
			opacity : 0,
			duration : 600
		});
		viewMenu.isvisible = false;
	});

	function showMenu() {
		if (viewMenu._left == true) {
			Ti.App.fireEvent('hide_menu');
		} else {
			imageViewList.left = '-8dp';
			viewMenu.animate({
				left : 0,
				duration : 500
			});
			viewMenu.children[0].animate({
				opacity : 0.8,
				duration : 600
			});
			viewMenu.isvisible = true;
		}
	};

	var mediaIndex = 0;

	function showCamera() {
		var cameraTransform = Ti.UI.create2DMatrix();
		cameraTransform = cameraTransform.scale(1);

		Ti.Media.showCamera({
			error : function(e) {
				showMessageError(L('try_again'));
			},
			success : function(event) {
				//Titanium.Media.hideCamera();

				var viewMediaContainer = Ti.UI.createView({
					index : mediaIndex,
					width : '160dp',
					height : '190dp',
					right : '10dp',
				});

				mediaIndex += 1;

				var imageRemove = Titanium.UI.createImageView({
					bubbleParent : true,
					image : '/images/remove_icon.png',
					right : 0,
					top : 0,
					width : '40dp',
					height : '40dp'
				});

				imageRemove.addEventListener('click', function(e) {
					/*	try {
					 e.source.getParent().getParent().remove(e.source.getParent().getParent().children[e.source.getParent().index]);

					 if (e.source.getParent().getParent().children.length > 0) {
					 for (var i = 0 in e.source.getParent().getParent().children) {

					 e.source.getParent().getParent().children[i].index = i;

					 mediaIndex = i++;
					 }
					 } else {
					 mediaIndex = 0;
					 }
					 } catch(ex) {
					 Ti.API.info('removeimage ex ' + ex.toString());
					 }*/

				});

				if (event.mediaType === Ti.Media.MEDIA_TYPE_PHOTO) {

					var date = new Date();
					var filename = 'Imagen' + date.getTime() + '.png';
					var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, filename);
					file.write(event.media);

					Ti.API.info('path ' + file.nativePath);

					var imageViewPhoto = Ti.UI.createImageView({
						path : file.nativePath,
						width : Ti.UI.FILL,
						height : Ti.UI.FILL,
						image : event.media
					});

					viewMediaContainer.add(imageViewPhoto);
					viewMediaContainer.add(imageRemove);

					scrollViewMediaContainer.add(viewMediaContainer);

				} else if (event.mediaType === Ti.Media.MEDIA_TYPE_VIDEO) {
					var video = event.media;
					movieFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'mymovie.mov');
					movieFile.write(video);
				}

			},
			//autohide : true,
			animated : false,
			allowImageEditing : false,
			showControls : true,
			//saveToPhotoGallery : true,
			allowEditing : true,
			//transform : cameraTransform,
			videoQuality : Ti.Media.QUALITY_MEDIUM,
			mediaTypes : [Titanium.Media.MEDIA_TYPE_VIDEO, Titanium.Media.MEDIA_TYPE_PHOTO]
		});

	}


	viewBarAppLeft.addEventListener('touchstart', function(e) {
		e.source.backgroundColor = Ti.App.selectedColor;
	});

	viewBarAppLeft.addEventListener('touchend', function(e) {
		e.source.backgroundColor = 'transparent';
	});

	viewBarAppLeft.addEventListener('touchcancel', function(e) {
		e.source.backgroundColor = 'transparent';
	});

	viewCameraContainer.addEventListener('touchstart', function(e) {
		viewCameraContainer.backgroundColor = Ti.App.selectedColor;
	});

	viewCameraContainer.addEventListener('touchend', function(e) {
		viewCameraContainer.backgroundColor = 'transparent';
	});

	viewCameraContainer.addEventListener('touchcancel', function(e) {
		viewCameraContainer.backgroundColor = 'transparent';
	});

	imageViewQr.addEventListener('touchstart', function(e) {
		e.source.image = '/images/qr_icon_pressed.png';
	});

	imageViewQr.addEventListener('touchend', function(e) {
		e.source.image = '/images/qr_icon.png';
	});

	imageViewQr.addEventListener('touchcancel', function(e) {
		e.source.image = '/images/qr_icon.png';
	});

	Ti.App.addEventListener('close_app', function(e) {
		ApplicationWindow.close();
	});

	ApplicationWindow.addEventListener('android:back', function(e) {
		if (viewMenu.isvisible) {
			Ti.App.fireEvent('hide_menu');
		} else {
			ApplicationWindow.close();
		}
	});

	setInterval(function(i) {
		Ti.API.info('interval');
		network.createTrack(function(track_response) {
		});
	}, 360000);

	return ApplicationWindow;
};

module.exports = ApplicationWindow;
