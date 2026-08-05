import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IncidentForm from "../IncidentForm";

describe("IncidentForm", () => {
  it("shows the current value in the textarea", () => {
    render(<IncidentForm value="Fire in the kitchen" onChange={() => {}} onSubmit={() => {}} disabled={false} />);
    expect(screen.getByRole("textbox")).toHaveValue("Fire in the kitchen");
  });
  it("calls onChange with the new text as the user types", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<IncidentForm value="" onChange={handleChange} onSubmit={() => {}} disabled={false} />);
    await user.type(screen.getByRole("textbox"), "Fire");
    expect(handleChange).toHaveBeenCalledTimes(4);
  });
  it("disables the submit button when the text is empty", () => {
    render(<IncidentForm value="" onChange={() => {}} onSubmit={() => {}} disabled={false} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
  it("enables the submit button once there is text", () => {
    render(<IncidentForm value="Fire" onChange={() => {}} onSubmit={() => {}} disabled={false} />);
    expect(screen.getByRole("button")).toBeEnabled();
  });
  it("disables everything and shows 'Analyzing...' while disabled=true", () => {
    render(<IncidentForm value="Fire" onChange={() => {}} onSubmit={() => {}} disabled={true} />);
    expect(screen.getByRole("textbox")).toBeDisabled();
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toHaveTextContent(/analyzing/i);
  });
  it("calls onSubmit exactly once when the form is submitted", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<IncidentForm value="Fire" onChange={() => {}} onSubmit={handleSubmit} disabled={false} />);
    await user.click(screen.getByRole("button"));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
