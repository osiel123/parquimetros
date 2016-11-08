function MenuView() {

	var network = require('/lib/network');
	var database = require('/lib/database');

	viewMenuContainer = Ti.UI.createView({
		left : -'200%',
		isvisible : false,
		touchEnabled : true,
		width : '100%',
		height : Ti.UI.FILL,
		backgroundColor : 'transparent',
		top : '60dp',
		left : '-200%'
	});

	viewBackgroundMenu = Ti.UI.createView({
		top : 0,
		height : Ti.UI.FILL,
		width : Ti.UI.FILL,
		touchEnabled : true,
		backgroundColor : 'black',
		opacity : 0
	});

	viewMenu = Ti.UI.createView({
		top : 0,
		width : '80%',
		height : Ti.UI.FILL,
		left : 0,
		backgroundColor : 'white',
		borderColor : '#d3d3d3'
	});

	tableViewMenu = Ti.UI.createTableView({
		top : 0,
		left : 0,
		width : Ti.UI.FILL,
		height : Ti.UI.SIZE,
		backgroundColor : Ti.App.tableRowBackgroundColor,
		separatorColor : 'transparent'
	});

	var createTableViewRow = function(rowData) {
		var row = Ti.UI.createTableViewRow({
			id : rowData.id,
			height : '55dp',
			width : Ti.UI.FILL,
			color : Ti.App.tableRowLabelColor,
			backgroundSelectedColor : Ti.App.selectedColor,
			backgroundColor : Ti.App.tableRowBackgroundColor
		});

		var image = Ti.UI.createImageView({
			image : rowData.image,
			touchEnabled : false,
			bubbleParent : true,
			left : 0,
			width : '45dp',
			height : '45dp'
		});

		var title = Ti.UI.createLabel({
			color : Ti.App.labelColor,
			left : '55dp',
			width : Ti.UI.SIZE,
			height : Ti.UI.SIZE,
			text : rowData.title,
			font : {
				fontSize : Ti.App.fontSize
			}
		});

		viewLineRow = Titanium.UI.createView({
			width : '90%',
			height : 1,
			backgroundColor : Ti.App.tableRowSeparatorColor,
			bottom : 0
		});

		row.add(title);
		row.add(image);
		row.add(viewLineRow);

		return row;
	};

	rows = [];

	rows.push(createTableViewRow({
		id : 1,
		title : L('reprint'),
		image : '/images/reprint_icon.png'
	}));

	rows.push(createTableViewRow({
		id : 9,
		title : L('out'),
		image : '/images/close_icon.png'
	}));

	tableViewMenu.addEventListener('click', function(e) {
		viewMenu.enabled = false;

		if (e.rowData.id == 0) {
			Ti.App.fireEvent('hide_menu');
		} else if (e.rowData.id == 1) {
			Ti.App.fireEvent('hide_menu');

			GetTicketModalWindow = require('/ui/GetTicketModalWindow');
			new GetTicketModalWindow({}).open();

		} else if (e.rowData.id == 9) {
			Ti.App.fireEvent('hide_menu');
			network.signOut(function(signout_response) {
				database.deleteUser(function(user_response) {
					Ti.App.fireEvent('close_app');
				});
			});
		}

		setTimeout(function() {
			viewMenu.enabled = true;
		}, 2000);
	});

	viewBackgroundMenu.addEventListener('click', function(e) {
		Ti.App.fireEvent('hide_menu');
	});

	tableViewMenu.setData(rows);

	viewMenu.add(tableViewMenu);

	viewMenuContainer.add(viewBackgroundMenu);
	viewMenuContainer.add(viewMenu);

	return viewMenuContainer;
}

module.exports = MenuView;
