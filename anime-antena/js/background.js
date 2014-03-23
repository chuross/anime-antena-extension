$(document).ready(function() {
	executeRefresh();
	setInterval(function() {
		console.log('更新を開始します');
		executeRefresh();
	}, 30 * 60 * 1000);
});

var executeRefresh = function() {
	var now = new Date();
	var params = { alt: 'json', days: 14, start: getStartTime(now) }
	new Syoboi().getItemList(params, function(result) {
		onSuccess(result);
	});
}

var getStartTime = function(now) {
	return String(now.getFullYear()) + String(format(now.getMonth() + 1)) + String(format(now.getDate())) + '0000';
}

var format = function(target) {
	return String(target).length === 1 ? '0' + String(target) : target;
}

var onSuccess = function(result) {
	var warningItemList = SyoboiUtils.filterWarningItemList(result);
	var newProgramItemList = SyoboiUtils.filterNewProgramItemList(result);
	
	if(warningItemList.length === 0 && newProgramItemList.length === 0) {
		return;
	}
	chrome.browserAction.setBadgeText({"text": String(warningItemList.length + newProgramItemList.length)});
}
