import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Despesas from "./pages/Depesas";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import RouterModule from "./routes";

function App() {
  return (
    <>
      <RouterModule></RouterModule>
    </>
  );
}

export default App;
