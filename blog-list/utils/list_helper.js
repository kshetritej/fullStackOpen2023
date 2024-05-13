const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const likes = blogs.map((blog) => blog.likes);

  let sum = 0;
  for (let i = 0; i < likes.length; i++) {
    sum += likes[i];
  }
  return sum;
};

const favouriteBlog = (blogs) => {
  //return blogs with highest likes count
  let newBlog;

  const likes = blogs.map((blog) => blog.likes);

  const maxLike = Math.max(...likes);

  const favBlog = blogs.filter((blog) => blog.likes === maxLike);
  if (favBlog.length > 1) {
    const favBlogtoShow = favBlog[0];
    return favBlogtoShow;
  } else if (favBlog.length === 1) {
    return favBlog[0];
  }
  else {
    return {};
  }
};

const mostBlogs = (blogs) => {
  //returns the author who has the largest amount of blogs
};

const mostLikes = (blogs) => {
  //returns the author, whose blog posts have the largest amount of likes.
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
