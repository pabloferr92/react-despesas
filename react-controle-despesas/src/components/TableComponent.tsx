import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DespesasInterface } from "../models/DespesasIntercace";
import { DespesasService } from "../services/DespesasService";
import { useParams } from "react-router-dom";
import { calculaTotal } from "../helpers/DespesaHelper";
import { helperSetTotalDespesas } from "../helpers/Helper";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const data = [
  {
    id: 1,
    descricao: "Consulta médica",
    categoria: "Saúde",
    valor: 197.23,
    mes: "2020-10",
  },
];

export default function TableComponent() {
  const despesaService = new DespesasService();

  const { mes } = useParams();
  const { ano } = useParams();
  const [despesas, setDespesas] = useState<DespesasInterface[]>([]);
  const [totalDespesas, setTotalDespesas] = useState(0);

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
  }, [mes, ano]);

  useEffect(() => {
    setTotalDespesas(calculaTotal(despesas));
  }, [despesas]);

  useEffect(() => {
    helperSetTotalDespesas(totalDespesas);
  }, [totalDespesas]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Descrição</TableCell>
            <TableCell align="center">Categoria)</TableCell>
            <TableCell align="center">Valor</TableCell>
            <TableCell align="center">Dia</TableCell>
            <TableCell align="center">Mês</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {despesas.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.descricao}</TableCell>
              <TableCell align="center">{row.categoria}</TableCell>
              <TableCell align="center">{row.valor}</TableCell>
              <TableCell align="center">{row.dia}</TableCell>
              <TableCell align="center">{row.mes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
