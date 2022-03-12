import { createContext } from "react";
import { AuthDataIntercace } from "../models/AuthModel";

const initialValues: AuthDataIntercace = {
  isAuthenticated: false,
};

export const AuthContext = createContext<AuthDataIntercace>(initialValues);
