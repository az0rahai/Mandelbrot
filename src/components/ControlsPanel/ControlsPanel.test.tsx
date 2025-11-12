import { render, screen, fireEvent } from "@testing-library/react";
import { ControlsPanel } from "./ControlsPanel";
import { TEXT_CONTENT } from "../../i18n/text-content";

describe("ControlsPanel", () => {
  it("renders the title and intro text", () => {
    const mockOnChange = jest.fn();
    render(
      <ControlsPanel maxIterations={100} onMaxIterationsChange={mockOnChange} />
    );

    expect(screen.getByText(TEXT_CONTENT.title)).toBeInTheDocument();
    expect(screen.getByText(TEXT_CONTENT.intro)).toBeInTheDocument();
  });

  it("displays the current max iterations value", () => {
    const mockOnChange = jest.fn();
    render(
      <ControlsPanel maxIterations={150} onMaxIterationsChange={mockOnChange} />
    );

    expect(
      screen.getByText(`${TEXT_CONTENT.maxIterationsLabel}: 150`)
    ).toBeInTheDocument();
  });

  it("renders the slider with correct min, max, and value", () => {
    const mockOnChange = jest.fn();
    render(
      <ControlsPanel maxIterations={200} onMaxIterationsChange={mockOnChange} />
    );

    const slider = screen.getByRole("slider");
    expect(slider).toHaveAttribute("min", "20");
    expect(slider).toHaveAttribute("max", "400");
    expect(slider).toHaveValue("200");
  });

  it("calls onMaxIterationsChange when slider value changes", () => {
    const mockOnChange = jest.fn();
    render(
      <ControlsPanel maxIterations={100} onMaxIterationsChange={mockOnChange} />
    );

    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "250" } });

    expect(mockOnChange).toHaveBeenCalledWith(250);
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("renders all bullet points", () => {
    const mockOnChange = jest.fn();
    render(
      <ControlsPanel maxIterations={100} onMaxIterationsChange={mockOnChange} />
    );

    TEXT_CONTENT.bulletPoints.forEach((bullet) => {
      expect(screen.getByText(bullet.trim())).toBeInTheDocument();
    });
  });
});
