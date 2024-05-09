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

module.exports = {
  dummy,
  totalLikes,
};
