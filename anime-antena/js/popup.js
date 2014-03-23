$(document).ready(function() {
	new Popup();
});

var Popup = (function() {
	Popup.LIMIT = 14;

	function Popup() {
		$('#anime-antena-container .table').hide();

		var now = new Date();
		var dest = new Date(now.getTime());
		dest.setDate(now.getDate() + Popup.LIMIT);

		this.setUpDateRange(now, dest);
		this.setupPrograms(now);
	}

	Popup.prototype.setUpDateRange = function(now, dest) {
		var dateRange = new Array();
		dateRange.push(now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日');
		dateRange.push('～');
		dateRange.push(dest.getFullYear() + '年' + (dest.getMonth() + 1) + '月' + dest.getDate() + '日');
		dateRange.push('まで');
		$('.range').append(dateRange.join(''));
	}

	Popup.prototype.setupPrograms = function(now) {
		var self = this;
		var params = { alt: 'json', days: Popup.LIMIT, start: this.getStartTime(now) }
		new Syoboi().getItemList(params, function(result) {
			self.displayAirTimeChangedPrograms(result);
			self.displayNewPrograms(result);
		}, function() {
			$('#anime-antena-container .message').text("通信エラーが発生しました");
		});
	}

	Popup.prototype.getStartTime = function(now) {
		return String(now.getFullYear()) + String(this.format(now.getMonth() + 1)) + String(this.format(now.getDate())) + '0000';
	}

	Popup.prototype.displayAirTimeChangedPrograms = function(result) {
		var warningItemList = SyoboiUtils.filterWarningItemList(result);
		if(warningItemList.length === 0) {
			$('.air-time-change-badge').text(0);
			$('#anime-antena-container #air-time-changed-programs .message').text('該当する結果はありませんでした');
			return;
		}
		$('.air-time-change-badge').text(warningItemList.length);
		$('#anime-antena-container #air-time-changed-programs .message').hide();
		$('#anime-antena-container #air-time-changed-programs .table').show();
		this.appendResults(warningItemList, $('#air-time-changed-programs .anime-antena-table-contents'));
	}

	Popup.prototype.displayNewPrograms = function(result) {
		var newProgramItemList = SyoboiUtils.filterNewProgramItemList(result);
		if(newProgramItemList.length === 0) {
			$('.new-program-badge').text(0);
			$('#anime-antena-container #new-programs .message').text('該当する結果はありませんでした');
			return;
		}
		$('.new-program-badge').text(newProgramItemList.length);
		$('#anime-antena-container #new-programs .message').hide();
		$('#anime-antena-container #new-programs .table').show();
		this.appendResults(newProgramItemList, $('#anime-antena-container #new-programs .anime-antena-table-contents'));
	}

	Popup.prototype.appendResults = function(itemList, $target) {
		var self = this;
		$.each(itemList, function(index, item) {
			var row = new Array();
			row.push('<tr>');
			row.push('<td class="anime-antena-column-air-time">' + self.formatTime(item.StTime) + '</td>');
			row.push('<td>' + '<a href="http://cal.syoboi.jp/tid/' + item.TID + '#'　+ item.PID + '">' + self.getTitle(item) + '</a>' + '</td>');
			row.push('<td>' + item.ProgComment + '</td>');
			row.push('<td>' + item.ChName + '</td>');
			row.push('</tr>');
			$target.append(row.join(''));
		});
	}

	Popup.prototype.getTitle = function(item) {
		return item.Count != null ? item.Title　+ '#' + item.Count : item.Title;
	}

	Popup.prototype.formatTime = function(time) {
		var date = new Date(time * 1000);
		var array = new Array();
		array.push(this.format(date.getMonth() + 1) + '月');
		array.push(this.format(date.getDate()) + '日');
		array.push(this.format(date.getHours()) + '時');
		array.push(this.format(date.getMinutes()) + '分');
		return array.join('');
	}

	Popup.prototype.format = function(time) {
		return String(time).length === 1 ? '0' + String(time) : time;
	}

	return Popup;
})();