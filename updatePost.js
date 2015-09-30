$( document ).ready(function() {
	var posts = $('body').find(".sg-item");
	$('body').find(".seent").remove(); //Remove any existing appended images
	
	var seentImage = "<img src='" + chrome.extension.getURL('/images/seent.png') + "' class='seent' style='height:37px;width:53px'></img>";
	
	chrome.storage.sync.get("seentIt", function (obj) {
		var seentPosts = !obj.seentIt ? [] : obj.seentIt.val;
		
		/* This is only here for a quick fix for posts that don't initially get added. */
		markPostAsSeent(seentPosts);
		
		var postIds = _.map(posts, function(elem){
			return elem.pathname.substr(1);
		});
		
		var idsToTag = _.intersection(seentPosts, postIds);
		
		var postsToTag = _.filter(posts, function(post){
			return _.contains(idsToTag, post.pathname.substr(1));
		});
		
		_.each(postsToTag, function(elem){
			$(seentImage).appendTo(elem);
		});
	});
});

function markPostAsSeent(seentPosts){
	var path = window.location.pathname;
	var galleryId = path.substr(path.lastIndexOf("/") + 1);
	if(!_.contains(seentPosts, galleryId)){
		seentPosts.push(galleryId);

		var saveObj = {val: seentPosts};
		chrome.storage.sync.set({ 'seentIt': saveObj });
	}
}