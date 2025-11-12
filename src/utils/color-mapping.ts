import { RgbaColor } from "../types/mandelbrot";

export type ColorMappingConfig = {
  lightColor: RgbaColor;
  darkColor: RgbaColor;
};

export const DEFAULT_COLOR_MAPPING_CONFIG: ColorMappingConfig = {
  lightColor: { red: 230, green: 230, blue: 230, alpha: 255 },
  darkColor: { red: 40, green: 40, blue: 40, alpha: 255 },
};

export const selectColorForPoint = (
  isBounded: boolean,
  iterationsBeforeEscape: number, // Keeping it for gradients later
  maxIterations: number,
  colorMappingConfig: ColorMappingConfig = DEFAULT_COLOR_MAPPING_CONFIG
): RgbaColor => {
  if (!isBounded) {
    return colorMappingConfig.lightColor;
  }

  return colorMappingConfig.darkColor;
};
