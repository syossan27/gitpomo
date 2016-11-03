$(document).ready(function () {
	var href = window.location.href;
	var href_array = href.split('/');
	var user_name = href_array[3];
	var repository_name = href_array[4];
	var issue_number = href_array[6];
	var pomo_count = 0;

	// ポモ表示領域の準備
	if (!$('#pomo-area')[0]) {
		$('#partial-discussion-header')
		.append($('<div id="pomo-area">')
						.append('<button id="add-pomo-btn">＋🍅')
						.append('<span id="pomo-mark">')
						.append('<span id="pomo-count"> + pomo_count')
						.append('<span id="pomo-count-suffix">pomo</span>')
					 );
		// chrome.storageから保存してあるポモ数を取得
		chrome.storage.sync.get({ [user_name]: { [repository_name]: { [issue_number]: pomo_count } } }, function (pomo_info) {
			// ポモ数が保存してあった場合
			// ポモ数の表示更新
			pomo_count = pomo_info[user_name][repository_name][issue_number];
			$('#pomo-count').text(pomo_count);

			// ポモマークをお表示
			var pomo_mark = '';
			for(i = 0; i < pomo_count; i++) {
				pomo_mark += '🍅';
			}
			$('#pomo-mark').append(pomo_mark);
		});

		$('#add-pomo-btn').on('click', function() {
			pomo_count = parseInt($('#pomo-count').text());
			$('#pomo-mark').append('🍅');
			pomo_count = pomo_count + 1;
			$('#pomo-count').text(pomo_count);
			chrome.storage.sync.set({ [user_name]: { [repository_name]: { [issue_number]: pomo_count } } }, function () {
			});
		});
	}

});
