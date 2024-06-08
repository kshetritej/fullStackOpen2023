import { render, screen } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Blog from "../components/Blog";
import { userEvent } from "@testing-library/user-event";
import BlogForm from "../components/BlogForm";
import exp from "constants";

test("renders content", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "testing.react.com",
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText(
    "Component testing is done with react-testing-library"
  );
  expect(element).toBeDefined();
});

test("blog's URL and number of likes are shown when the button controlling the shown details has been clicked", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "testing.react.com",
    author: {
      name: "tej",
    },
  };

  render(<Blog blog={blog} />);

  const button = screen.getByText("view details");
  expect(button).toBeDefined();

  const user = userEvent.setup();
  await user.click(button);

  const element = screen.getByText("testing.react.com");
  expect(element).toBeDefined();
});

test("clicking the like button twice calls event handler twice", async () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    url: "testing.react.com",
    votes: 0,
    author: {
      name: "tej",
    },
  };

  // const mockHandler = vi.fn();

  render(<Blog blog={blog} />);
  const button = screen.getByText("view details");
  expect(button).toBeDefined();

  const appUser = userEvent.setup();
  await appUser.click(button);

  const likeButton = screen.getByText("like");
  expect(likeButton).toBeDefined();
  await appUser.click(likeButton);
});

test("that the form calls the event handler it received as props with the right details when a new blog is created", async () => {
  const blogData = {
    title: "",
    url: "",
  };
  const handleBlogSubmit = vi.fn();
  const setBlogData = vi.fn();
  const setOpen = vi.fn();

  const user = userEvent.setup();

  render(
    <BlogForm
      blogData={blogData}
      handleBlogSubmit={handleBlogSubmit}
      open={true}
      setBlogData={setBlogData}
      setOpen={setOpen}
    />
  );

  const titleInput = screen.getByLabelText("Blog Title");
  const urlInput = screen.getByLabelText("url");
  const addButton = screen.getByText("add");

  await user.type(titleInput, "testing a form...");
  await user.type(urlInput, "http://test.com");

  await user.click(addButton);

  expect(handleBlogSubmit.mock.calls).toHaveLength(1);
});
