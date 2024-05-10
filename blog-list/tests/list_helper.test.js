const { test, describe } = require("node:test");
const listHelper = require("../utils/list_helper");
const assert = require('node:assert');
const biggerList = require('./testBlogs.json')

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];


  test("of empty list is zero", () => {
    const result = listHelper.totalLikes([]);
    assert.strictEqual(result, 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    assert.strictEqual(result, 5);
  });

  test("of a bigger list is calculated right", () => {
    const result = listHelper.totalLikes(biggerList);
    assert.strictEqual(result, 36);
  });
});

//favourite blog

describe('favourite Blog', () => { 
  const blogs = biggerList;
  test('of empty list is empty object', () => {
    const result = listHelper.favouriteBlog([]);
    assert.deepStrictEqual(result, {});
  });

  test('when list has only one blog, equals the blog', () => {
    const result = listHelper.favouriteBlog(blogs.slice(0, 1));
    assert.deepStrictEqual(result, blogs[0]);
  });

  test('when blogs has multiple blogs', () => {
    const result = listHelper.favouriteBlog(blogs);
    assert.deepStrictEqual(result, blogs[2]);
  });

  test('when multiple blogs have the same amount of likes', () => {
    const result = listHelper.favouriteBlog(biggerList);
    assert.deepStrictEqual(result, biggerList[2]);
  });
 })