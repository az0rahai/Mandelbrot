export type ComplexNumber = {
  real: number;
  imaginary: number;
};

export type ComplexPlaneBounds = {
  minReal: number;
  maxReal: number;
  minImaginary: number;
  maxImaginary: number;
};

export type MandelbrotRenderConfig = {
  canvasWidth: number;
  canvasHeight: number;
  maxIterations: number;
  bounds: ComplexPlaneBounds;
};

export type MandelbrotPointResult = {
  isBounded: boolean;
  iterationsBeforeEscape: number;
};

export type RgbaColor = {
  red: number;
  blue: number;
  green: number;
  alpha: number;
};
