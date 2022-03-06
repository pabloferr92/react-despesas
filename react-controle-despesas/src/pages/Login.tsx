import * as yup from "yup";
import { useFormik } from "formik";
import "./login.css";
import { Button, TextField } from "@mui/material";
import { LoginData } from "../models/LoginModel";
import { LoginService } from "../services/LoginService";
import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthContext";
import { useNavigate } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import DefaultPage from "./DefaultPage";

interface Props {
  name: string;
  age?: string;
}
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  senha: yup
    .string()
    .min(4, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

function LoginPage({ name, age }: Props) {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState("");

  const login: LoginService = new LoginService();
  const formik = useFormik({
    initialValues: {
      email: "usuario@email.com",
      senha: "1234",
    },
    validationSchema: validationSchema,
    onSubmit: (values: LoginData) => {
      login
        .executeLogin(values)
        .then((res) => {
          auth.isAuthenticated = true;
          navigate("/despesas");
        })
        .catch((err) => {
          setErrorMessage("Usuário ou senha inválidos");
        });
    },
  });

  return (
    <>
      <DefaultPage></DefaultPage>
      <div className="loginFormDiv">
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ marginTop: "15px" }}
          />
          <TextField
            fullWidth
            id="password"
            name="senha"
            label="Password"
            type="password"
            value={formik.values.senha}
            onChange={formik.handleChange}
            error={formik.touched.senha && Boolean(formik.errors.senha)}
            helperText={formik.touched.senha && formik.errors.senha}
            sx={{ marginTop: "15px" }}
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            sx={{ marginTop: "15px" }}
          >
            Submit
          </Button>
          <span>{errorMessage}</span>
        </form>
      </div>
    </>
  );
}

export default LoginPage;
