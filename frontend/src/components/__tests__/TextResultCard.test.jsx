import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import TextResultCard from "../TextResultCard";

describe("TextResultCard", () => {
  it("renders the title and raw content", () => {
    render(<TextResultCard title="Classification" icon="📋" content="Category: Fire" tone={null} />);
    expect(screen.getByText(/classification/i)).toBeInTheDocument();
    expect(screen.getByText("Category: Fire")).toBeInTheDocument();
  });
  it("preserves line breaks in the content", () => {
    const { container } = render(
      <TextResultCard title="Risk" icon="⚠️" content={"Line 1\nLine 2"} tone={null} />
    );
    expect(container.querySelector("pre").textContent).toBe("Line 1\nLine 2");
  });
  it("shows no severity badge when tone is null", () => {
    render(<TextResultCard title="Classification" icon="📋" content="text" tone={null} />);
    expect(screen.queryByText(/high|critical|medium|low/i)).not.toBeInTheDocument();
  });
  it("shows the matching severity badge when tone is provided", () => {
    render(<TextResultCard title="Classification" icon="📋" content="text" tone="critical" />);
    expect(screen.getByText("Critical")).toBeInTheDocument();
  });
});
