$(document).ready(function() {
	$('#anime-antena-container .table').hide();

	var now = new Date();
	var endTime = new Date(now.getTime());
	endTime.setDate(now.getDate() + 14);
	
	var dateRange = new Array();
	dateRange.push(now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日');
	dateRange.push('～');
	dateRange.push(endTime.getFullYear() + '年' + (endTime.getMonth() + 1) + '月' + endTime.getDate() + '日');
	dateRange.push('まで');
	$('#anime-antena-container h1 .range').append(dateRange.join(''));
	var params = { alt: 'json', days: 14, start: getStartTime(now) }
	new Syoboi().getItemList(params, function(result) {
		displayResult(result);
	}, function() {
		$('#anime-antena-container .message').text("通信エラーが発生しました");
	});
});

var getStartTime = function(now) {
	return String(now.getFullYear()) + String(format(now.getMonth() + 1)) + String(format(now.getDate())) + '0000';
}

var displayResult = function(result) {
	var warningItemList = SyoboiUtils.filterWarningItemList(result);
	if(warningItemList.length === 0) {
		$('#anime-antena-container .message').text('該当する結果はありませんでした');
		return;
	}
	$('#anime-antena-container .message').hide();
	$('#anime-antena-container .table').show();
	$.each(warningItemList, function(index, item) {
		var row = new Array();
		row.push('<tr>');
		row.push('<td class="anime-antena-column-air-time">' + getAirTimeString(item.StTime) + '</td>');
		row.push('<td>' + '<a href="http://cal.syoboi.jp/tid/' + item.TID + '#'　+ item.PID + '">' + getTitle(item) + '</a>' + '</td>');
		row.push('<td>' + item.ProgComment + '</td>');
		row.push('<td>' + item.ChName + '</td>');
		row.push('</tr>');
		$('.anime-antena-table-contents').append(row.join(''));
	});
}

var getTitle = function(item) {
	return item.Count != null ? item.Title　+ '#' + item.Count : item.Title;
}

var getAirTimeString = function(time) {
	var date = new Date(time * 1000);
	var array = new Array();
	array.push(format(date.getMonth() + 1) + '月');
	array.push(format(date.getDate()) + '日');
	array.push(format(date.getHours()) + '時');
	array.push(format(date.getMinutes()) + '分');
	return array.join('');
}

var format = function(target) {
	return String(target).length === 1 ? '0' + String(target) : target;
}