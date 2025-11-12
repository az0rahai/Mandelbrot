import { ComplexPlaneBounds, MandelbrotPointResult } from "../types/mandelbrot";

export const mapPixelToComplexPlane = (
  pixelX: number,
  pixelY: number,
  canvasWidth: number,
  canvasHeight: number,
  bounds: ComplexPlaneBounds
): { real: number; imaginary: number } => {
  const { minReal, maxReal, minImaginary, maxImaginary } = bounds;

  const real = minReal + (pixelX / canvasWidth) * (maxReal - minReal);

  const imaginary =
    maxImaginary - (pixelY / canvasHeight) * (maxImaginary - minImaginary);

  return { real, imaginary };
};

export const computeMandelbrotPoint = (
  realComponentOFC: number,
  imaginaryComponentOfC: number,
  maxIterations: number
): MandelbrotPointResult => {
  let realComponentOFZ = 0;
  let imaginaryComponentOfZ = 0;
  let iterationCount = 0;

  while (iterationCount < maxIterations) {
    const realSquared = realComponentOFZ * realComponentOFZ;
    const imaginarySquared = imaginaryComponentOfZ * imaginaryComponentOfZ;

    if (realSquared + imaginarySquared > 4) {
      return {
        isBounded: false,
        iterationsBeforeEscape: iterationCount,
      };
    }

    const twoRealImaginary = 2 * realComponentOFZ * imaginaryComponentOfZ;

    const nextReal = realSquared - imaginarySquared + realComponentOFC;

    const nextImaginary = twoRealImaginary + imaginaryComponentOfC;

    realComponentOFZ = nextReal;
    imaginaryComponentOfZ = nextImaginary;
    iterationCount += 1;
  }

  return {
    isBounded: true,
    iterationsBeforeEscape: maxIterations,
  };
};
