/* Regex to compare the url to. */
var urlRegex = /^https?:\/\/(?:[^\.]+\.)?steamcommunity\.com\/?/;
var appDiscussionRegex = /^https?:\/\/(?:[^\.]+\.)?steamcommunity\.com\/app\/[0-9]+\/discussions\/?/;
var groupDiscussionRegex = /^https?:\/\/(?:[^\.]+\.)?steamcommunity\.com\/groups\/[a-zA-Z0-9]+\/discussions/;
var regularDiscussionRegex = /^https?:\/\/(?:[^\.]+\.)?steamcommunity\.com\/discussions/;

/* Inject jQuery into the page just to make sure we have it,
	then inject the updatePage script. */
function updatePage(tabId){
	chrome.tabs.insertCSS(tabId, { file: "/styles/steamDiscussionHelper.css" });
	chrome.tabs.executeScript(tabId, { file: "/lib/jquery-1.11.3.min.js" });
	chrome.tabs.executeScript(tabId, { file: "updatePage.js" });
}

/* Find all open tabs that are opened to a Steam Community page. */
function queryTabs(){
	chrome.tabs.query({
		url: "http://steamcommunity.com/*"
	}, function(tabs) {
		_.each(tabs, function(tab){
			
			if (appDiscussionRegex.test(tab.url) || groupDiscussionRegex.test(tab.url) || regularDiscussionRegex.test(tab.url)) {
				updatePage(tab.id);
			}
		});
	});
}

/* Initiated from the content script. Makes it so it auto-runs. */
chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == "loadSteamDiscussionHelper") {
		queryTabs();
	}
});