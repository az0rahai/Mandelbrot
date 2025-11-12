import { useEffect, useRef, useState } from "react";
import { MandelbrotRenderConfig } from "../types/mandelbrot";
import { renderMandelbrotIntoContext } from "../utils/mandelbrot-renderer";

export const useMandelbrotRenderer = (renderConfig: MandelbrotRenderConfig) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [isRendering, setIsRendering] = useState<boolean>(false);
  const abortRef = useRef<boolean>(false);

  const {
    canvasWidth,
    canvasHeight,
    maxIterations,
    bounds: { minReal, maxReal, minImaginary, maxImaginary },
  } = renderConfig;

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const context = canvasElement.getContext("2d");
    if (!context) return;

    abortRef.current = false;
    setIsRendering(true);

    const render = async () => {
      try {
        await renderMandelbrotIntoContext(context, renderConfig);
        if (!abortRef.current) {
          setIsRendering(false);
        }
      } catch (error) {
        setIsRendering(false);
      }
    };

    render();

    return () => {
      abortRef.current = true;
      setIsRendering(false);
    };
  }, [
    canvasWidth,
    canvasHeight,
    maxIterations,
    minReal,
    maxReal,
    minImaginary,
    maxImaginary,
  ]);

  return {
    canvasRef,
    isRendering,
  };
};
