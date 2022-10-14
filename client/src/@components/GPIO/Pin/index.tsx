import { useState, useEffect, useContext } from "react";

import * as utils from "@utils";
import * as Types from "types";
import "./index.css";
import { SocketContext } from "@socket";

interface GPIOPinProps extends Types.PinLabel {
  selectedPin: number;
  setSelectedPin: (oldState: number) => void;
}

/** A GPIO Pin */
const Pin = ({
  number,
  name,
  type,
  color,
  selectedPin,
  setSelectedPin,
}: GPIOPinProps) => {
  const side = number % 2 === 0 ? "right" : "left";

  const socket = useContext(SocketContext);

  const [innerColor, setInnerColor] = useState("transparent");
  const [active, setActive] = useState(false);

  // Determine pin color
  useEffect(() => {
    // Decide default color (based on type)
    let pinColor = "transparent";

    switch (type) {
      case "Ground":
        break;

      case "Power":
        if (selectedPin === number) {
          pinColor = "lightblue";
        }
        break;

      default:
        break;
    }

    if (selectedPin === number) {
      pinColor = "white";
    }

    if (Object.keys(socket.board).includes(number.toString())) {
      if (socket.board[number].state === 1) {
        pinColor = "lightgreen";
      }
    }

    setInnerColor(pinColor);
  }, [selectedPin, socket.board, socket.connected]);

  // Determine whether pin is active
  useEffect(() => {
    if (Object.keys(socket.board).includes(number.toString())) {
      setActive(!!socket.board[number].state);
    }
  }, [socket.board]);

  const updateSelectedPin = () => {
    // Click to select, click again to unselect
    if (selectedPin === number) {
      setSelectedPin(0);
    } else {
      setSelectedPin(number);
    }
  };

  return (
    <div
      className="GPIOPin"
      data-side={side}
      data-selected={selectedPin === number}
      data-connected={socket.connected}
      data-active={active}
      data-ground={type === "Ground"}
      onClick={() => updateSelectedPin()}
    >
      <div className="GPIOPin__label">
        <div className="GPIOPin__labelData">
          <h3>{name}</h3>
          <p>{type}</p>
        </div>
        <div className="GPIOPin__labelNumber">
          <p>{number}</p>
        </div>
      </div>

      <div className="GPIOPin__boardPiece" data-active={true}>
        <div className="GPIOPin__pin" data-selected={selectedPin === number}>
          <div style={{ backgroundColor: color }}>
            <div className="GPIOPin__pinInner">
              <div style={{ backgroundColor: innerColor }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pin;
