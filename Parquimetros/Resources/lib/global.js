function showMessage(message) {
	Ti.UI.createAlertDialog({
		message : message,
		ok : L('ok'),
		title : L('attention')
	}).show();
}

function showMessageError(message) {
	Ti.UI.createAlertDialog({
		message : message,
		ok : L('ok'),
		title : L('unexpected_error')
	}).show();
}

function isInt(value) {
	return !isNaN(value) && parseInt(Number(value)) == value && !isNaN(parseInt(value, 10));
}

function validateRFC(rfc) {
	var regexrfc = /[A-Z]{3,4}[0-9]{6}[A-Z0-9]{3}/;
	return regexrfc.test(rfc);
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function removeChildrens(view) {
	for (i in view.children) {
		var child = view.children[0];
		removeChildrens(child);
		view.remove(child);
		child = null;
	}
}
