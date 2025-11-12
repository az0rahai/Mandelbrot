import { useMandelbrotRenderer } from "../../hooks/use-mandelbrot-renderer";
import { TEXT_CONTENT } from "../../i18n/text-content";
import { MandelbrotRenderConfig } from "../../types/mandelbrot";

type MandelbrotCanvasProps = {
  renderConfig: MandelbrotRenderConfig;
};
export const MandelbrotCanvas: React.FC<MandelbrotCanvasProps> = ({
  renderConfig,
}) => {
  const { canvasRef, isRendering } = useMandelbrotRenderer(renderConfig);

  return (
    <section className="canvas-section">
      <div className="canvas-header">
        <h2>Visualization</h2>
        {isRendering && (
          <span className="rendering-indicator">Rendering...</span>
        )}
      </div>
      <canvas
        ref={canvasRef}
        width={renderConfig.canvasWidth}
        height={renderConfig.canvasHeight}
        aria-label={TEXT_CONTENT.ariaCanvasLabel}
      />
    </section>
  );
};
