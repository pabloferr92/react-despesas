import axios, { AxiosResponse } from "axios";
import { DespesasInterface } from "../models/DespesasIntercace";

export class DespesasService {
  baseURL = "http://127.0.0.1:8080/despesas";

  getAll(): Promise<AxiosResponse<DespesasInterface[]>> {
    return axios.get<DespesasInterface[]>(this.baseURL);
  }

  getFiltered(
    year: string,
    month: string
  ): Promise<AxiosResponse<DespesasInterface[]>> {
    return axios.get<DespesasInterface[]>(this.baseURL, {
      params: { mes: `${year}-${month}` },
    });
  }
}
