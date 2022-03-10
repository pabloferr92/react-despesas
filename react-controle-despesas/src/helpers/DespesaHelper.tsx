import { DespesasInterface } from "../models/DespesasIntercace";

export function calculaTotal(despesas: DespesasInterface[]): number {
  let total = 0;

  despesas.forEach((value) => {
    total += parseFloat(value.valor);
  });

  console.log("Caculando total " + total);
  return total;
}
