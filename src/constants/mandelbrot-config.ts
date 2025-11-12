import {
  ComplexPlaneBounds,
  MandelbrotRenderConfig,
} from "../types/mandelbrot";

export const DEFAULT_COMPLEX_PLANE_BOUNDS: ComplexPlaneBounds = {
  minReal: -2.0,
  maxReal: 2.0,
  minImaginary: -2.0,
  maxImaginary: 2.0,
};

export const DEFAULT_CANVAS_WIDTH = 500;
export const DEFAULT_CANVAS_HEIGHT = 500;
export const DEFAULT_MAX_ITERATIONS = 80;

export const DEFAULT_MANDELBROT_RENDER_CONFIG: MandelbrotRenderConfig = {
  canvasWidth: DEFAULT_CANVAS_WIDTH,
  canvasHeight: DEFAULT_CANVAS_HEIGHT,
  maxIterations: DEFAULT_MAX_ITERATIONS,
  bounds: DEFAULT_COMPLEX_PLANE_BOUNDS,
};
