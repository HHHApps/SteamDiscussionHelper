H1
	[h1]selected text[/h1]

B
	[b]selected text[/b]

U
	[u]selected text[/u]

I
	[i]selected text[/i]

Strike
	[strike]selected text[/strike]

Spoiler
	[spoiler]selected text[/spoiler]

URL
	[url=]selected text[/url]

Bullet List
	[list]
	[*]
	[*]
	[*]
	[/list]

Number List
	[olist]
	[*]
	[*]
	[*]
	[/olist]

Quote
	[quote]selected text[/quote]

No Parse
	[noparse]selected text[/noparse]

Code
	[code][/code]

Sarcasm
	[sarcasm]selected text[/sarcasm]

Off-Topic
	[off-topic]selected text[/off-topic]

NOTES:
"selected text":
	If you select text outside of the text area, that selected text is added to the text area and is surrounded by the selected tag.
	If you select text within the text area, that selected text is surrounded by the selected tag.
	The "Code", "Bullet List", and "Number List" tags are only appended to the end of the text area and do not do anything with selected text.

"Quoting":
	**v1.5**
	When you select text outside of the reply area of a thread and select the Quote tag, the extension will determine the original author's name and the post 
	ID and surround the selected text with a Quote tag resembling the output of Steam's built-in reply button like so: [quote=authorName;postId]selected text[/quote]. 
	If you select a tag other than the Quote tag, the selected text is surrounded by the selected tag and the selected tag is surrounded by a Quote tag like so:
	[quote=authorName;postId][tag]selected text[/tag][/quote].
	
	**Original version**
	As of now, quoting selected text does NOT automatically directly link to where the text was selected from. It only adds an empty "quote" tag. I have an 
	idea for implementing this, but, for now, if you wish to specifically quote the original author, you must do so in your new post.

"Sarcasm":
	This tag is, of course, not a default BBCode tag and will literally only surround text with "[sarcasm]" and "[/sarcasm]". I felt that it could be useful 
	for conveying sarcasm and, just like the purpose of this extension, is just a way to save people time from typing out the tag (or trying to understand 
	what "/s" means).

"Off-Topic":
	Much like the "Sarcasm" tag, this tag is, of course, not a default BBCode tag and will literally only surround text with "[off-topic]" and "[/off-topic]" 
	and could be useful for identifying off-topic posts or at least parts of posts that are off-topic.
	
The sidebar tags:
	I felt this would be useful for "tagging as you scroll", if that makes sense. As you read through a long thread, you can highlight specific things you'd 
	like to tag in your reply.