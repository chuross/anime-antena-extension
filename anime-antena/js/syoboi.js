var Syoboi = (function() {
	var constructor = function() {
	}

	constructor.prototype.getItemList = function(params, successCallback, failedCallback) {
		var url = "http://cal.syoboi.jp/rss2.php";
		var query = createQueryString(params);
		$.ajax({
			type: 'GET',
			url: url,
			data: query,
			data_type: 'json',
			timeout: 10 * 1000,
			success: function(data) {
				onSuccess(data, successCallback);
			},
			error: function() {
				onError();
			}
		});
	}

	function createQueryString(params) {
		var query = new Array();
		if(params.length === 0) {
			return "";
		}
		$.each(params, function(key, value) {
			query.push(key + '=' + value);
		});
		return query.join('&');
	}

	function onSuccess(data, successCallback) {
		if(successCallback == null) {
			return;
		}
		successCallback(data);
	}

	function onError(failedCallback) {
		if(failedCallback == null) {
			return;
		}
		failedCallback();
	}

	return constructor;
})();