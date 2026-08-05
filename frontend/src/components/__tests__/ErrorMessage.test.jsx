import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";

describe("ErrorMessage", () => {
  it("renders nothing when message is null", () => {
    const { container } = render(<ErrorMessage message={null} />);
    expect(container).toBeEmptyDOMElement();
  });
  it("renders nothing when message is an empty string", () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container).toBeEmptyDOMElement();
  });
  it("renders the message text when provided", () => {
    render(<ErrorMessage message="Could not reach the backend." />);
    expect(screen.getByText(/could not reach the backend/i)).toBeInTheDocument();
  });
  it("has role=alert so screen readers announce it", () => {
    render(<ErrorMessage message="Something failed." />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
