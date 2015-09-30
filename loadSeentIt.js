/* This content script helps make sure it auto-runs every
	time you go to the imgur domain. */
chrome.runtime.sendMessage({
    action: "loadSeentIt"
});