import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Controller from "@components/GPIO/Controller";
import "./App.css";
import { SocketProvider } from "@socket";
import Header from "@components/Header";
import { AppRouter } from "@pages";

function App() {
  return (
    <div className="App">
      <SocketProvider>
        <AppRouter />
      </SocketProvider>
    </div>
  );
}

export default App;
