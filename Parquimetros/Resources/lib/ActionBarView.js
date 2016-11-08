var osName = Ti.Platform.osname,
    theme = {
	backgroundColor : '#fbfbfb',
	borderColor : '#ebeaea',
	textColor : '#9f9f9f',
	selectedTextColor : Ti.App.appColor,
	dividerColor : '#fbfbfb',
	selectedColor : Ti.App.appColor,
	height : '45dp',
	buttonHeight : '48dp',
	selectedButtonHeight : '38dp',
	imageWidth : '35dp',
	imageHeight : '35dp',
	dividerWidth : 1,
	dividerHeight : '32dp',
	fontSize : '12dp',
},
    events = {
	'TAB_CLICK' : 'ActionBar.NavigationTab:Click'
};

function createNavigationTabGroup(tabs) {
	var _tabs = tabs || [],
	    _tabCount = _tabs.length,
	    _tabWidth = 98.8 / _tabs.length,
	    _i = 0,
	    _deviceWidth = Ti.Platform.displayCaps.platformWidth,
	    _width = (_deviceWidth / _tabCount) - 1,
	    _selectedTab,
	    _view = Ti.UI.createView({
		layout : 'horizontal',
		width : Ti.UI.FILL,
		top : 1,
		bottom : 1
	});

	for (; _i < _tabCount; _i++) {
		_tabs[_i].width = Math.round(_tabWidth) + '%';
		_tabs[_i] = buildTab(_tabs[_i]);
		_view.add(_tabs[_i].tabView);
		_view.add(tabSeparator());
	}

	_view.addEventListener(events.TAB_CLICK, function(e) {
		var _n = 0,
		    _len = _tabs.length,
		    _aTab;
		for (; _n < _len; _n++) {
			_aTab = _tabs[_n];
			if (_aTab.tabView.id == _selectedTab) {
				_aTab.select(false);
			}
			if (_aTab.tabView.id == e.tabId) {
				_aTab.select(true);
				labelAppTitle.text = e.tabText;
			}
		}
		_selectedTab = e.tabId;

		Ti.App.Properties.fireEvent('startScrolling', {
			id : _selectedTab
		});
	});

	Ti.App.Properties.addEventListener('selectedTab', function(e) {
		for ( i = 0; i < _tabs.length; i++) {
			if (_tabs[i].tabView.id == e.id) {
				labelAppTitle.text = _tabs[i].tabView.text;
				_tabs[i].select(true);
			} else {
				_tabs[i].select(false);
			}
		}
	});

	function tabSeparator() {
		var separatorView = Ti.UI.createView({
			backgroundColor : theme.backgroundColor,
			width : theme.dividerWidth
		}),
		    separator = Ti.UI.createView({
			height : theme.dividerHeight,
			backgroundColor : theme.dividerColor
		});

		separatorView.add(separator);
		return separatorView;
	}

	function buildTab(params) {
		var _params = params || {},
		    _tabView,
		    _tabImageContainer,
		    _tabImage,
		    _config = {
			id : _params.id || (new Date()).getTime() + '',
			text : _params.text || "Tab",
			image : _params.image,
			selectedImage : _params.selectedImage,
			selectedColor : _params.selectedColor || theme.selectedColor,
			backgroundColor : _params.backgroundColor || theme.backgroundColor,
			textColor : _params.textColor || theme.textColor,
			width : _params.width || 'auto',
			selected : _params.selected || false
		};

		if (_config.selected) {
			_selectedTab = _config.id;
		}

		_tabView = Ti.UI.createView({
			id : _config.id,
			text : _config.text,
			image : _config.image,
			selectedImage : _config.selectedImage,
			backgroundColor : _config.selectedColor,
			width : _config.width,
			layout : 'vertical'
		});

		_tabImageContainer = Ti.UI.createView({
			backgroundColor : _config.backgroundColor,
			height : _config.selected ? theme.selectedButtonHeight : theme.buttonHeight,
			width : Ti.UI.FILL
		});

		_tabImage = Ti.UI.createImageView({
			image : _config.selected ? _config.selectedImage : _config.image,
			height : theme.imageHeight,
			width : theme.imageWidth
		});

		_tabImageContainer.add(_tabImage);
		_tabView.add(_tabImageContainer);

		_tabView.addEventListener('click', function() {
			_view.fireEvent(events.TAB_CLICK, {
				tabId : _tabView.id,
				tabText : _tabView.text
			});
		});

		return {
			tabView : _tabView,
			select : function(bool) {
				_tabImage.image = bool ? _config.selectedImage : _config.image;
				_tabImageContainer.height = bool ? theme.selectedButtonHeight : theme.buttonHeight;
			}
		};
	}

	return _view;
}

function ActionBarView(args) {
	var ActionBar = Ti.UI.createView({
		height : theme.height,
		backgroundColor : theme.borderColor,
		layout : 'horizontal',
		top : '60dp'
	}),
	    navigationTabGroup = createNavigationTabGroup(args.tabs);

	ActionBar.add(navigationTabGroup);

	return ActionBar;
}

module.exports = ActionBarView;
