import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Dashboard from "../Dashboard";
import apiClient from "../../api/client";

vi.mock("../../api/client", () => ({
  default: { post: vi.fn() },
}));

const SAMPLE_RESULT = {
  classification: "Category: Fire\nSeverity: High",
  risk: "Risk Level: High",
  decision: "Priority:\nHigh",
  contacts: { "Fire Department": "101" },
  hospital: { Hospital: "City Hospital" },
  weather: { Temperature: "34°C" },
  location: { Latitude: "13.6288" },
};

describe("Dashboard", () => {
  beforeEach(() => {
    apiClient.post.mockReset();
  });

  it("renders the form and no results initially", () => {
    render(<Dashboard />);
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.queryByText(/enterprise tool results/i)).not.toBeInTheDocument();
  });

  it("shows results after a successful analyze call", async () => {
    const user = userEvent.setup();
    apiClient.post.mockResolvedValueOnce({ data: SAMPLE_RESULT });

    render(<Dashboard />);
    await user.type(screen.getByRole("textbox"), "Fire in the electrical room");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText(/enterprise tool results/i)).toBeInTheDocument();
    });

    expect(apiClient.post).toHaveBeenCalledWith("/analyze", {
      incident: "Fire in the electrical room",
    });
    expect(screen.getByText("City Hospital")).toBeInTheDocument();
  });

  it("shows the server's error message on a 400/500 response", async () => {
    const user = userEvent.setup();
    apiClient.post.mockRejectedValueOnce({
      response: { data: { error: "The 'incident' field is required." } },
    });

    render(<Dashboard />);
    await user.type(screen.getByRole("textbox"), "x");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/incident.*field is required/i);
    });
  });

  it("shows a network-error message when the backend is unreachable", async () => {
    const user = userEvent.setup();
    apiClient.post.mockRejectedValueOnce({ request: {} });

    render(<Dashboard />);
    await user.type(screen.getByRole("textbox"), "Fire in the electrical room");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toHaveTextContent(/could not reach the backend/i);
    });
  });

  it("clears the loading state even after an error (finally block)", async () => {
    const user = userEvent.setup();
    apiClient.post.mockRejectedValueOnce({ request: {} });

    render(<Dashboard />);
    await user.type(screen.getByRole("textbox"), "Fire in the electrical room");
    await user.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });

    expect(screen.getByRole("button")).toBeEnabled();
    expect(screen.getByRole("button")).toHaveTextContent(/analyze incident/i);
  });
});
