var SyoboiUtils = function() {
};

SyoboiUtils.filterWarningItemList = function(result) {
	var warningItemList = new Array();
	if(result.items.length === 0) {
		return warningItemList;
	}
	$.each(result.items, function(key, item) {
		if(item.Warn === 0 || !isWarningItem(item)) {
			return true;
		}
		warningItemList.push(item);
	});
	return warningItemList;
}

var isWarningItem = function(item) {
	var binaryNumber = item.Flag.toString(2);
	return binaryNumber.substring(binaryNumber.length - 1) === '1';
}