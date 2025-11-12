import { render, screen } from "@testing-library/react";
import { MandelbrotCanvas } from "./MandelbrotCanvas";
import { MandelbrotRenderConfig } from "../../types/mandelbrot";
import { TEXT_CONTENT } from "../../i18n/text-content";
import * as useMandelbrotRendererModule from "../../hooks/use-mandelbrot-renderer";

jest.mock("../../hooks/use-mandelbrot-renderer");

const mockRenderConfig: MandelbrotRenderConfig = {
  canvasWidth: 500,
  canvasHeight: 500,
  maxIterations: 100,
  bounds: {
    minReal: -2.0,
    maxReal: 2.0,
    minImaginary: -2.0,
    maxImaginary: 2.0,
  },
};

describe("MandelbrotCanvas", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(useMandelbrotRendererModule, "useMandelbrotRenderer").mockReturnValue({
      canvasRef: { current: null },
      isRendering: false,
    });
  });

  it("renders the canvas with correct dimensions", () => {
    render(<MandelbrotCanvas renderConfig={mockRenderConfig} />);

    const canvas = screen.getByLabelText(TEXT_CONTENT.ariaCanvasLabel);
    expect(canvas).toBeInTheDocument();
    expect(canvas).toHaveAttribute("width", "500");
    expect(canvas).toHaveAttribute("height", "500");
  });

  it("renders the canvas with correct aria-label", () => {
    render(<MandelbrotCanvas renderConfig={mockRenderConfig} />);

    const canvas = screen.getByLabelText(TEXT_CONTENT.ariaCanvasLabel);
    expect(canvas).toBeInTheDocument();
  });

  it("renders the visualization heading", () => {
    render(<MandelbrotCanvas renderConfig={mockRenderConfig} />);

    expect(screen.getByText("Visualization")).toBeInTheDocument();
  });

  it("does not show rendering indicator when not rendering", () => {
    render(<MandelbrotCanvas renderConfig={mockRenderConfig} />);

    expect(screen.queryByText("Rendering...")).not.toBeInTheDocument();
  });

  it("shows rendering indicator when rendering", () => {
    jest.spyOn(useMandelbrotRendererModule, "useMandelbrotRenderer").mockReturnValue({
      canvasRef: { current: null },
      isRendering: true,
    });

    render(<MandelbrotCanvas renderConfig={mockRenderConfig} />);

    expect(screen.getByText("Rendering...")).toBeInTheDocument();
  });
});
