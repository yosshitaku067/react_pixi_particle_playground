import { useId, useState } from "react";
import PixiParticle from "./components/pixi-particle";
import "./App.css";

function App() {
  const imageSizeId = useId();
  const imageSrcId = useId();
  const backgroundColorId = useId();
  const particleColorId = useId();
  const [dotSize, setDotSize] = useState(2);
  const [imageSrc, setImageSrc] = useState("/images/Sidekick.logo.128.png");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [particleColor, setParticleColor] = useState("#ffffff");

  const availableImages = [
    { label: "Sidekick Logo 32px", value: "/images/Sidekick.logo.32.png" },
    { label: "Sidekick Logo 64px", value: "/images/Sidekick.logo.64.png" },
    { label: "Sidekick Logo 128px", value: "/images/Sidekick.logo.128.png" },
    { label: "Sidekick Logo 256px", value: "/images/Sidekick.logo.256.png" },
  ];

  return (
    <div className="app-container">
      <div className="control-panel">
        <h1>Pixi Particle Controller</h1>

        <div className="control-group">
          <label htmlFor={imageSizeId}>Dot Size:</label>
          <input
            id={imageSizeId}
            type="number"
            min="1"
            max="10"
            value={dotSize}
            onChange={(e) => setDotSize(Math.max(1, parseInt(e.target.value, 10) || 1))}
          />
          <span className="value-display">{dotSize}</span>
        </div>

        <div className="control-group">
          <label htmlFor={imageSrcId}>Image Source:</label>
          <select
            id={imageSrcId}
            value={imageSrc}
            onChange={(e) => setImageSrc(e.target.value)}
          >
            {availableImages.map((img) => (
              <option key={img.value} value={img.value}>
                {img.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-group">
          <label htmlFor={backgroundColorId}>Background Color:</label>
          <div className="color-input-wrapper">
            <input
              id={backgroundColorId}
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
            <span className="color-value">{backgroundColor}</span>
          </div>
        </div>

        <div className="control-group">
          <label htmlFor={particleColorId}>Particle Color:</label>
          <div className="color-input-wrapper">
            <input
              id={particleColorId}
              type="color"
              value={particleColor}
              onChange={(e) => setParticleColor(e.target.value)}
            />
            <span className="color-value">{particleColor}</span>
          </div>
        </div>
      </div>

      <PixiParticle dotSize={dotSize} imageSrc={imageSrc} backgroundColor={backgroundColor} particleColor={particleColor} />
    </div>
  );
}

export default App;
