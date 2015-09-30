$( document ).ready(function() {
	var posts = $('body').find(".post");
	$('body').find(".seent").remove(); //Remove any existing appended images, otherwise it appends double
	
	var seentImage = "<img src='" + chrome.extension.getURL('/images/seent.png') + "' class='seent' style='height:37px;width:53px'></img>";

	chrome.storage.sync.get("seentIt", function (obj) {
		var seentPosts = !obj.seentIt ? [] : obj.seentIt.val;
		
		var idsToTag = _.intersection(seentPosts, _.map(posts, function(elem){
			return elem.id;
		}));
		
		var postsToTag = _.filter(posts, function(post){
			return _.contains(idsToTag, post.id);
		});
		
		_.each(postsToTag, function(elem){
			$(seentImage).appendTo(elem);
		});
	});
});