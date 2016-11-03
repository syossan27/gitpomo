chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab) {
	if (changeInfo.status !== 'loading') return
	chrome.tabs.insertCSS(tab.id, { file:"main.css" });
	executeScripts(null, [
		{ file: "jquery.min.js" },
		{ file: "script.js" },
	])
});

function executeScripts(tabId, injectDetailsArray) {
	function createCallback(tabId, injectDetails, innerCallback) {
		return function () {
			chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
		};
	}

	var callback = null;

	for (var i = injectDetailsArray.length - 1; i >= 0; --i)
	callback = createCallback(tabId, injectDetailsArray[i], callback);

	if (callback !== null)
		callback();   // execute outermost function
}
