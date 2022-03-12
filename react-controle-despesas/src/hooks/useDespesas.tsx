import { useContext, useEffect, useMemo, useState } from "react";
import { calculaTotal } from "../helpers/DespesaHelper";
import { helperSetTotalDespesas } from "../helpers/Helper";
import { DespesasInterface } from "../models/DespesasIntercace";
import { AuthContext } from "../providers/AuthContext";
import { DespesasService } from "../services/DespesasService";

type categoria = { categoria: string; valor: number };

type parameters = {
  ano?: string;
  mes?: string;
};

const initialValue = {
  id: 0,
  descricao: "string",
  categoria: "string",
  valor: "string",
  mes: "string",
  dia: "string",
};
export function useDespesas({
  ano,
  mes,
}: parameters): [DespesasInterface[], () => {}, categoria[]] {
  const [despesas, setDespesas] = useState<Array<DespesasInterface>>([]);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const auth = useContext(AuthContext);

  const despesaService = new DespesasService();

  useEffect(() => {
    if (mes && ano) {
      despesaService.getFiltered(ano, mes).then((res) => {
        const sortedData = res.data.sort((a, b) => {
          return a.dia > b.dia ? 1 : -1;
        });
        setDespesas(sortedData);
      });
    } else {
      despesaService.getAll().then((res) => {
        const sortedData = res.data.sort((a, b) => {
          return a.dia > b.dia ? 1 : -1;
        });
        setDespesas(sortedData);
      });
    }
    return () => {
      setDespesas([]);
    };
  }, [ano, mes]);

  useEffect(() => {
    setTotalDespesas(calculaTotal(despesas));
  }, [despesas]);

  useEffect(() => {
    helperSetTotalDespesas(totalDespesas);
  }, [totalDespesas]);

  function getDespesas() {
    return despesas;
  }

  const categorias = useMemo(() => {
    let categorias: Array<string> = [];

    let responseCategorias: Array<categoria> = [];

    despesas.forEach((elementForEach, index) => {
      if (categorias.indexOf(elementForEach.categoria) === -1) {
        categorias.push(elementForEach.categoria);

        const despesasFiltradas = despesas.filter((elementFilter) => {
          return elementFilter.categoria === elementForEach.categoria;
        });

        let total = 0;
        for (let despesa in despesasFiltradas) {
          total += parseFloat(despesasFiltradas[despesa].valor);
        }

        responseCategorias.push({
          categoria: elementForEach.categoria,
          valor: total,
        });
      }
    });

    return responseCategorias.sort((a, b) => {
      return a.valor > b.valor ? 1 : -1;
    });
  }, [despesas]);

  return [despesas, getDespesas, categorias];
}
