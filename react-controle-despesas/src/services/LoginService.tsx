import axios, { AxiosResponse } from "axios";
import { boolean } from "yup";

import { LoginData, UserDataInterface } from "../models/LoginModel";

export class LoginService {
  baseURL = "http://localhost:3001/sessao/criar";

  executeLogin(
    loginData: LoginData
  ): Promise<AxiosResponse<UserDataInterface>> {
    return axios.post<UserDataInterface>(this.baseURL, loginData, {
      withCredentials: true,
    });
  }
}
