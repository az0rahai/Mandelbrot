import { TEXT_CONTENT } from "../../i18n/text-content";

type ControlsPanelProps = {
  maxIterations: number;
  onMaxIterationsChange: (value: number) => void;
};

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  maxIterations,
  onMaxIterationsChange,
}) => {
  const handleSliderChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const nextValue = Number(event.target.value);
    onMaxIterationsChange(nextValue);
  };

  return (
    <aside className="controls-panel">
      <h1>{TEXT_CONTENT.title}</h1>
      <p>{TEXT_CONTENT.intro}</p>

      <ul>
        {TEXT_CONTENT.bulletPoints.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <label className="control control--slider">
        <span>
          {TEXT_CONTENT.maxIterationsLabel}: {maxIterations}
        </span>
        <input
          type="range"
          min={20}
          max={400}
          value={maxIterations}
          onChange={handleSliderChange}
        />
      </label>
    </aside>
  );
};
