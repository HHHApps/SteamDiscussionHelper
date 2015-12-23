/* This content script helps make sure it auto-runs every
	time you go to the steam store domain. */
chrome.runtime.sendMessage({
    action: "loadSteamNextInQueue"
});