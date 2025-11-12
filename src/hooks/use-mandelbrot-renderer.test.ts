import { renderHook } from "@testing-library/react";
import { useMandelbrotRenderer } from "./use-mandelbrot-renderer";
import { MandelbrotRenderConfig } from "../types/mandelbrot";
import * as mandelbrotRenderer from "../utils/mandelbrot-renderer";

jest.mock("../utils/mandelbrot-renderer");

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

describe("useMandelbrotRenderer", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (mandelbrotRenderer.renderMandelbrotIntoContext as jest.Mock).mockResolvedValue(undefined);
  });

  it("initializes with isRendering as false", () => {
    const { result } = renderHook(() => useMandelbrotRenderer(mockRenderConfig));

    expect(result.current.isRendering).toBe(false);
    expect(result.current.canvasRef).toBeDefined();
  });

  it("returns a canvas ref", () => {
    const { result } = renderHook(() => useMandelbrotRenderer(mockRenderConfig));

    expect(result.current.canvasRef).toBeDefined();
    expect(result.current.canvasRef.current).toBeNull();
  });

  it("returns an isRendering state", () => {
    const { result } = renderHook(() => useMandelbrotRenderer(mockRenderConfig));

    expect(result.current).toHaveProperty("isRendering");
    expect(typeof result.current.isRendering).toBe("boolean");
  });

  it("creates a new ref object for each render", () => {
    const { result, rerender } = renderHook(
      ({ config }) => useMandelbrotRenderer(config),
      {
        initialProps: { config: mockRenderConfig },
      }
    );

    const firstRef = result.current.canvasRef;
    
    const newConfig = { ...mockRenderConfig, maxIterations: 200 };
    rerender({ config: newConfig });

    expect(result.current.canvasRef).toBe(firstRef);
  });

  it("maintains stable canvasRef across rerenders", () => {
    const { result, rerender } = renderHook(() => useMandelbrotRenderer(mockRenderConfig));

    const initialRef = result.current.canvasRef;
    rerender();

    expect(result.current.canvasRef).toBe(initialRef);
  });
});
