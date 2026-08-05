import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ToolCard from "../ToolCard";

describe("ToolCard", () => {
  const data = { Hospital: "City Hospital", Ambulance: "108" };

  it("renders the title", () => {
    render(<ToolCard title="Nearby Hospital" icon="🏥" data={data} />);
    expect(screen.getByText(/nearby hospital/i)).toBeInTheDocument();
  });
  it("renders every key/value pair from data", () => {
    render(<ToolCard title="Nearby Hospital" icon="🏥" data={data} />);
    expect(screen.getByText("Hospital")).toBeInTheDocument();
    expect(screen.getByText("City Hospital")).toBeInTheDocument();
    expect(screen.getByText("Ambulance")).toBeInTheDocument();
    expect(screen.getByText("108")).toBeInTheDocument();
  });
  it("renders no rows when data is an empty object", () => {
    render(<ToolCard title="Empty" icon="❔" data={{}} />);
    expect(screen.queryByRole("definition")).not.toBeInTheDocument();
  });
  it("doesn't crash when data is undefined", () => {
    render(<ToolCard title="No Data" icon="❔" data={undefined} />);
    expect(screen.getByText(/no data/i)).toBeInTheDocument();
  });
});
