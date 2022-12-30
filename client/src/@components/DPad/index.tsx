import React, { useContext, useState, useEffect } from "react";

interface DPadProps {
  up: () => void;
  down: () => void;
  left: () => void;
  right: () => void;
  size: number;
}

// Default options
const DEFAULT_SIZE = 48;

/* Directional Pad */
const DPad = (props: DPadProps) => {
  /** Number value to pixel size */
  const getSizeString = (x?: number) => {
    if (x) return `${x}px`;
    else return `${props.size || DEFAULT_SIZE}px`;
  };

  /** Execute dpad function */
  const press = (e: any, func: Function) => {
    e.preventDefault();
    func();
  };

  const [size, setSize] = useState(`${getSizeString()}`);

  /** CSS properties added to all dpad tiles */
  const tileStyle: React.CSSProperties = {
    width: `${getSizeString(props.size ? props.size / 3 : DEFAULT_SIZE / 3)}`,
    height: `${getSizeString(props.size ? props.size / 3 : DEFAULT_SIZE / 3)}`,
  };

  return (
    <div className="dpad" style={{ width: size, height: size }}>
      <div className="dpad-pad">
        <div className="dpad-corner" style={{ ...tileStyle }}></div>
        <button
          className="dpad-up"
          style={{ ...tileStyle }}
          onClick={(e) => press(e, props.up)}
        >
          up
        </button>
        <div className="dpad-corner" style={{ ...tileStyle }}></div>

        <button
          className="dpad-left"
          style={{ ...tileStyle }}
          onClick={(e) => press(e, props.left)}
        >
          left
        </button>
        <div className="dpad-center" style={{ ...tileStyle }}></div>
        <button
          className="dpad-right"
          style={{ ...tileStyle }}
          onClick={(e) => press(e, props.right)}
        >
          right
        </button>

        <div className="dpad-corner" style={{ ...tileStyle }}></div>
        <button
          className="dpad-down"
          style={{ ...tileStyle }}
          onClick={(e) => press(e, props.down)}
        ></button>
        <div className="dpad-corner" style={{ ...tileStyle }}></div>
      </div>
    </div>
  );
};

export default DPad;
