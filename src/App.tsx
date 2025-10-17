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

  const [text, setText] = useState("HELLO");
  const [fontSize, setFontSize] = useState(200);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontWeight, setFontWeight] = useState("normal");
  const [fontStyle, setFontStyle] = useState("normal");
  const [textColor, setTextColor] = useState("#ffffff");
  const [dotSize, setDotSize] = useState(2);
  const [backgroundColor, setBackgroundColor] = useState("#000000");

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

      <PixiParticle
        text={text}
        fontSize={fontSize}
        fontFamily={fontFamily}
        fontWeight={fontWeight}
        fontStyle={fontStyle}
        textColor={textColor}
        dotSize={dotSize}
        backgroundColor={backgroundColor}
      />
    </div>
  );
}

export default App;
