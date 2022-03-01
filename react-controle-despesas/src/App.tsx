import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Despesas from "./pages/Depesas";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/despesas" element={<Despesas />}></Route>
          <Route path="despesas/:mes/:ano" element={<Despesas />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
