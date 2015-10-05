/* Regex-patterns to check URLs against. It matches URLs like: http[s]://[...]imgur.com[...] */
var baseURLRegex = /^https?:\/\/(?:[^\.]+\.)?imgur\.com/;
var accountURLRegex = /^https?:\/\/(?:[^\.]+\.)?imgur\.com\/account\/?/;
var galleryURLRegex = /^https?:\/\/(?:[^\.]+\.)?imgur\.com\/gallery\/?/;

function addJavascriptLibraries(tabId){
	chrome.tabs.executeScript(tabId, { file: "/lib/jquery-1.11.3.min.js" });
	chrome.tabs.executeScript(tabId, { file: "/lib/underscore-min.js" });
}

function addCSS(tabId){
	chrome.tabs.insertCSS(tabId, { file: "/styles/seentIt.css" });
}

function updateGallery(tabId){
	addJavascriptLibraries(tabId);
	addCSS(tabId);
	chrome.tabs.executeScript(tabId, { file: "updateGallery.js" });
}

function updatePost(tabId){
	addJavascriptLibraries(tabId);
	addCSS(tabId);
	chrome.tabs.executeScript(tabId, { file: "updatePost.js" });
}

function queryTabs(){
	/* Look through all open tabs with a url that matches imgur.com.
		This covers imgur.com, imgur.com/gallery/, and sub-galleries. */
	chrome.tabs.query({
		url: "http://imgur.com/*"
	}, function(tabs) {
		_.each(tabs, function(tab){
			
			if (galleryURLRegex.test(tab.url)) {
				/* The URL is for a gallery post. */
				updatePost(tab.id);
			} else if(!accountURLRegex.test(tab.url)){
				/* This account URL check is to prevent unwanted events like marking 
					gallery favorites. We only want URL's for gallery lists. */
				updateGallery(tab.id);
			}
		});
	});
}

function markAsSeent(galleryId) {
	chrome.storage.sync.get("seentIt", function (obj) {
		var seentPosts = !obj.seentIt ? [] : obj.seentIt.val;
		
		if(!_.contains(seentPosts, galleryId)){
			seentPosts.push(galleryId);

			var saveObj = {val: seentPosts};
			chrome.storage.sync.set({ 'seentIt': saveObj });
		}
	});
}

/* Initiated from the content script. Makes it so it auto-runs. */
chrome.runtime.onMessage.addListener(function(request, sender) {
	if (request.action == "loadSeentIt") {
		queryTabs();
	}
});

/* Get notified when tabbing through gallery posts. */
chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
	if (details &&
		details.hasOwnProperty("tabId") &&
		details.hasOwnProperty("url") &&
		details.hasOwnProperty("transitionType") &&
		details.transitionType === "link" &&
		baseURLRegex.test(details.url)) {
		
		var galleryId = details.url.substr(details.url.lastIndexOf("/") + 1);
		markAsSeent(galleryId);
		updatePost(details.tabId);
	}
});