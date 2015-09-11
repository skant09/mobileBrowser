function blog(){

}
function blogPost(form, blog) {
  var blogEntry = {
  	title: blog.title.value,
  	description: blog.description.value
  };

  if (localStorage.getItem("blogs") === null) {
    localStorage.setItem("blogs", JSON.stringify([blogEntry]));
  } else {
    var blogs = JSON.parse(localStorage.getItem("blogs"));
    blogs.push(blogEntry);
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }
  // refreshData();
  return true;
}

function search(string){
	var blogs = JSON.parse(localStorage.getItem("blogs"));
	var searchResult = [];
	document.getElementById('searchResult').innerHTML = '';
	searchResult = blogs.filter(function(blog){
		if(blog.title.indexOf(string) >= 0 || blog.description.indexOf(string) >= 0 ){
			return blog;
		}
	});
	searchResult.forEach(function(blog) {
		document.getElementById('searchResult').innerHTML += '<div class="searchResult"><div class="title"><h1>'
						+blog.title+'</h1><p>'+blog.description+'</span></div><div class="action">'+
						'<span class="edit">EDIT</span><span id="delete"> DELETE</span></div>';
		console.log(document.getElementsByClassName('edit'));
		document.getElementsByClassName('edit').forEach(function(node){
			node.addEventListner('click',edit(blog));	
		});

		// searchNode = searchNode[searchNode.length-1];
		console.log(typeof(searchNode));
		console.log(searchNode);
		searchNode[0].addEventListner('click',edit(blog));
		// Object.keys(searchNode).filter(function(node){
		// 	console.log(searchNode[node]);
		// 	if(searchNode[node].className === 'edit'){
		// 		searchNode[node].addEventListner('click', edit(blog));
		// 	};
		// });
	});

}

function edit(blog){
	console.log(blog);
	var _blog = document.getElementById('Blogpost');
	console.log(_blog.title);
	_blog.title.innerHTML =  blog.title;
	_blog.description.innerHTML =  blog.description;

}