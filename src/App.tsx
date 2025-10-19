import { useId, useState } from "react";
import PixiParticle from "./components/pixi-particle";
import "./App.css";

function App() {
  const textId = useId();
  const fontSizeId = useId();
  const fontFamilyId = useId();
  const fontWeightId = useId();
  const fontStyleId = useId();
  const textColorId = useId();
  const dotSizeId = useId();
  const backgroundColorId = useId();
  const animationDurationId = useId();
  const amplitudeXId = useId();
  const amplitudeYId = useId();
  const noiseScaleXId = useId();
  const noiseScaleYId = useId();
  const initialContainerScaleId = useId();
  const finalContainerScaleId = useId();

  const [text, setText] = useState("HELLO");
  const [fontSize, setFontSize] = useState(200);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");
  const [textColor, setTextColor] = useState("#ffffff");
  const [dotSize, setDotSize] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [animationDuration, setAnimationDuration] = useState(2);
  const [amplitudeX, setAmplitudeX] = useState(1500);
  const [amplitudeY, setAmplitudeY] = useState(500);
  const [noiseScaleX, setNoiseScaleX] = useState(4);
  const [noiseScaleY, setNoiseScaleY] = useState(3);
  const [initialContainerScale, setInitialContainerScale] = useState(0.4);
  const [finalContainerScale, setFinalContainerScale] = useState(0.5);

  const fontFamilies = [
    { label: "Arial", value: "Arial" },
    { label: "Georgia", value: "Georgia" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Courier New", value: "Courier New" },
    { label: "Verdana", value: "Verdana" },
  ];

  const fontWeights = [
    { label: "Light (300)", value: "300" },
    { label: "Normal (400)", value: "normal" },
    { label: "Bold (700)", value: "bold" },
    { label: "Bolder (900)", value: "900" },
  ];

  const fontStyles = [
    { label: "Normal", value: "normal" },
    { label: "Italic", value: "italic" },
    { label: "Oblique", value: "oblique" },
  ];

  return (
    <div className="app-container">
      <div className="control-panel">
        <h1>Pixi Particle Controller</h1>

        <div className="control-group">
          <label htmlFor={textId}>Text:</label>
          <input
            id={textId}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            maxLength={20}
          />
          <span className="value-display">{text || "Empty"}</span>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label htmlFor={fontSizeId}>Font Size:</label>
            <input
              id={fontSizeId}
              type="number"
              min="50"
              max="400"
              value={fontSize}
              onChange={(e) => setFontSize(Math.max(50, parseInt(e.target.value, 10) || 50))}
            />
            <span className="value-display">{fontSize}px</span>
          </div>

          <div className="control-group">
            <label htmlFor={dotSizeId}>Dot Size:</label>
            <input
              id={dotSizeId}
              type="number"
              min="1"
              max="10"
              value={dotSize}
              onChange={(e) => setDotSize(Math.max(1, parseInt(e.target.value, 10) || 1))}
            />
            <span className="value-display">{dotSize}</span>
          </div>
        </div>

        <div className="control-group">
          <label htmlFor={fontFamilyId}>Font Family:</label>
          <select
            id={fontFamilyId}
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
          >
            {fontFamilies.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label htmlFor={fontWeightId}>Font Weight:</label>
            <select
              id={fontWeightId}
              value={fontWeight}
              onChange={(e) => setFontWeight(e.target.value)}
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value}>
                  {weight.label}
                </option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor={fontStyleId}>Font Style:</label>
            <select
              id={fontStyleId}
              value={fontStyle}
              onChange={(e) => setFontStyle(e.target.value)}
            >
              {fontStyles.map((style) => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label htmlFor={textColorId}>Text Color:</label>
            <div className="color-input-wrapper">
              <input
                id={textColorId}
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
              />
              <span className="color-value">{textColor}</span>
            </div>
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
        </div>

        <hr />

        <div className="control-group">
          <label htmlFor={animationDurationId}>Animation Duration:</label>
          <input
            id={animationDurationId}
            type="number"
            min="0.5"
            max="10"
            step="0.5"
            value={animationDuration}
            onChange={(e) => setAnimationDuration(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
          />
          <span className="value-display">{animationDuration}s</span>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label htmlFor={amplitudeXId}>Amplitude X:</label>
            <input
              id={amplitudeXId}
              type="number"
              min="100"
              max="3000"
              step="100"
              value={amplitudeX}
              onChange={(e) => setAmplitudeX(Math.max(100, parseInt(e.target.value, 10) || 100))}
            />
            <span className="value-display">{amplitudeX}</span>
          </div>

          <div className="control-group">
            <label htmlFor={amplitudeYId}>Amplitude Y:</label>
            <input
              id={amplitudeYId}
              type="number"
              min="100"
              max="3000"
              step="100"
              value={amplitudeY}
              onChange={(e) => setAmplitudeY(Math.max(100, parseInt(e.target.value, 10) || 100))}
            />
            <span className="value-display">{amplitudeY}</span>
          </div>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label htmlFor={noiseScaleXId}>Noise Scale X:</label>
            <input
              id={noiseScaleXId}
              type="number"
              min="1"
              max="10"
              step="0.5"
              value={noiseScaleX}
              onChange={(e) => setNoiseScaleX(Math.max(1, parseFloat(e.target.value) || 1))}
            />
            <span className="value-display">{noiseScaleX}</span>
          </div>

          <div className="control-group">
            <label htmlFor={noiseScaleYId}>Noise Scale Y:</label>
            <input
              id={noiseScaleYId}
              type="number"
              min="1"
              max="10"
              step="0.5"
              value={noiseScaleY}
              onChange={(e) => setNoiseScaleY(Math.max(1, parseFloat(e.target.value) || 1))}
            />
            <span className="value-display">{noiseScaleY}</span>
          </div>
        </div>

        <div className="control-row">
          <div className="control-group">
            <label htmlFor={initialContainerScaleId}>Initial Container Scale:</label>
            <input
              id={initialContainerScaleId}
              type="number"
              min="0.1"
              max="2"
              step="0.1"
              value={initialContainerScale}
              onChange={(e) => setInitialContainerScale(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            />
            <span className="value-display">{initialContainerScale.toFixed(2)}</span>
          </div>

          <div className="control-group">
            <label htmlFor={finalContainerScaleId}>Final Container Scale:</label>
            <input
              id={finalContainerScaleId}
              type="number"
              min="0.1"
              max="2"
              step="0.1"
              value={finalContainerScale}
              onChange={(e) => setFinalContainerScale(Math.max(0.1, parseFloat(e.target.value) || 0.1))}
            />
            <span className="value-display">{finalContainerScale.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <PixiParticle
        text={text}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        textColor={textColor}
        dotSize={dotSize}
        backgroundColor={backgroundColor}
        animationDuration={animationDuration}
        amplitudeX={amplitudeX}
        amplitudeY={amplitudeY}
        noiseScaleX={noiseScaleX}
        noiseScaleY={noiseScaleY}
        initialContainerScale={initialContainerScale}
        finalContainerScale={finalContainerScale}
      />
    </div>
  );
}

export default App;
