import { useContext, useEffect, useMemo, useState } from "react";
import { calculaTotal } from "../helpers/DespesaHelper";
import { helperSetTotalDespesas } from "../helpers/Helper";
import { DespesasInterface } from "../models/DespesasIntercace";
import { AuthContext } from "../providers/AuthContext";
import { DespesasService } from "../services/DespesasService";

type categoria = { categoria: string; valor: string };

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
    return [
      { categoria: "Mock 1", valor: "10" },
      { categoria: "Mock 2", valor: "10" },
    ];
  }, [despesas]);

  return [despesas, getDespesas, categorias];
}
