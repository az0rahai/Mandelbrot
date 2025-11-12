import { MandelbrotRenderConfig } from "../types/mandelbrot";
import { selectColorForPoint } from "./color-mapping";
import {
  mapPixelToComplexPlane,
  computeMandelbrotPoint,
} from "./mandelbrot-math";

export const renderMandelbrotIntoContext = async (
  context: CanvasRenderingContext2D,
  renderConfig: MandelbrotRenderConfig
): Promise<void> => {
  const { canvasWidth, canvasHeight, maxIterations, bounds } = renderConfig;

  context.clearRect(0, 0, canvasWidth, canvasHeight);

  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const radius = Math.sqrt(centerX * centerX + centerY * centerY);

  const gradient = context.createRadialGradient(
    centerX,
    centerY,
    0,
    centerX,
    centerY,
    radius
  );
  gradient.addColorStop(0, "#4a90e2");
  gradient.addColorStop(0.5, "#2c5f99");
  gradient.addColorStop(1, "#1a3a5c");

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvasWidth, canvasHeight);

  const pixelsPerBatch = 10;
  let pixelCount = 0;

  for (let pixelY = 0; pixelY < canvasHeight; pixelY += 1) {
    for (let pixelX = 0; pixelX < canvasWidth; pixelX += 1) {
      const { real, imaginary } = mapPixelToComplexPlane(
        pixelX,
        pixelY,
        canvasWidth,
        canvasHeight,
        bounds
      );

      const { isBounded, iterationsBeforeEscape } = computeMandelbrotPoint(
        real,
        imaginary,
        maxIterations
      );

      const { red, green, blue, alpha } = selectColorForPoint(
        isBounded,
        iterationsBeforeEscape,
        maxIterations
      );

      context.fillStyle = `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
      context.fillRect(pixelX, pixelY, 1, 1);

      pixelCount += 1;

      if (pixelCount % pixelsPerBatch === 0) {
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
    }
  }
};
