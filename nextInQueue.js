/* Regex to compare the url to. */
var urlRegex = /^https?:\/\/(?:[^\.]+\.)?store\.steampowered\.com\/?/;

/* Inject jQuery into the page just to make sure we have it,
	then inject the clickNextInQueue script. */
function clickNextInQueue(tabId){
	chrome.tabs.executeScript(tabId, { file: "/lib/jquery-1.11.3.min.js" });
	chrome.tabs.executeScript(tabId, { file: "clickNextInQueue.js" });
}

/* Find all open tabs that are opened to a Steam store page. */
function queryTabs(){
	chrome.tabs.query({
		url: "http://store.steampowered.com/*"
	}, function(tabs) {
		_.each(tabs, function(tab){
			
			if (urlRegex.test(tab.url)) {
				clickNextInQueue(tab.id);
			}
		});
	});
}

/* Initiated from the content script. Makes it so it auto-runs. */
chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == "loadSteamNextInQueue") {
		queryTabs();
	}
});