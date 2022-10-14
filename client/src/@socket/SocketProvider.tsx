import useState from "react-usestateref";
import React, { useEffect } from "react";
import { Socket } from "socket.io-client";

import { SocketContext } from "@socket";
import * as STypes from "./types";
import * as Types from "types";
import * as _utils from "./_utils";

/** Provider component for raspberry pi websocket interface */
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  //////////////////////////////////////////////////////////////////////////////
  // Data
  //////////////////////////////////////////////////////////////////////////////
  const [_socket, _setSocket, _socketRef] = useState<Socket | false>(false);
  const [connected, _setConnected, _sonnectedRef] = useState(false);
  const [board, _setBoard, _BoardRef] = useState<STypes.SocketContext["board"]>(
    {}
  );

  //////////////////////////////////////////////////////////////////////////////
  // Loading
  //////////////////////////////////////////////////////////////////////////////

  // Handle websocket loading/unloading
  useEffect(() => {
    // Configure hooks for socket
    if (_socket) {
      _connectHooks();
    }

    // Clear data
    else {
      _setConnected(false);
      _setBoard({});
    }
  }, [_socket]);

  //////////////////////////////////////////////////////////////////////////////
  // Public functions
  //////////////////////////////////////////////////////////////////////////////
  const connect: STypes.SocketContext["connect"] = async (connection) => {
    const ws = _utils.buildWebsocket(connection);
    _setSocket(ws);
  };

  const disconnect: STypes.SocketContext["disconnect"] = () => {
    // Get socket
    const _socket = _socketRef.current;
    if (!_socket) return;

    _socket.disconnect();
  };

  const togglePin: STypes.SocketContext["togglePin"] = (pin: number) => {
    if (!_socket) return false;

    _socket.emit("toggle-pin", { number: pin });
    return true;
  };

  const activatePin: STypes.SocketContext["activatePin"] = () => {
    // TODO
    return false;
  };

  const deactivatePin: STypes.SocketContext["deactivatePin"] = () => {
    // TODO
    return false;
  };

  //////////////////////////////////////////////////////////////////////////////
  // Private functions
  //////////////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////////////////
  // Websocket Event Handlers
  //////////////////////////////////////////////////////////////////////////////

  /** Connect websocket server messages to provider functions */
  const _connectHooks = () => {
    // Get websocket
    const _socket = _socketRef.current;
    if (!_socket) return;

    // Wire up hooks
    _socket.on("connect", () => _onConnect());
    _socket.on("disconnect", () => _onDisconnect());
    _socket.on("ping", () => _onPing());
    _socket.on("error", () => _onError());
    _socket.on("reconnect_failed", () => _onReconnectFailed());
    _socket.on("gpio-update", (data: any) => _onGpioUpdate(data));
    _socket.on("message", (data: any) => _onMessage(data));

    // Establish connection
    _socket.connect();
  };

  // Actual hooks

  const _onMessage = (data: any) => {
    // TODO
  };

  const _onDisconnect = () => {
    _setSocket(false);
  };

  const _onError = () => {
    // TODO
  };

  const _onReconnectFailed = () => {
    // TODO
  };

  const _onGpioUpdate = async (data: any) => {
    if (Object.keys(data).includes("data")) {
      _setBoard(JSON.parse(data.data));
    } else {
      _setBoard(JSON.parse(data));
    }
  };

  const _onConnect = () => {
    if (!_socket) return;

    _socket.emit("gpio-update");
    _setConnected(true);
  };

  const _onPing = () => {
    // TODO
  };

  //////////////////////////////////////////////////////////////////////////////
  // Component
  //////////////////////////////////////////////////////////////////////////////
  return (
    <SocketContext.Provider
      value={{
        board,
        connected,
        connect,
        disconnect,
        togglePin,
        activatePin,
        deactivatePin,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
