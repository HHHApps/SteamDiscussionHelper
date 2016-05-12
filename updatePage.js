/* This content script helps make sure it auto-runs every time you go to the steam community domain. */

String.prototype.replaceAt = function(index, characters, tag) {
	var start = this.substr(0, index);
	var end = this.substr(index + characters.length);
	var replacement = start + surroundWithTag(tag, characters) + end;
    return replacement;
}

function getTextArea(){
	//I want to give the textarea an id for quicker access later
	$('textarea[class="forumtopic_reply_textarea"]:first-child').first().attr('id', 'dhTextArea');
	return $('#dhTextArea');
}

function getSidebar(){
	return $('.rightcol');
}

function getReplyArea(){
	return $('.forum_newtopic_header');
}

var keycodes = {
	replyBox: getTextArea()
};

$( document ).ready(function() {
	removeExistingButtons();
	
	//Doesn't add the buttons if you can't post to the discussions.
	var newDiscussionButton = $('body').find('span:contains("Start a New Discussion")');
	
	if(newDiscussionButton.length > 0){
		appendToReplyArea();
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
});

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
	var selectedTextObj = getSelectedText();
	var hasSelectedText = selectedTextObj.selectedText != undefined && selectedTextObj.selectedText != "";
	var fromTextArea = selectedTextObj.fromTextArea;
	
	if(hasSelectedText){
		if(fromTextArea){
			replaceText(tag, selectedTextObj.selectedText);
		} else{
			appendText(tag, selectedTextObj.selectedText);
		}
	} else{
		appendText(tag, selectedTextObj.selectedText);
	}
}

function surroundWithTag(tag, selectedText){
	selectedText = selectedText != null ? selectedText : "";
	var surroundedByTag = "";
	if(tag == "list"){
		surroundedByTag = "[list]\n[*]\n[*]\n[*]\n[/list]";
	} else if(tag == "olist"){
		surroundedByTag = "[olist]\n[*]\n[*]\n[*]\n[/olist]";
	} else {
		surroundedByTag = "[" + tag + "]" + selectedText + "[/" + tag + "]";
	}
	return surroundedByTag;
}

function setText(newText){
	keycodes.replyBox.val(newText);
}

function appendText(tag, selectedText){
	var replyBoxVal = keycodes.replyBox.val() || "";
	var newText = surroundWithTag(tag, selectedText);
	
	var replacementText = replyBoxVal.concat(newText);
	setText(replacementText);
}

function replaceText(tag, selectedText){
	var replyBoxVal = keycodes.replyBox.val() || "";
	var lastIndexOfSelected = replyBoxVal.lastIndexOf(selectedText);
	var newText = replyBoxVal.replaceAt(lastIndexOfSelected, selectedText, tag);
	
	setText(newText);
}

function getSelectedText(){
	var selectedTextObj = {
		selectedText: "",
		fromTextArea: false
	};
	
	var textArea = document.getElementById('dhTextArea');

	if (textArea.selectionStart != undefined && textArea.selectionEnd != undefined && textArea.selectionStart != textArea.selectionEnd)
	{
		var startPos = textArea.selectionStart;
		var endPos = textArea.selectionEnd;
		selectedTextObj.selectedText = textArea.value.substring(startPos, endPos);
		selectedTextObj.fromTextArea = true;
	}
    else if(window.getSelection().toString().length > 0){
        selectedTextObj.selectedText = window.getSelection().toString();
    }
	
    return selectedTextObj;
}