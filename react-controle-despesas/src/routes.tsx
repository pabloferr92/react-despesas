import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { AuthDataIntercace } from "./models/AuthModel";
import Despesas from "./pages/Depesas";
import LoginPage from "./pages/Login";
import { AuthContext } from "./providers/AuthContext";

export default function RouterModule() {
  const [user, setUser] = useState(null);

  const authData: AuthDataIntercace = {
    isAuthenticated: false,
  };

  return (
    <BrowserRouter>
      <AuthContext.Provider value={authData}>
        <Routes>
          <Route path="/despesas" element={<Despesas />}></Route>
          <Route path="despesas/:mes/:ano" element={<Despesas />}></Route>
          <Route path="/login" element={<LoginPage name="teste" />}></Route>
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}
