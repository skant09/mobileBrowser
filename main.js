
function Blog(blog) {
  this.index = blog.index || 0;
  this.title = blog.title || '';
  this.description = blog.description || '';

  this.blogs = localStorage.getItem('blogs') ? JSON.parse(localStorage.getItem('blogs')) : [];
  
  this.setBlogs = function() {
    localStorage.setItem('blogs', JSON.stringify(this.blogs));
  };
}

var blogPost = new Blog({});

Blog.prototype.addBlog = function(blog) {
  var blogEntry = {
    title: blog.title.value,
    description: blog.description.value,
    index: this.index++
  };

  this.blogs.push(blogEntry);
  this.setBlogs();

  blog.title.value = '';
  blog.description.value = '';

  return true;
};


Blog.prototype.search = function(string) {
  var blogs = this.blogs,
    self = this;
  var searchResult = [];
  document.getElementById('searchResult').innerHTML = '';

  // find search string
  if(self.blogs.length === 0 ){
    alert('currently there are no blogs');
    return false;
  }
  searchResult = self.blogs.filter(function(blog) {
    if (blog && blog.title && blog.description) {
      if (blog.title.indexOf(string) >= 0 || blog.description.indexOf(string) >= 0) {
        return blog;
      } 
    } 
  });
  if(searchResult.length === 0){
    alert('No matching results');
    return false;
  }

  //insert dom nodes for each string
  var parentNode = document.getElementById('searchResult'),
    editNode = function() {
      return parentNode.getElementsByClassName('edit');
    },
    deleteNode = function() {
      return parentNode.getElementsByClassName('delete');
    };


  searchResult.forEach(function(blog) {
    parentNode.innerHTML += '<div class="searchResult"><div class="title"><h1>' + blog.title + '</h1><p>' + blog.description + '</span></div><div class="action">' +
      '<span class="edit">EDIT</span>' +
      '<span class="delete">DELETE</span></div>';

    var lastNode = Object.keys(editNode()).length,
      _lastEditNode = editNode(),
      _lastDeleteNode = deleteNode();

    _lastEditNode[lastNode - 1].addEventListener('click', self.edit.bind(blog));
    _lastDeleteNode[lastNode - 1].addEventListener('click', self.delete.bind(blog));

  });

};

Blog.prototype.edit = function(blog) {
  var _blog = document.getElementById('Blogpost');
  _blog.title.value = this.title;
  _blog.description.innerHTML = this.description;

};

Blog.prototype.delete = function(event) {
  var self = this;
  var blogs = blogPost.blogs.filter(function(blog) {
    if (blog.index !== self.index) {
      return blog;
    }
  });
  blogPost.blogs = blogs;
  blogPost.setBlogs();
  location.reload();
};