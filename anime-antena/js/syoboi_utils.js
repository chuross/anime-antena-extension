var SyoboiUtils = function() {
};

SyoboiUtils.filterWarningItemList = function(result) {
	var warningItemList = new Array();
	if(result.items.length === 0) {
		return warningItemList;
	}
	$.each(result.items, function(key, item) {
		if(item.Warn === 0 || !SyoboiUtils.isWarningItem(item)) {
			return true;
		}
		warningItemList.push(item);
	});
	return warningItemList;
}

SyoboiUtils.isWarningItem = function(item) {
	return SyoboiUtils.checkFlag(item, 1);
}

SyoboiUtils.filterNewProgramItemList = function(result) {
	var newProgramItemList = new Array();
	if(result.items.length === 0) {
		return newProgramItemList;
	}
	$.each(result.items, function(key, item) {
		if(!SyoboiUtils.isNewProgramItem(item)) {
			return true;
		}
		newProgramItemList.push(item);
	});

	return newProgramItemList;
}

SyoboiUtils.isNewProgramItem = function(item) {
	return SyoboiUtils.checkFlag(item, 2);
}

SyoboiUtils.checkFlag = function(item, place) {
	var flag = parseInt(item.Flag);
	var binaryNumber = SyoboiUtils.formatBinaryNumber(flag.toString(2));
	return binaryNumber.substring(binaryNumber.length - place).substring(0, 1) === '1';
}

SyoboiUtils.formatBinaryNumber = function(binaryNumber) {
	var shortage = 4 - String(binaryNumber).length;
	var formatedBinaryNumber = binaryNumber;
	while(shortage > 0) {
		formatedBinaryNumber = '0' + formatedBinaryNumber;
		shortage--;
	}
	return formatedBinaryNumber;
}