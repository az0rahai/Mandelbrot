import React, { useMemo, useState } from "react";
import "./App.css";
import {
  DEFAULT_COMPLEX_PLANE_BOUNDS,
  DEFAULT_MANDELBROT_RENDER_CONFIG,
} from "./constants/mandelbrot-config";
import { MandelbrotRenderConfig } from "./types/mandelbrot";
import { ControlsPanel, MandelbrotCanvas } from "./components";

const App: React.FC = () => {
  const [maxIterations, setMaxIterations] = useState<number>(
    DEFAULT_MANDELBROT_RENDER_CONFIG.maxIterations
  );

  const renderConfig: MandelbrotRenderConfig = useMemo(
    () => ({
      ...DEFAULT_MANDELBROT_RENDER_CONFIG,
      maxIterations,
      bounds: DEFAULT_COMPLEX_PLANE_BOUNDS,
    }),
    [maxIterations]
  );

  const handleMaxIterationsChange = (value: number): void => {
    setMaxIterations(value);
  };

  return (
    <div className="app-root">
      <ControlsPanel
        maxIterations={maxIterations}
        onMaxIterationsChange={handleMaxIterationsChange}
      />{" "}
      {/*Left side*/}
      <MandelbrotCanvas renderConfig={renderConfig} /> 
    </div>
  );
};

export default App;
