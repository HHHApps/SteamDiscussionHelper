/* This content script helps make sure it auto-runs every
	time you go to the steam store domain. */
$( document ).ready(function() {
	var newQueueButton = $('#refresh_queue_btn');
	var nextInQueueButton = $('.btn_next_in_queue');
	if(newQueueButton){
		newQueueButton.click();
	}
	if(nextInQueueButton){
		nextInQueueButton.click();
	}
});