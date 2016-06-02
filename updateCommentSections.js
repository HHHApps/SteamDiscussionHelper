function getTextArea(){
	/* I want to give the textarea an id for quicker access later */
	var textArea;
	if ($('textarea[class="commentthread_textarea"]').length > 0){
		textArea = $('textarea[class="commentthread_textarea"]');
		var childGuest = document.createElement("div");
		childGuest.id = "dhReplyArea";
		textArea[0].parentNode.parentNode.insertBefore(childGuest, textArea[0].parentNode.nextSibling);
	}
	
	return $('textarea[class="commentthread_textarea"]');
}

function getReplyArea(){
	return $('#dhReplyArea');
}

var keycodes = {
	replyBox: getTextArea()
};

$( document ).ready(function() {
	addReplyArea();
});

function addReplyArea(){
	appendToReplyArea();
	
	$('#dh_urlButton').click(function(){
		addUrlTag();
	});
	$('#dh_boldButton').click(function(){
		addBoldTag();
	});
	$('#dh_italicButton').click(function(){
		addItalicTag();
	});
	$('#dh_underlineButton').click(function(){
		addUnderlineTag();
	});
	$('#dh_headerButton').click(function(){
		addHeaderTag();
	});
	$('#dh_strikeButton').click(function(){
		addStrikeTag();
	});
	$('#dh_spoilerButton').click(function(){
		addSpoilerTag();
	});
	$('#dh_noParseButton').click(function(){
		addNoParseTag();
	});
	$('#dh_sarcasmButton').click(function(){
		addSarcasmTag();
	});
	$('#dh_offTopicButton').click(function(){
		addOffTopicTag();
	});
}

function appendToReplyArea(){
	var replyArea = getReplyArea();
	
	replyArea.append('<div class="dhReplyButtons" id="dhReplyButtons">' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_urlButton">URL</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_boldButton">B</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_italicButton">I</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_underlineButton">U</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_headerButton">H1</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_strikeButton">Strike</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_spoilerButton">Spoiler</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_noParseButton">No Parse</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_sarcasmButton">Sarcasm</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_offTopicButton">Off-Topic</button>' + 
					'</div>');
}

function addUrlTag(){
	addTag("url");
}

function addBoldTag(){
	addTag("b");
}

function addItalicTag(){
	addTag("i");
}

function addUnderlineTag(){
	addTag("u");
}

function addHeaderTag(){
	addTag("h1");
}

function addStrikeTag(){
	addTag("strike");
}

function addSpoilerTag(){
	addTag("spoiler");
}

function addNoParseTag(){
	addTag("noparse");
}

function addSarcasmTag(){
	addTag("sarcasm");
}

function addOffTopicTag(){
	addTag("off-topic");
}

function addTag(tag){
	var textArea = $('.commentthread_textarea')[0];
	var selectedTextObject = {
		textAreaValue: textArea.value,
		selectionStart: textArea.selectionStart,
		selectionEnd: textArea.selectionEnd
	};
	
	if (textArea.selectionStart != textArea.selectionEnd){
		replaceText(tag, selectedTextObject);
	} else {
		appendText(tag, selectedTextObject);
	}
}

function surroundWithTag(tag, selectedText){
	selectedText = selectedText != null ? selectedText : "";
	var surroundedByTag = "[" + tag + "]" + selectedText + "[/" + tag + "]";
	return surroundedByTag;
}

function setText(newText){
	keycodes.replyBox.val(newText);
}

function appendText(tag, selectedTextObject){
	var replyBoxVal = keycodes.replyBox.val() || "";
	
	if(selectedTextObject != undefined && selectedTextObject.selectionEnd < replyBoxVal.length){
		/* Append to the index */
		var start = selectedTextObject.textAreaValue.substr(0, selectedTextObject.selectionStart);
		var selection = selectedTextObject.textAreaValue.substring(selectedTextObject.selectionStart, selectedTextObject.selectionEnd);
		if(window.getSelection().toString().length > 0){
			selection = window.getSelection().toString();
		}
		var end = selectedTextObject.textAreaValue.substr(selectedTextObject.selectionEnd, selectedTextObject.textAreaValue.length);
	
		var replacement = start + surroundWithTag(tag, selection) + end;
		setText(replacement);
	} else {
		/* Append to the end */		
		var selectedText = "";
		if(window.getSelection().toString().length > 0){
			selectedText = window.getSelection().toString();
		}
		var newText = surroundWithTag(tag, selectedText);
		
		var replacementText = replyBoxVal.concat(newText);
		setText(replacementText);
	}
}

function replaceText(tag, selectedTextObject){
	var start = selectedTextObject.textAreaValue.substr(0, selectedTextObject.selectionStart);
	var selection = selectedTextObject.textAreaValue.substring(selectedTextObject.selectionStart, selectedTextObject.selectionEnd);
	var end = selectedTextObject.textAreaValue.substr(selectedTextObject.selectionEnd, selectedTextObject.textAreaValue.length);
	
	var replacement = start + surroundWithTag(tag, selection) + end;
	setText(replacement);
}