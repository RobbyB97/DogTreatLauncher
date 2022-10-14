import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "@components/Header";

import Dashboard from "./Dashboard";
import Docs from "./Docs";
import Wildcard from "./Wildcard";

export const AppRouter = () => {
  return (
    <BrowserRouter basename="PiController3B">
      <Header />
      <Routes>
        <Route element={<Dashboard />} path="/" />
        <Route element={<Docs />} path="/docs" />

        {/* Wildcard 404 */}
        <Route element={<Wildcard />} path="*" />
      </Routes>
    </BrowserRouter>
  );
};
