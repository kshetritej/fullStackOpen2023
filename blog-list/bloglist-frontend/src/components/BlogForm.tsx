import React, { useState } from "react";

const BlogForm = ({open, setOpen, blogData, setBlogData, handleBlogSubmit }) => {

  const handleBlogFormChange = (event) => {
    const { name, value } = event.target;
    setBlogData({ ...blogData, [name]: value });
    console.log(blogData);
  };

  return (
    <>
      <form onSubmit={handleBlogSubmit}>
        <h2>Add new blog to the list</h2> <br />
        <label htmlFor="title">Blog Title</label> <br />
        <input
          type="text"
          id="title"
          name="title"
          value={blogData.title}
          onChange={handleBlogFormChange}
        />{" "}
        <br />
        <label htmlFor="url">url</label> <br />
        <input
          type="text"
          id="url"
          name="url"
          value={blogData.url}
          onChange={handleBlogFormChange}
        />{" "}
        <br />
        <button type="submit">add</button>
        <button onClick={() => setOpen(!open)}>cancel</button>
      </form>
    </>
  );
};

export default BlogForm;
