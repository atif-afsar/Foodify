// Contact.test.js
import { render, screen } from "@testing-library/react";
import Contact from "./Contact";
import "@testing-library/jest-dom";

test("Should load contact us component", () => {
  render(<Contact />);
  const heading = screen.getByRole("heading", { name: /contact us/i }); // Optional: add accessible name
  expect(heading).toBeInTheDocument(); // ✅ correct matcher
});
