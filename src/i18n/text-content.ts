export const TEXT_CONTENT = {
  title: "Mandelbrot Set Visualizer",
  intro:
    "Visualizes Mandelbrot set over complex plane. Each point c = x + yi is colored based on whether the sequence stays bounded or escapes",
  bulletPoints: [
    " LIGHT color: sequence remains bounded at that point",
    "DARK color: sequence grows unbounded at that point",
  ],
  maxIterationsLabel: "Max iterations",
  ariaCanvasLabel: "Mandelbrot visualization spanning the complex plane",
} as const;
