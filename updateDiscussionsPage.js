/* This content script helps make sure it auto-runs every time you go to the steam community domain. */

function getTextArea(){
	//I want to give the textarea an id for quicker access later
	var textArea;
	
	if($('.forumtopic_reply_entry').length > 0){
		/* new reply */
		textArea = $('.forumtopic_reply_entry')[0].children[0].children[0];
		textArea.id = "dhTextArea";
	} else if($('textarea[class="forumtopic_reply_textarea"]:first-child').length > 0){
		/* new post */
		textArea = $('textarea[class="forumtopic_reply_textarea"]:first-child').first().attr('id', 'dhTextArea');
	} else if ($('textarea[id="description"]').length > 0){
		/* new guide */
		textArea = $('textarea[id="description"]').attr('id', 'dhTextArea');
	}
	
	return $('#dhTextArea');
}

function getSidebar(){
	if($('.rightcol').length > 0){
		return $('.rightcol');
	} else {
		return $('.sidebar');
	}
}

function getReplyArea(){
	var replyArea = $('.forum_newtopic_header');
	if(replyArea.length == 0){
		replyArea = $('.workshopDescContainer')
	}
	return replyArea;
}

var keycodes = {
	replyBox: getTextArea()
};

$( document ).ready(function() {
	removeExistingButtons();
	
	//Doesn't add the buttons if you can't post to the discussions.
	var newDiscussionButton = $('body').find('span:contains("Start a New Discussion")');
	
	var newGuideSpan = $('body').find('span:contains("Creating a new guide")');
	var replyTextArea = $('textarea#dhTextArea');
	
	if(newDiscussionButton.length > 0 || replyTextArea.length > 0){
		addReplyArea();
		addSidebar();
	}
	else if(newGuideSpan.length > 0){
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

function addSidebar(){
	appendToSidebar();

	var sidebarTop = $('#dhSidebarButtons').position().top;
	
	$(window).scroll(function(){
		var windowTop = $(window).scrollTop();
		
		//if top of sidebar is in view
		if (windowTop > sidebarTop)
		{
			//always in view
			$('#dhSidebarButtons').css({ "position":"fixed", "top":"10px" });
		}
		else
		{
			//reset back to normal viewing
			$('#dhSidebarButtons').css({ "position":"inherit" });
		}
	});
	
	$('#dh_sidebar_urlButton').click(function(){
		addUrlTag();
	});
	$('#dh_sidebar_boldButton').click(function(){
		addBoldTag();
	});
	$('#dh_sidebar_italicButton').click(function(){
		addItalicTag();
	});
	$('#dh_sidebar_underlineButton').click(function(){
		addUnderlineTag();
	});
	$('#dh_sidebar_headerButton').click(function(){
		addHeaderTag();
	});
	$('#dh_sidebar_strikeButton').click(function(){
		addStrikeTag();
	});
	$('#dh_sidebar_spoilerButton').click(function(){
		addSpoilerTag();
	});
	$('#dh_sidebar_quoteButton').click(function(){
		addQuoteTag();
	});
	$('#dh_sidebar_listButton').click(function(){
		addListTag();
	});
	$('#dh_sidebar_oListButton').click(function(){
		addOrderedListTag();
	});
	$('#dh_sidebar_codeButton').click(function(){
		addCodeTag();
	});
	$('#dh_sidebar_noParseButton').click(function(){
		addNoParseTag();
	});
	$('#dh_sidebar_sarcasmButton').click(function(){
		addSarcasmTag();
	});
	$('#dh_sidebar_offTopicButton').click(function(){
		addOffTopicTag();
	});
}

function removeExistingButtons(){
	//Remove any that were already appended, otherwise it will have multiples.
	$('#dhReplyButtons').remove();
	$('#dhSidebarButtons').remove();
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
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_noParseButton">No Parse</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_sarcasmButton">Sarcasm</button>' + 
					'<button type="button" class="dhBtn dhReplyBtn" id="dh_offTopicButton">Off-Topic</button>' + 
					'</div>');
}

function appendToSidebar(){
	var sidebar = getSidebar();
	
	sidebar.append('<div class="dhSidebarButtons" id="dhSidebarButtons">' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_urlButton">URL</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_boldButton">B</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_italicButton">I</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_underlineButton">U</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_headerButton">H1</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_strikeButton">Strike</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_spoilerButton">Spoiler</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_quoteButton">Quote</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_listButton">Bullet List</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_oListButton">Number List</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_codeButton">Code</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_noParseButton">No Parse</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_sarcasmButton">Sarcasm</button>' + 
					'<button type="button" class="dhBtn" id="dh_sidebar_offTopicButton">Off-Topic</button>' + 
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