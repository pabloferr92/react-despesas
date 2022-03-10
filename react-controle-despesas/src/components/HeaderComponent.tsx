import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Link } from "@mui/material";
import { AuthDataIntercace } from "../models/AuthModel";
import { Link as ReactLink } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { AuthContext } from "../providers/AuthContext";
import { useContext, useState } from "react";

const HeaderComponent = ({
  isAuthenticated,
  setIsAuthenticated,
}: AuthDataIntercace) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  function executeLogout(): void {
    navigate("/login");
    auth.isAuthenticated = false;
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Box sx={{ marginLeft: "15px", flex: "1" }}>
            <ReactLink to="/despesas">Despesas</ReactLink>
          </Box>
          <Box>
            {!isAuthenticated ? (
              <ReactLink to="/login">Login</ReactLink>
            ) : (
              <ReactLink
                onClick={() => {
                  executeLogout();
                }}
                to="/login"
              >
                Logout
              </ReactLink>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default HeaderComponent;
