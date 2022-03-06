import axios, { AxiosResponse } from "axios";
import { DespesasInterface } from "../models/DespesasIntercace";

export class DespesasService {
  baseURL = "http://localhost:3001/despesas";

  getAll(): Promise<AxiosResponse<DespesasInterface[]>> {
    return axios.get<DespesasInterface[]>(this.baseURL, {
      withCredentials: true,
    });
  }

  getFiltered(
    year: string,
    month: string
  ): Promise<AxiosResponse<DespesasInterface[]>> {
    return axios.get<DespesasInterface[]>(this.baseURL, {
      params: { mes: `${year}-${month}` },
      headers: {},
      withCredentials: true,
    });
  }
}
