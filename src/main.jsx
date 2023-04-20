import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Router, Route, Link, Routes } from "react-router-dom";
import Errores from "./Errores";
import AST from "./Ast";
import Simbolos from "./Simbolos";

import "./index.css";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/errores" element={<Errores />} />
        <Route path="/ast" element={<AST />} />
        <Route path="/simbolos" element={<Simbolos />} />
      </Routes>
  </BrowserRouter>
);
