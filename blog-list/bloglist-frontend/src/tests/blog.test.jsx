import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Blog from "../components/Blog";
import { userEvent } from "@testing-library/user-event";

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
        name:"tej",
    }
  };

  render(<Blog blog={blog} />);

  const mockHandler = vi.fn();

  const button = screen.getByText("view details");
  expect(button).toBeDefined();

  const user = userEvent.setup();
  await user.click(button);

  const element = screen.getByText("testing.react.com");
  expect(element).toBeDefined();
});
