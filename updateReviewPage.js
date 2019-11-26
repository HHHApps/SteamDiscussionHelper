function getTextArea(){
	/* I want to give the textarea an id for quicker access later */
	var textArea;
	if ($('textarea[id="game_recommendation"]').length > 0){
		console.log("here");
		textArea = $('textarea[id="game_recommendation"]').attr('id', 'dhTextArea');
		var childGuest = document.createElement("div");
		childGuest.id = "dhReplyArea";
		textArea[0].parentNode.insertBefore(childGuest, textArea[0].nextSibling);
	}
	
	return $('#dhTextArea');
}

function getReplyArea(){
	return $('#dhReplyArea');
}

var keycodes = {
	replyBox: getTextArea()
};

$( document ).ready(function() {
	var newReview = $('body').find('h1:contains("Write a review")');
	
	if(newReview.length > 0){
		addReplyArea();
	}
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
	$('#dh_quoteButton').click(function(){
		addQuoteTag();
	});
	$('#dh_listButton').click(function(){
		addListTag();
	});
	$('#dh_oListButton').click(function(){
		addOrderedListTag();
	});
	$('#dh_codeButton').click(function(){
		addCodeTag();
	});
	$('#dh_tableButton').click(function(){
		addTableTag();
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
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_quoteButton">Quote</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_listButton">Bullet List</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_oListButton">Number List</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_codeButton">Code</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_tableButton">Table</button>' + 
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

function addQuoteTag(){
	addTag("quote");
}

function addListTag(){
	appendText("list");
}

function addOrderedListTag(){
	appendText("olist");
}

function addCodeTag(){
	appendText("code");
}

function addTableTag(){
	appendText("table");
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
	var textArea = document.getElementById('dhTextArea');
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
	var surroundedByTag = "";
	var quotedAuthor = getQuotedAuthor();
	if(tag == "list"){
		surroundedByTag = "[list]\n[*]\n[*]\n[*]\n[/list]";
	} else if(tag == "olist"){
		surroundedByTag = "[olist]\n[*]\n[*]\n[*]\n[/olist]";
	} else if(tag == "table"){
		surroundedByTag = "[table]\n[tr]\n[th][/th]\n[th][/th]\n[/tr]\n[tr]\n[td][/td]\n[td][/td]\n[/tr]\n[tr]\n[td][/td]\n[td][/td]\n[/tr]\n[/table]";
	} else if(tag == "quote" && quotedAuthor != ""){
		surroundedByTag = "[quote=" + quotedAuthor + "]" + selectedText + "[/quote]";
	} else if(quotedAuthor != ""){
		surroundedByTag = "[quote=" + quotedAuthor + "][" + tag + "]" + selectedText + "[/" + tag + "][/quote]";
	} else {
		surroundedByTag = "[" + tag + "]" + selectedText + "[/" + tag + "]";
	}
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

function getQuotedAuthor(){
	var quotedAuthor = "";
	if(window.getSelection().toString().length > 0){
		var previousElementSibling = window.getSelection().baseNode.parentNode.previousElementSibling;
		if(previousElementSibling){
			var commentAuthorElement = previousElementSibling.getElementsByClassName("commentthread_author_link")[0];
			var opAuthorElement = previousElementSibling.getElementsByClassName("forum_op_author")[0];
			
			if(!commentAuthorElement && !opAuthorElement){
				if(previousElementSibling.previousElementSibling){
					opAuthorElement = previousElementSibling.previousElementSibling.getElementsByClassName("forum_op_author")[0];
				}
			}
			
			if(commentAuthorElement || opAuthorElement){
				var author = commentAuthorElement ? commentAuthorElement.innerText : opAuthorElement.innerText;
				var postParentId = window.getSelection().baseNode.parentElement.id;
				var postId = "";
				if(postParentId){
					var stringToRemoveFromId = "comment_content_";
					postId = postParentId.substring(stringToRemoveFromId.length);
				}

				var nicknameElement = previousElementSibling.getElementsByClassName("nickname_block")[0];
				if(nicknameElement){
					var nickname = nicknameElement.innerText;
					author = author.substr(0, (author.length - nickname.length) - 1);
				}
				quotedAuthor = postId != "" ? (author + ";" + postId) : author;
			}
		}
	}
	return quotedAuthor;
}