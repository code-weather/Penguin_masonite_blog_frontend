import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";

test("renders Create New Blog Button", () => {
  render(
    <Router>
      <Route component={App} />
    </Router>
  );
  const linkElement = screen.getByText(/Create New Blog/i);
  expect(linkElement).toBeInTheDocument();
});

test("create button takes you to create form", () => {
  render(
    <Router>
      <Route component={App} />
    </Router>
  );
  const linkElement = screen.getByText(/Create New Blog/i);
  fireEvent.click(linkElement);
  const createButton = screen.getByText(/Create Blog/i);
  expect(createButton).toBeInTheDocument();
});
