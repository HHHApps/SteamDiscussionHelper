/* This content script helps make sure it auto-runs every
	time you go to the steam store domain. */
$( document ).ready(function() {
	var nextInQueueButton = $('.btn_next_in_queue');
	if(nextInQueueButton){
		nextInQueueButton.click();
	}
});