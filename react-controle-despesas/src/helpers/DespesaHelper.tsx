import { DespesasInterface } from "../models/DespesasIntercace";

export function calculaTotal(despesas: DespesasInterface[]): number {
  let total = 0;

  despesas.forEach((value) => {
    total += parseFloat(value.valor);
  });
  console.log("Chamando retorno total " + total.toString());
  return total;
}
